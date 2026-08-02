"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/engineering", label: "Engineering" },
  { href: "/food", label: "Food" },
  { href: "/food/restaurants", label: "Restaurants" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-name">
          Kenneth Lin
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {LINKS.map(({ href, label }) => {
            const active =
              href === "/food"
                ? pathname === "/food"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${active ? " is-active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
