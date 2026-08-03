// ---------------------------------------------------------------------------
// Restaurant list data layer.
//
// Reads a published-to-web Google Sheets CSV (RESTAURANTS_CSV_URL env var),
// parses it, and indexes rows for the food pages:
//   buildCityIndex(rows) → Map(citySlug → city with slugged restaurants)
//   buildTree(cityIndex) → Continent → Country → City tree for /food
// While the env var is unset (or the fetch fails), a labeled sample dataset
// keeps every page rendering.
//
// Expected sheet columns (order doesn't matter, extra columns are ignored):
//   Name | Continent | Country | City | Price | Notes | Photo Links
//
// Restaurant names, notes, and place names are rendered exactly as typed in
// the sheet — they are data, and never run through the site's translations.
// ---------------------------------------------------------------------------

import sample from "../data/restaurants-sample.json";
import { slugify } from "./slug";

// How often Vercel re-fetches the sheet (seconds). New rows show up on the
// site within this window — no redeploy needed.
const REVALIDATE_SECONDS = 3600;

// Last successful sheet parse, reused if a later refetch fails transiently.
// (Module scope survives between requests in a warm serverless instance;
// best-effort, but it prevents a single failed fetch from swapping one
// page to sample data while sibling pages still serve the real list.)
let lastGoodRows = null;

/** Fetch + normalize all restaurant rows. Returns { rows, source }. */
export async function getRestaurants() {
  const url = process.env.RESTAURANTS_CSV_URL;
  if (!url) {
    return { rows: normalizeRows(sample), source: "sample" };
  }
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`CSV fetch failed with status ${res.status}`);
    const text = await res.text();
    const rows = csvToObjects(text);
    const normalized = normalizeRows(rows);
    if (normalized.length === 0) throw new Error("Sheet parsed to zero rows");
    lastGoodRows = normalized;
    return { rows: normalized, source: "sheet" };
  } catch (err) {
    console.error("[restaurants] Sheet fetch failed:", err.message);
    if (lastGoodRows) return { rows: lastGoodRows, source: "sheet" };
    return { rows: normalizeRows(sample), source: "sample" };
  }
}

/**
 * Index rows by city slug. Each entry:
 *   { name, country, continent, slug, restaurants: [{ ...row, slug }] }
 *
 * Slug assignment is order-independent: if two distinct (city, country)
 * places share a base slug, EVERY one of them gets the "-country" suffix —
 * there is no "first row wins the bare slug", so adding a colliding city to
 * the sheet later can never silently reassign an existing city's URL to a
 * different place. Any residual collision (typo variants, blank countries)
 * falls through to a numeric suffix rather than merging two cities.
 */
export function buildCityIndex(rows) {
  const sorted = [...rows].sort(
    (a, b) =>
      a.city.localeCompare(b.city) ||
      a.country.localeCompare(b.country) ||
      a.name.localeCompare(b.name) ||
      a.notes.localeCompare(b.notes) ||
      a.price.localeCompare(b.price)
  );

  // Pass 1: group rows into distinct places (city + country).
  const places = new Map();
  for (const row of sorted) {
    const key = `${row.city}\u0000${row.country}`;
    if (!places.has(key)) {
      places.set(key, {
        name: row.city,
        country: row.country,
        continent: row.continent,
        rows: [],
      });
    }
    places.get(key).rows.push(row);
  }

  // Pass 2: group places by base slug to detect collisions up front.
  const byBase = new Map();
  for (const place of places.values()) {
    const base = slugify(place.name);
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(place);
  }

  // Pass 3: assign final slugs and build the index.
  const cities = new Map();
  for (const [base, group] of byBase) {
    for (const place of group) {
      const preferred =
        group.length === 1 ? base : slugify(`${place.name}-${place.country}`);
      let slug = preferred;
      let n = 2;
      while (cities.has(slug)) slug = `${preferred}-${n++}`;

      const city = {
        name: place.name,
        country: place.country,
        continent: place.continent,
        slug,
        restaurants: [],
      };
      for (const row of place.rows) {
        const rBase = slugify(row.name);
        let rSlug = rBase;
        let m = 2;
        while (city.restaurants.some((r) => r.slug === rSlug)) {
          rSlug = `${rBase}-${m++}`;
        }
        city.restaurants.push({ ...row, slug: rSlug });
      }
      cities.set(slug, city);
    }
  }
  return cities;
}

/** Continent → Country → City tree (with slugs + counts), biggest first. */
export function buildTree(cityIndex) {
  const continents = new Map();
  for (const city of cityIndex.values()) {
    if (!continents.has(city.continent)) {
      continents.set(city.continent, new Map());
    }
    const countries = continents.get(city.continent);
    if (!countries.has(city.country)) countries.set(city.country, []);
    countries.get(city.country).push({
      name: city.name,
      slug: city.slug,
      count: city.restaurants.length,
    });
  }

  const byCountDesc = (a, b) =>
    b.count - a.count || a.name.localeCompare(b.name);

  return [...continents.entries()]
    .map(([continentName, countries]) => {
      const countryNodes = [...countries.entries()]
        .map(([countryName, cities]) => ({
          name: countryName,
          count: cities.reduce((n, c) => n + c.count, 0),
          cities: [...cities].sort(byCountDesc),
        }))
        .sort(byCountDesc);
      return {
        name: continentName,
        count: countryNodes.reduce((n, c) => n + c.count, 0),
        countries: countryNodes,
      };
    })
    .sort(byCountDesc);
}

// --- internals -------------------------------------------------------------

/** Map loosely-named sheet headers onto our canonical fields. */
function normalizeRows(rawRows) {
  return rawRows
    .map((raw) => {
      const get = (...candidates) => {
        for (const key of Object.keys(raw)) {
          const k = key.trim().toLowerCase();
          if (candidates.some((c) => k === c || k.startsWith(c))) {
            return String(raw[key] ?? "").trim();
          }
        }
        return "";
      };
      const photosRaw = Array.isArray(raw.photos)
        ? raw.photos.join("\n")
        : get("photo", "link", "album");
      return {
        name: get("name", "restaurant"),
        continent: get("continent") || "Elsewhere",
        country: get("country") || "—",
        city: get("city") || "—",
        price: get("price"),
        notes: get("note"),
        photos: parsePhotoCell(photosRaw),
      };
    })
    .filter((row) => row.name.length > 0);
}

/**
 * Parse a Photos cell into [{ url, caption }].
 * One photo per line (or semicolon-separated), optional caption after a pipe:
 *   https://res.cloudinary.com/.../xlb.jpg | The xiao long bao that started it all
 * Bare comma-separated URL lists (no pipes) still work. Commas are fine
 * inside captions. Duplicate URLs are dropped.
 */
function parsePhotoCell(raw) {
  const photos = [];
  for (const entry of String(raw).split(/[\n;]+/)) {
    const [urlPart, ...captionParts] = entry.split("|");
    const caption = captionParts.join("|").trim();
    const urls = caption
      ? [urlPart.trim()]
      : urlPart.split(",").map((s) => s.trim());
    for (const url of urls) {
      // http(s) URLs or repo-local paths like /images/restaurants/xlb.jpg
      if (url.startsWith("http") || url.startsWith("/")) {
        photos.push({ url, caption });
      }
    }
  }
  const seen = new Set();
  return photos.filter((p) =>
    seen.has(p.url) ? false : (seen.add(p.url), true)
  );
}

/**
 * Serve an optimized rendition when the photo lives on Cloudinary: inject
 * f_auto,q_auto,w_ transforms into the delivery URL so full-res uploads
 * reach visitors as right-sized modern formats. Non-Cloudinary URLs pass
 * through untouched.
 */
export function optimizedPhotoUrl(url, width = 1200) {
  const match = url.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/
  );
  if (match) return `${match[1]}f_auto,q_auto,w_${width}/${match[2]}`;
  return url;
}

/** Minimal CSV parser: handles quoted fields, escaped quotes, CR/LF. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** First CSV row = headers; remaining rows become objects keyed by header. */
function csvToObjects(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] ?? "";
    });
    return obj;
  });
}
