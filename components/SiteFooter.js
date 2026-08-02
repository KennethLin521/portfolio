import { profile } from "../content/profile";

export default function SiteFooter() {
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
          <p className="footer-kicker">GET IN TOUCH</p>
          <p className="footer-blurb">
            The fastest way to reach me is LinkedIn. Restaurant arguments also
            welcome.
          </p>
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
        <span>© {new Date().getFullYear()} Kenneth Lin</span>
        <span>Next.js · Vercel</span>
      </div>
    </footer>
  );
}
