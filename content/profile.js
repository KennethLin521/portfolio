// ---------------------------------------------------------------------------
// Who I am + where to find me. Every text field is { en, zh } — the site
// resolves the right one at render time (English is the fallback).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Kenneth Lin",

  // Home page hero — kept intentionally simple.
  heroTitlePrefix: { en: "Hi, I’m ", zh: "嗨，我是 " },
  heroTitleName: "Kenneth",
  heroTitleSuffix: { en: ".", zh: "。" },
  subhead: {
    en: "Welcome to my corner of the internet. Have a look around.",
    zh: "歡迎來到我的網路小角落，隨意逛逛。",
  },

  // Career page intro (from the 2025 resume summary)
  careerBio: {
    en: "I’m a Computer Engineering master’s student at USC with experience in flow automation and high-speed circuit characterization. I’m drawn to the space where signal integrity meets digital implementation: high-speed connectivity, from RTL to silicon. Currently at Credo Semiconductor.",
    zh: "我目前在南加州大學（USC）攻讀電腦工程碩士，具備流程自動化與高速電路特性分析的經驗。我特別著迷於訊號完整性與數位實作交會的領域，也就是從 RTL 到晶片的高速連接技術。現於 Credo Semiconductor 實習。",
  },

  // Food page intro
  foodBio: {
    en: "Cooking is how I unwind; eating is how I travel. Most of my food content lives on TikTok, and every restaurant that earns a spot goes on the list.",
    zh: "下廚是我放鬆的方式，吃是我旅行的方式。我的美食內容大多在 TikTok，而每一家值得記住的餐廳，都會被我記進清單裡。",
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
