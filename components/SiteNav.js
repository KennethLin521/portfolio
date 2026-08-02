"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang, pick } from "../lib/i18n";
import { ui } from "../content/strings";

export default function SiteNav() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const menuRef = useRef(null);
  const toastTimer = useRef(null);

  // Close the dropdown on any outside click.
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const choose = (code) => {
    setMenuOpen(false);
    if (code === "vi") {
      // Vietnamese isn't ready — Kenneth is still learning. 😂
      setToast(true);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(false), 3000);
      return;
    }
    setLang(code);
  };

  const links = [
    { href: "/career", label: pick(ui.nav.career, lang) },
    { href: "/food", label: pick(ui.nav.food, lang) },
    { href: "/ollie", label: pick(ui.nav.ollie, lang) },
  ];

  return (
    <>
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-name">
          Kenneth Lin
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${
                pathname.startsWith(href) ? " is-active" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="lang" ref={menuRef}>
            <button
              className="lang-btn"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {lang === "zh" ? "中文" : "EN"} <span className="caret-down">▾</span>
            </button>
            {menuOpen && (
              <div className="lang-menu" role="menu">
                {["en", "zh", "vi"].map((code) => (
                  <button
                    key={code}
                    role="menuitem"
                    className={`lang-option${
                      lang === code ? " is-current" : ""
                    }`}
                    onClick={() => choose(code)}
                  >
                    {ui.languageNames[code]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

    </header>

    {/* Outside the <header>: backdrop-filter would otherwise hijack this
        fixed element's containing block and trap its z-index */}
    {toast && (
      <div className="toast" role="status">
        {ui.viToast}
      </div>
    )}
    </>
  );
}
