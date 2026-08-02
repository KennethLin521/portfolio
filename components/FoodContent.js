"use client";

import Link from "next/link";
import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { ui } from "../content/strings";
import Reveal from "./Reveal";

// The /food page: intro, socials, the region → city list, and the kitchen
// gallery. City/country/continent names come straight from the sheet and are
// intentionally not translated.
export default function FoodContent({ tree, source, stats }) {
  const { lang } = useLang();
  const t = ui.food;
  const { links } = profile;
  const socials = [
    ["TikTok", links.tiktok],
    ["Instagram", links.instagram],
    ["Beli", links.beli],
  ].filter(([, url]) => Boolean(url));

  return (
    <div className="container">
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
        <p className="stats-line">{t.stats(lang, stats)}</p>
        {source === "sample" && (
          <div className="sample-banner">{pick(t.sampleBanner, lang)}</div>
        )}

        <div className="region-list">
          {tree.map((continent) => (
            <Reveal key={continent.name}>
              <section className="continent">
                <div className="continent-header">
                  <h2>{continent.name}</h2>
                  <span className="count">({continent.count})</span>
                </div>
                {continent.countries.map((country) => (
                  <div className="country-block" key={country.name}>
                    <div className="country-header">
                      <h3>{country.name}</h3>
                      <span className="count">({country.count})</span>
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
              </section>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
