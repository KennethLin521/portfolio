# HOW TO: add a restaurant, start to finish

This file is for future Kenneth. It never appears on the website — it only
lives here on GitHub. The whole pipeline:

```
Google Sheet row  →  page appears on site  →  (Claude "sync" makes the
empty review file)  →  you write the .md on GitHub  →  auto-deploys ~1 min
```

---

## 1. Add the restaurant to the Google Sheet

One row per restaurant on the MASTER sheet (the leftmost/published tab —
temp tabs are invisible to the site):

| Name | Continent | Country | City | Price |
|------|-----------|---------|------|-------|
| 小王煮瓜 | Asia | 臺灣 | 臺北 | $ |

Rules that matter:

- **Name and City in the language you want displayed.** They render exactly
  as typed, and they define the page URL.
- **Spelling consistency is everything.** 臺灣 in every Taiwan row, 臺北
  spelled identically every time. A stray variant (台北 vs 臺北) splits one
  city into two pages.
- **Price**: `$` / `$$` / `$$$`, relative to the country.
- Blank rows are fine (used as continent separators) — the site ignores
  any row without a Name.
- Extra personal columns are fine too, as long as the header doesn't start
  with: name, continent, country, city, price, note, photo, link, album.

**When does it go live?** The site re-reads the sheet every hour, and also
on every deploy (every commit to this repo). To force it immediately:
Vercel → portfolio project → Deployments → ⋯ on the top one → Redeploy.

## 2. Get the review file 

Option 1: Tell Claude

Option 2: DIY, the file must be
`content/reviews/<city-part>/<restaurant-part>.md` where the two parts are
copied from the restaurant page's URL — e.g. the page
`/food/new-york/katz-s-delicatessen` needs the file
`content/reviews/new-york/katz-s-delicatessen.md`. Spaces/punctuation
become hyphens, Vietnamese accents fold to plain letters, Chinese stays
Chinese. Copying from the URL bar avoids all guesswork.)

## 3. Write the review on GitHub

1. Open the file: repo → `content/reviews/<city>/<restaurant>.md` → click
   the pencil icon (top right of the file view). Or use the edit links
   in `REVIEWS-TODO.md`.
2. Write! Format is tiny, three rules:

   ```
   This is a paragraph. It can run as long as you want and wrap freely.

   A BLANK line starts a new paragraph. (A single Enter does NOT create a
   new line on the site — you need the full empty line between paragraphs.)

   ![caption for the photo](/images/restaurants/xiaowang-luroufan.jpg)
   ![two image lines touching render side by side](/images/restaurants/xiaowang-counter.jpg)
   ```

   - Blank line = new paragraph. That's the only text formatting.
   - `![caption](/images/restaurants/file.jpg)` on its own line = photo.
   - Two photo lines with no blank line between them = side-by-side pair.
   - Nothing else is markdown. `**bold**`, `# headings`, links etc. will
     show up literally as typed characters — don't use them.
   - Mixing 中文 into English text is fine anywhere.

3. Green **Commit changes** button (twice — button, then confirm popup).
   Live on the site in about a minute. Re-edit the same way anytime.

## 4. Photos

From Google Photos to the website:

1. **Download**: in Google Photos, open the photo → ⋮ menu → Download.
2. **Resize** (do this — originals are 3–8MB and will bloat the repo):
   - Windows: open the file in the **Photos** app → click **⋯** (top bar)
     → **Resize image** → set width to ~**1200px** → Save copy.
   - Or on the phone before downloading: share → "Medium" size.
   - Target: under ~500KB per photo.
   - Zero-effort alternative: send the originals to Claude, who resizes,
     names, uploads, and can drop the image lines into the reviews too.
3. **Rename** the file before uploading: short, lowercase, dashes —
   `xiaowang-luroufan.jpg`, not `IMG_20260823_193002.jpg`.
4. **Upload**: repo → `public/images/restaurants` → **Add file → Upload
   files** → drag the photos in → Commit.
5. **Reference** it in the review file: the path is always
   `/images/restaurants/` + the exact filename you uploaded:

   ```
   ![the braised pork rice](/images/restaurants/xiaowang-luroufan.jpg)
   ```

## 5. Renames and fixes

- Fixing text: just re-edit the file, commit again.
- Renaming a restaurant or city **in the sheet** changes its URL, so the
  review file must be renamed to match — tell Claude, or GitHub: open the
  file → pencil → edit the filename field at the top.
- Deleting: remove the sheet row (page disappears); the orphaned .md is
  harmless but can be deleted from GitHub (file → ⋮ → Delete file).
