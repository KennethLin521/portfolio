"use client";

import Link from "next/link";
import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { ui } from "../content/strings";

export default function HomeContent() {
  const { lang } = useLang();
  const { careerCard, foodCard } = ui.home;

  return (
    <>
      <section className="hero container">
        <p className="kicker">{ui.home.kicker}</p>
        <h1>
          {pick(profile.heroTitlePrefix, lang)}
          <span className="u-food">{profile.heroTitleName}</span>
          {pick(profile.heroTitleSuffix, lang)}
        </h1>
        <p className="sub">{pick(profile.subhead, lang)}</p>
      </section>

      <section className="paths container">
        <Link href="/career" className="path-card path-card--eng">
          <span className="path-label">{careerCard.label}</span>
          <h2>{pick(careerCard.title, lang)}</h2>
          <p>{pick(careerCard.blurb, lang)}</p>
          <span className="path-arrow">{pick(careerCard.arrow, lang)}</span>
        </Link>

        <Link href="/food" className="path-card path-card--food">
          <span className="path-label">{foodCard.label}</span>
          <h2>{pick(foodCard.title, lang)}</h2>
          <p>{pick(foodCard.blurb, lang)}</p>
          <span className="path-arrow">{pick(foodCard.arrow, lang)}</span>
        </Link>
      </section>
    </>
  );
}
