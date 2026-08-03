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
    // The menu-card index: big serif name, dotted leader, small description
    menu: [
      {
        href: "/career",
        num: "01",
        label: { en: "Career", zh: "職涯" },
        desc: { en: "the serious half", zh: "正經的那一半" },
        accent: "eng",
      },
      {
        href: "/food",
        num: "02",
        label: { en: "Food", zh: "食" },
        desc: { en: "the delicious half", zh: "好吃的那一半" },
        accent: "food",
      },
      {
        href: "/ollie",
        num: "03",
        label: { en: "Ollie", zh: "Ollie" },
        desc: { en: "the best boy", zh: "最乖的那位" },
        accent: "food",
      },
    ],
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
    listTitle: { en: "Restaurants", zh: "餐廳" },
    listBlurb: {
      en: "A list of memorable restaurants I’ve eaten at",
      zh: "我吃過、值得記住的餐廳",
    },
    sampleBanner: {
      en: "Showing sample data. The real list is coming soon.",
      zh: "目前顯示的是範例資料，真正的清單即將上線。",
    },
    cookingTitle: { en: "Cooking", zh: "下廚" },
    cookingTbd: {
      en: "TBD, this half is still in the kitchen",
      zh: "TBD，這一半還在廚房裡準備",
    },
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
  },

  notFound: {
    title: { en: "Nothing on the menu here", zh: "這頁菜單上沒有東西" },
    body: { en: "This page does not exist. ", zh: "這個頁面不存在，" },
    homeLink: { en: "Head back home", zh: "回首頁" },
  },
};
