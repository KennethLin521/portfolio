"use client";

import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { ui } from "../content/strings";

// Minimal home: greeting, two lines of who-this-is, quiet links.
// Navigation lives in the top bar.
export default function HomeContent() {
  const { lang } = useLang();
  const { links } = profile;

  return (
    <section className="hero container">
      <p className="kicker">{ui.home.kicker}</p>
      <p className="sub">{pick(profile.subhead, lang)}</p>
      <p className="home-bio">{pick(profile.homeBio, lang)}</p>
      <div className="home-links">
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <a
          href="/Kenneth_Lin_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {pick(ui.home.resume, lang)} ↗
        </a>
      </div>
    </section>
  );
}
