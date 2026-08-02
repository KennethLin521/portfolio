// ---------------------------------------------------------------------------
// Who I am + where to find me. Every text field is { en, zh } — the site
// resolves the right one at render time (English is the fallback).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Kenneth Lin",

  // Home page hero — kept intentionally simple.
  heroTitlePrefix: { en: "Hi, I’m ", zh: "嗨，我是 " },
  heroTitleName: "Kenneth",
  heroTitleSuffix: { en: "", zh: "" },
  subhead: {
    en: "Welcome to my corner of the internet. Have a look around.",
    zh: "歡迎來到我的網路小角落，隨意逛逛。",
  },

  // Career page intro (from the 2025 resume summary)
  careerBio: {
    en: "I’m a Computer Engineering master’s student at USC with experience in digital flows and high-speed circuit simulation. Currently at Credo Semiconductor.",
    zh: "我目前在南加州大學（USC）攻讀電腦工程碩士，具備數位流程與高速電路模擬的經驗。現於 Credo Semiconductor 實習。",
  },

  // Food page intro
  foodBio: {
    en: "Home cook and restauranteur.",
    zh: "在家下廚，出門吃館子。",
  },

  links: {
    linkedin: "https://www.linkedin.com/in/linkeneth/",
    github: "https://github.com/KennethLin521",
    tiktok: "https://www.tiktok.com/@kennethcooks0",
    beli: "https://beliapp.co/app/KennethLin521",
    // Drop the real Instagram URL in here and it appears site-wide.
    // Empty = hidden everywhere.
    instagram: "",
  },
};
