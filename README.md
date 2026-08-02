# kennethlin.com — personal site

Half engineering portfolio, half food. Built with Next.js, deployed on Vercel.

## Where things live

```
content/          ← EDIT THESE to update the site (no code knowledge needed)
  profile.js        name, bios, social links
  experience.js     work timeline + education
  projects.js       featured projects
  skills.js         skill chips
app/              pages (home, /engineering, /food, /food/restaurants)
components/       nav, footer, restaurant explorer
lib/restaurants.js  fetches + parses the Google Sheet CSV
data/restaurants-sample.json  placeholder rows shown until the sheet is connected
public/images/    all images
app/globals.css   the entire stylesheet (~700 lines, organized by section)
```

## The restaurant list

The `/food/restaurants` page reads a Google Sheet. One flat sheet, columns:

| Name | Continent | Country | City | Price | Notes | Photo Links |
|------|-----------|---------|------|-------|-------|-------------|

- **Price**: `$` / `$$` / `$$$`, relative to the country.
- **Photo Links**: paste one or more URLs, separated by commas or new lines.
- No merged cells, no per-region tabs — the site groups rows into
  Continent → Country → City automatically and shows counts.

### Connecting the sheet

1. In Google Sheets: **File → Share → Publish to web** → pick the tab →
   **Comma-separated values (.csv)** → copy the URL.
2. In Vercel: **Project → Settings → Environment Variables** → add
   `RESTAURANTS_CSV_URL` = that URL → redeploy once.
3. New rows appear on the site within an hour (no redeploy needed after
   the first one) — the page re-fetches the sheet hourly.

Until that's set, the page shows clearly-labeled sample data.

## Running locally (needs Node.js)

```bash
npm install
npm run dev     # → http://localhost:3000
```

Pushing to `main` deploys production; any other branch gets a Vercel
preview URL automatically.
