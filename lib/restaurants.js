// ---------------------------------------------------------------------------
// Restaurant list data layer.
//
// Reads a published-to-web Google Sheets CSV (RESTAURANTS_CSV_URL env var),
// parses it, and groups rows into Continent → Country → City for the
// explorer UI. While the env var is unset (or the fetch fails), it falls
// back to data/restaurants-sample.json so the page always renders.
//
// Expected sheet columns (order doesn't matter, extra columns are ignored):
//   Name | Continent | Country | City | Price | Notes | Photo Links
// ---------------------------------------------------------------------------

import sample from "../data/restaurants-sample.json";

// How often Vercel re-fetches the sheet (seconds). New rows show up on the
// site within this window — no redeploy needed.
const REVALIDATE_SECONDS = 3600;

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
    return { rows: normalized, source: "sheet" };
  } catch (err) {
    console.error("[restaurants] Falling back to sample data:", err.message);
    return { rows: normalizeRows(sample), source: "sample" };
  }
}

/** Group flat rows into a Continent → Country → City tree, biggest first. */
export function groupRestaurants(rows) {
  const continents = new Map();

  for (const row of rows) {
    if (!continents.has(row.continent)) continents.set(row.continent, new Map());
    const countries = continents.get(row.continent);

    if (!countries.has(row.country)) countries.set(row.country, new Map());
    const cities = countries.get(row.country);

    if (!cities.has(row.city)) cities.set(row.city, []);
    cities.get(row.city).push(row);
  }

  const byCountDesc = (a, b) => b.count - a.count || a.name.localeCompare(b.name);

  return [...continents.entries()]
    .map(([continentName, countries]) => {
      const countryNodes = [...countries.entries()]
        .map(([countryName, cities]) => {
          const cityNodes = [...cities.entries()]
            .map(([cityName, restaurants]) => ({
              name: cityName,
              count: restaurants.length,
              restaurants: [...restaurants].sort((a, b) => a.name.localeCompare(b.name)),
            }))
            .sort(byCountDesc);
          return {
            name: countryName,
            count: cityNodes.reduce((n, c) => n + c.count, 0),
            cities: cityNodes,
          };
        })
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
        photos: photosRaw
          .split(/[\n,;]+/)
          .map((s) => s.trim())
          .filter((s) => s.startsWith("http")),
      };
    })
    .filter((row) => row.name.length > 0);
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
  // Drop fully-empty lines (trailing newlines etc.)
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
