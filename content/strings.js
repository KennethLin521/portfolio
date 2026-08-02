// ---------------------------------------------------------------------------
// Shared UI strings ("chrome") in both languages. Page-specific prose lives
// next to its data in the other content/ files.
// ---------------------------------------------------------------------------

export const ui = {
  nav: {
    career: { en: "Career", zh: "職涯" },
    food: { en: "Food", zh: "食" },
    ollie: { en: "Ollie", zh: "Ollie" },
  },

  languageNames: {
    en: "English",
    zh: "中文",
    vi: "Tiếng Việt",
  },

  // Shown when someone picks Vietnamese. Kenneth is still learning. 😂
  viToast: "Xin lỗi, mình vẫn đang học! 😂",

  home: {
    kicker: "KENNETH LIN / PORTFOLIO",
    careerCard: {
      label: "01 / CAREER",
      title: {
        en: "Chips, signals, and the tools I live in",
        zh: "晶片、訊號，和我天天泡在裡面的工具",
      },
      blurb: {
        en: "Experience, projects, and education, from RTL to silicon.",
        zh: "經歷、專案與學歷，從 RTL 到晶片。",
      },
      arrow: { en: "→ the work", zh: "→ 看正事" },
    },
    foodCard: {
      label: "02 / FOOD",
      title: {
        en: "Cooking, and everywhere worth eating",
        zh: "下廚，以及所有值得一吃的地方",
      },
      blurb: {
        en: "What I cook, and a world list of restaurants worth remembering.",
        zh: "我做的菜，還有一份世界各地值得記住的餐廳清單。",
      },
      arrow: { en: "→ the list", zh: "→ 看清單" },
    },
  },

  career: {
    kicker: "01 / CAREER",
    title: { en: "Career", zh: "職涯" },
    linkedinCta: { en: "Connect on LinkedIn ↗", zh: "LinkedIn 找我 ↗" },
    resumeCta: { en: "Resume ↗", zh: "履歷 ↗" },
    sections: {
      experience: { en: "Experience", zh: "經歷" },
      projects: { en: "Featured Projects", zh: "精選專案" },
      education: { en: "Education", zh: "學歷" },
      skills: { en: "Technical Skills", zh: "技術能力" },
      leadership: { en: "Leadership", zh: "領導經歷" },
    },
    courseworkLabel: { en: "Relevant coursework", zh: "相關課程" },
  },

  food: {
    kicker: "02 / FOOD",
    title: { en: "The other half", zh: "吃喝的那一半" },
    listTitle: { en: "Restaurants", zh: "餐廳" },
    listBlurb: {
      en: "A list of memorable restaurants I’ve eaten at.",
      zh: "我吃過、值得記住的餐廳。",
    },
    sampleBanner: {
      en: "Showing sample data. The real list is coming soon.",
      zh: "目前顯示的是範例資料，真正的清單即將上線。",
    },
    stats: (lang, { restaurants, cities, countries }) =>
      lang === "zh"
        ? `${restaurants} 間餐廳 · ${cities} 座城市 · ${countries} 個國家`
        : `${restaurants} RESTAURANTS · ${cities} CITIES · ${countries} COUNTRIES`,
    backToFood: { en: "← All regions", zh: "← 回所有地區" },
    restaurantCount: (lang, n) =>
      lang === "zh" ? `${n} 間餐廳` : n === 1 ? "1 restaurant" : `${n} restaurants`,
  },

  ollie: {
    kicker: "03 / OLLIE",
    title: { en: "This is my dog Ollie", zh: "這是我的狗 Ollie" },
  },

  footer: {
    kicker: { en: "GET IN TOUCH", zh: "聯絡我" },
    blurb: {
      en: "The fastest way to reach me is LinkedIn. Restaurant arguments also welcome.",
      zh: "找我最快的方式是 LinkedIn，也歡迎來跟我吵哪家餐廳最好吃。",
    },
  },

  notFound: {
    title: { en: "Nothing on the menu here", zh: "這頁菜單上沒有東西" },
    body: { en: "This page does not exist. ", zh: "這個頁面不存在，" },
    homeLink: { en: "Head back home", zh: "回首頁" },
  },
};
