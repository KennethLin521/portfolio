"use client";

import Link from "next/link";
import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { ui } from "../content/strings";

export default function HomeContent() {
  const { lang } = useLang();

  return (
    <div className="casual">
      <section className="hero container">
        <p className="kicker">{ui.home.kicker}</p>
        <h1>
          <span className="u-food">{pick(profile.heroTitle, lang)}</span>
        </h1>
        <p className="sub">{pick(profile.subhead, lang)}</p>
      </section>

      {/* Menu-card index: like a restaurant menu, not a nav grid */}
      <section className="menu container" aria-label="Site index">
        {ui.home.menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`menu-row menu-row--${item.accent}`}
          >
            <span className="menu-num">{item.num}</span>
            <span className="menu-name">{pick(item.label, lang)}</span>
            <span className="menu-dots" aria-hidden="true" />
            <span className="menu-desc">{pick(item.desc, lang)}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
