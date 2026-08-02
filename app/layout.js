import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "../lib/i18n";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import "./globals.css";

// Three-font system, one job each:
//   Fraunces (serif)  → big display headings, food-side warmth
//   Inter (sans)      → body text
//   JetBrains Mono    → labels, dates, counts — the engineering accent
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: {
    default: "Kenneth Lin",
    template: "%s — Kenneth Lin",
  },
  description:
    "Kenneth Lin — computer engineer with a serious appetite. Chip design work, cooking, and a running list of the best meals from Taipei to New York.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        {/* Marks that JS is running — scroll-reveal styles only hide content
            under .js, so a no-JS visitor still sees everything */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <LanguageProvider>
          <SiteNav />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
