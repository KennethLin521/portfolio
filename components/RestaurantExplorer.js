"use client";

import { useState } from "react";

// Continent → Country → City drill-down. Continents are always visible;
// countries and cities expand on click. Counts everywhere, like "Taipei (65)".
export default function RestaurantExplorer({ tree }) {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div className="explorer">
      {tree.map((continent) => (
        <section className="continent" key={continent.name}>
          <div className="continent-header">
            <h2>{continent.name}</h2>
            <span className="count">({continent.count})</span>
          </div>

          {continent.countries.map((country) => {
            const countryKey = `${continent.name}/${country.name}`;
            const countryOpen = open.has(countryKey);
            return (
              <div className="country" key={countryKey}>
                <button
                  className="country-toggle"
                  onClick={() => toggle(countryKey)}
                  aria-expanded={countryOpen}
                >
                  <span className={`caret${countryOpen ? " is-open" : ""}`}>
                    ▶
                  </span>
                  <span className="name">{country.name}</span>
                  <span className="count">({country.count})</span>
                </button>

                {countryOpen &&
                  country.cities.map((city) => {
                    const cityKey = `${countryKey}/${city.name}`;
                    const cityOpen = open.has(cityKey);
                    return (
                      <div className="city-block" key={cityKey}>
                        <button
                          className="city-toggle"
                          onClick={() => toggle(cityKey)}
                          aria-expanded={cityOpen}
                        >
                          <span
                            className={`caret${cityOpen ? " is-open" : ""}`}
                          >
                            ▶
                          </span>
                          <span className="name">{city.name}</span>
                          <span className="count">({city.count})</span>
                        </button>

                        {cityOpen && (
                          <div className="restaurant-list">
                            {city.restaurants.map((r) => (
                              <article
                                className="restaurant-card"
                                key={r.name}
                              >
                                <div className="row">
                                  <span className="name">{r.name}</span>
                                  {r.price && (
                                    <span className="price">{r.price}</span>
                                  )}
                                </div>
                                {r.notes && (
                                  <p className="notes">{r.notes}</p>
                                )}
                                {r.photos.length > 0 && (
                                  <div className="photo-links">
                                    {r.photos.map((url, i) => (
                                      <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        photos {i + 1} ↗
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </article>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
