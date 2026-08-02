"use client";

import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { ui } from "../content/strings";

export default function SiteFooter() {
  const { lang } = useLang();
  const { links } = profile;
  const external = [
    ["LinkedIn", links.linkedin],
    ["GitHub", links.github],
    ["TikTok", links.tiktok],
    ["Instagram", links.instagram],
    ["Beli", links.beli],
  ].filter(([, url]) => Boolean(url));

  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <div>
          <p className="footer-kicker">{pick(ui.footer.kicker, lang)}</p>
          <p className="footer-blurb">{pick(ui.footer.blurb, lang)}</p>
        </div>
        <nav className="footer-links" aria-label="Social links">
          {external.map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer">
              {label} ↗
            </a>
          ))}
        </nav>
      </div>
      <div className="container footer-meta">
        {/* suppressHydrationWarning: static HTML may carry last deploy's year */}
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} Kenneth Lin
        </span>
        <span>Next.js · Vercel</span>
      </div>
    </footer>
  );
}
