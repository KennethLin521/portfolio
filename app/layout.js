import { Newsreader, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "../lib/i18n";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import OllieTakeover from "../components/OllieTakeover";
import "./globals.css";

// Three-font system, one job each (formal serif direction):
//   Newsreader       → big display headings, Times-adjacent editorial serif
//   Source Serif 4   → body text
//   JetBrains Mono   → labels, dates, counts, the engineering accent
// Chinese falls back to system serif fonts via the CSS stacks in globals.
const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
});
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {/* Marks that JS is running — scroll-reveal styles only hide content
            under .js, so a no-JS visitor still sees everything. The console
            line is a hint for fellow engineers. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "console.log('%cchips + \\u5403 \\u00b7 \\ud83d\\udc15 x5','color:#e07a4f;font-family:monospace;font-size:12px');",
          }}
        />
        <LanguageProvider>
          <SiteNav />
          <main className="site-main">{children}</main>
          <SiteFooter />
          <OllieTakeover />
        </LanguageProvider>
      </body>
    </html>
  );
}
