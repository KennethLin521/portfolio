// ---------------------------------------------------------------------------
// Long-form restaurant reviews, one file per restaurant, living in the repo:
//
//   content/reviews/<city-slug>/<restaurant-slug>.md
//
// The Google Sheet stays a small index (one row per restaurant); anything
// long-form — paragraphs, photos, captions — goes in the review file. The
// restaurant page renders the file if it exists, in order, blog-style.
//
// Format (deliberately tiny, not full markdown):
//   - blank-line-separated paragraphs of plain text
//   - an image line:            ![caption here](/images/restaurants/xlb.jpg)
//   - two image lines in a row (no blank line between) render side by side
// ---------------------------------------------------------------------------

import fs from "fs";
import path from "path";

const REVIEWS_DIR = path.join(process.cwd(), "content", "reviews");

const IMAGE_LINE = /^!\[(.*?)\]\((.+?)\)$/;

/** Returns an array of blocks, or null when no review file exists. */
export function getReview(citySlug, restaurantSlug) {
  let raw;
  try {
    raw = fs.readFileSync(
      path.join(REVIEWS_DIR, citySlug, `${restaurantSlug}.md`),
      "utf8"
    );
  } catch {
    return null;
  }
  return parseReview(raw);
}

function parseReview(raw) {
  const blocks = raw
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block) => {
    const lines = block.split("\n").map((l) => l.trim());
    if (lines.every((l) => IMAGE_LINE.test(l))) {
      return {
        type: "images",
        items: lines.map((l) => {
          const [, caption, src] = l.match(IMAGE_LINE);
          return { caption, src };
        }),
      };
    }
    return { type: "paragraph", text: lines.join(" ") };
  });
}
