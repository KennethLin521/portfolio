"use client";

import { useLang, pick } from "../lib/i18n";
import { ui } from "../content/strings";

// The most important page on the site.
export default function OllieContent() {
  const { lang } = useLang();

  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker kicker--food">{ui.ollie.kicker}</p>
        <h1>{pick(ui.ollie.title, lang)}</h1>
      </header>
      <img className="ollie-photo" src="/images/olie.jpg" alt="Ollie the dog" />
    </div>
  );
}
