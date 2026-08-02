# kennethlin.com — personal site

Half engineering portfolio, half food. Built with Next.js, deployed on Vercel.
Dark theme, English + 中文 (Traditional), with a language picker in the nav.

## Where things live

```
content/          ← EDIT THESE to update the site (no code knowledge needed)
  profile.js        name, bios, social links        (fields are { en, zh })
  experience.js     work timeline, education, leadership
  projects.js       featured projects
  skills.js         skill chips
  strings.js        shared UI labels in both languages
app/              routes: /, /career, /food, /food/[city], /food/[city]/[restaurant]
components/       nav (language menu), footer, page content, Reveal animation
lib/
  i18n.js           tiny client-side language context ({ en, zh } + pick())
  restaurants.js    fetches + parses the Google Sheet CSV, builds city index
  slug.js           URL slugs (Vietnamese folds to ASCII, CJK kept as-is)
data/restaurants-sample.json  placeholder rows shown until the sheet is connected
public/images/    all images
app/globals.css   the entire stylesheet, organized by section
```

## Languages

English is the default. The nav has a language menu (EN / 中文 / Tiếng Việt —
the last one is a running joke until Kenneth's Vietnamese improves 😂).
Site chrome and written content translate; **restaurant names, notes, and
place names never translate** — they render exactly as typed in the sheet.

## The restaurant list

`/food` shows the region tree (Continent → Country → City with counts).
Each city links to `/food/<city>`, and each restaurant gets its own page at
`/food/<city>/<restaurant>` — blog-ish, driven entirely by the sheet.

One flat Google Sheet, columns:

| Name | Continent | Country | City | Price | Notes | Photo Links |
|------|-----------|---------|------|-------|-------|-------------|

- **Price**: `$` / `$$` / `$$$`, relative to the country.
- **Photo Links**: one photo per line, optional caption after a `|`:
  ```
  https://res.cloudinary.com/<cloud>/image/upload/v1/xlb.jpg | The xiao long bao that started it all
  https://res.cloudinary.com/<cloud>/image/upload/v1/interior.jpg
  ```
  Photos render as a captioned gallery on the restaurant's page. Cloudinary
  URLs are automatically served as resized/compressed modern formats
  (upload full-res, the site handles the rest). Non-image links (e.g. a
  Google Photos album page) won't render as pictures.
- No merged cells, no per-region tabs — the site groups and counts rows
  automatically.

### Connecting the sheet

1. In Google Sheets: **File → Share → Publish to web** → pick the tab →
   **Comma-separated values (.csv)** → copy the URL.
2. In Vercel: **Project → Settings → Environment Variables** → add
   `RESTAURANTS_CSV_URL` = that URL → redeploy once.
3. New rows appear on the site within an hour (no redeploy needed after
   the first one) — pages re-fetch the sheet hourly.

Until that's set, the pages show clearly-labeled sample data.

## Running locally (needs Node.js)

```bash
npm install
npm run dev     # → http://localhost:3000
```

Pushing to `main` deploys production; any other branch gets a Vercel
preview URL automatically.
