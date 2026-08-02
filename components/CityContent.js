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

      <div className="city-restaurant-list">
        {city.restaurants.map((r) => (
          <Link
            key={r.slug}
            href={`/food/${city.slug}/${r.slug}`}
            className="city-restaurant-row"
          >
            <div className="row-main">
              <span className="name">{r.name}</span>
              {r.price && <span className="price">{r.price}</span>}
            </div>
            {r.notes && <p className="notes">{r.notes}</p>}
            <span className="row-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
