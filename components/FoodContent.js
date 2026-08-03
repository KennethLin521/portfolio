"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { ui } from "../content/strings";

// The /food page: intro, socials, and the region list. Continents fold out
// to countries (labels) and cities (links). City/country/continent names
// come straight from the sheet and are intentionally not translated.
export default function FoodContent({ tree, source }) {
  const { lang } = useLang();
  const t = ui.food;
  const { links } = profile;
  const [openContinents, setOpenContinents] = useState(() => new Set());

  const toggle = (name) =>
    setOpenContinents((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const socials = [
    ["TikTok", links.tiktok],
    ["Instagram", links.instagram],
    ["Beli", links.beli],
  ].filter(([, url]) => Boolean(url));

  return (
    <div className="container casual">
      <header className="page-header">
        <p className="kicker kicker--food">{t.kicker}</p>
        <h1>{pick(t.title, lang)}</h1>
        <p className="lede">{pick(profile.foodBio, lang)}</p>
      </header>

      <div className="social-row">
        {socials.map(([label, url]) => (
          <a
            key={label}
            className="social-btn"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label} ↗
          </a>
        ))}
      </div>

      <section className="section">
        <div className="section-label">
          <span className="num">01</span>
          <h2>{pick(t.listTitle, lang)}</h2>
        </div>
        <p className="list-blurb">{pick(t.listBlurb, lang)}</p>
        {source === "sample" && (
          <div className="sample-banner">{pick(t.sampleBanner, lang)}</div>
        )}

        <div className="region-list">
          {tree.map((continent) => {
            const isOpen = openContinents.has(continent.name);
            return (
              <section className="continent" key={continent.name}>
                <button
                  className="continent-toggle"
                  onClick={() => toggle(continent.name)}
                  aria-expanded={isOpen}
                >
                  <span className="continent-label">
                    <span className="continent-name">{continent.name}</span>
                    <span className="count">({continent.count})</span>
                  </span>
                  <span className="continent-sign" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div className={`fold${isOpen ? " is-open" : ""}`}>
                  <div>
                    {continent.countries.map((country) => (
                      <div className="country-block" key={country.name}>
                        <div className="country-header">
                          <h3>{country.name}</h3>
                        </div>
                        <div className="city-links">
                          {country.cities.map((city) => (
                            <Link
                              key={city.slug}
                              href={`/food/${city.slug}`}
                              className="city-link"
                            >
                              {city.name}
                              <span className="count"> ({city.count})</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Placeholder for the future cooking half of this page */}
      <section className="section">
        <div className="section-label">
          <span className="num">02</span>
          <h2>{pick(t.cookingTitle, lang)}</h2>
        </div>
        <p className="list-blurb">{pick(t.cookingTbd, lang)}</p>
      </section>
    </div>
  );
}
