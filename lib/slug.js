// URL slugs for city and restaurant pages. Vietnamese diacritics fold to
// ASCII (Banh Mi Huynh Hoa style); CJK characters are kept as-is
// (Next.js handles Unicode routes fine).
export function slugify(input) {
  return (
    String(input)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // strip combining accents
      .replace(/đ/g, "d") // Vietnamese d-bar (lowercase)
      .replace(/Đ/g, "D") // Vietnamese D-bar (uppercase)
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "x"
  );
}
