"use client";

import Link from "next/link";
import { useLang, pick } from "../lib/i18n";
import { ui } from "../content/strings";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker">404</p>
        <h1>{pick(ui.notFound.title, lang)}</h1>
        <p className="lede">
          {pick(ui.notFound.body, lang)}
          <Link href="/" className="text-link">
            {pick(ui.notFound.homeLink, lang)}
          </Link>
          {lang === "zh" ? "。" : "."}
        </p>
      </header>
    </div>
  );
}
