# kennethlin.com personal site

Next.js, deployed on Vercel — every push to `main` goes live in ~1 minute.

Quick map, for future me:

- `content/` — all the text: experience, projects, UI strings, and
  restaurant reviews (`content/reviews/<city>/<restaurant>.md`)
- `app/` + `components/` — pages and layout; `app/globals.css` is the
  entire stylesheet
- `public/images/` — all images
- Restaurant list comes from a Google Sheet (published CSV, wired via the
  `RESTAURANTS_CSV_URL` env var in Vercel; refreshes hourly or on deploy)
- **How to add restaurants/reviews/photos: see [HOWTO-restaurants.md](HOWTO-restaurants.md)**
- Review checklist with edit links: [REVIEWS-TODO.md](REVIEWS-TODO.md)

## Running locally (needs Node.js)

```bash
npm install
npm run dev     # → http://localhost:3000
```
