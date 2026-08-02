"use client";

import Link from "next/link";
import { useLang, pick } from "../lib/i18n";
import { ui } from "../content/strings";

// One city's restaurant list. Names and notes render exactly as they appear
// in the sheet, whatever language they're in.
export default function CityContent({ city }) {
  const { lang } = useLang();
  const t = ui.food;

  return (
    <div className="container">
      <header className="page-header">
        <Link href="/food" className="back-link">
          {pick(t.backToFood, lang)}
        </Link>
        <p className="kicker kicker--food">
          {city.continent} / {city.country}
        </p>
        <h1>{city.name}</h1>
        <p className="stats-line">
          {t.restaurantCount(lang, city.restaurants.length)}
        </p>
      </header>

      {/* Plain list — only the restaurant name itself is the link */}
      <div className="city-restaurant-list">
        {city.restaurants.map((r) => (
          <div className="city-restaurant-row" key={r.slug}>
            <Link
              href={`/food/${city.slug}/${r.slug}`}
              className="restaurant-name-link"
            >
              {r.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
