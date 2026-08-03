// ---------------------------------------------------------------------------
// Work experience (from the 2025 resume), newest first. Each entry renders
// as one timeline card on the Career page. `tools` show as chips.
// Text fields are { en, zh }; tool/tech names stay in English by convention.
//
// `logo` shows in the expanded view. To add one: drop the image in
// public/images/logos/ and set the path (null = no logo shown).
// ---------------------------------------------------------------------------

export const experience = [
  {
    date: { en: "Jun 2025 to Present", zh: "2025年6月 至今" },
    title: {
      en: "Technology Design Co-Optimization Engineer Intern",
      zh: "技術設計協同最佳化實習工程師",
    },
    org: "Credo Semiconductor",
    location: { en: "San Jose, CA", zh: "加州聖荷西" },
    logo: "/images/logos/credo.svg",
    summary: {
      en: "Power and timing characterization for high-speed digital and AMS circuits.",
      zh: "高速數位與 AMS 電路的功耗與時序特性分析。",
    },
    bullets: [
      {
        en: "Delivered power and timing characterization reports for high-speed digital and AMS circuits, including PCIe, ADC, T&H, and MUX blocks.",
        zh: "交付高速數位與 AMS 電路的功耗與時序特性報告，涵蓋 PCIe、ADC、T&H 與 MUX 等區塊。",
      },
      {
        en: "Wrote Tcl utilities for physical implementation, including IP-aware placement blockages and filler insertion, verified through DRC runs.",
        zh: "撰寫實體實作的 Tcl 工具，包含 IP-aware placement blockage 與 filler 插入，並經 DRC 驗證。",
      },
      {
        en: "Enabled a Synopsys-to-MATLAB analysis pipeline with the MATLAB Engine API, replacing manual waveform exports with automatic post-simulation analysis.",
        zh: "以 MATLAB Engine API 建立 Synopsys 模擬至 MATLAB 的自動化分析管線，取代人工波形匯出。",
      },
    ],
    tools: ["Fusion Compiler", "Custom Compiler", "MATLAB", "Tcl", "Bash"],
  },
  {
    date: { en: "Sep 2024 to Dec 2024", zh: "2024年9月 至 12月" },
    title: {
      en: "Undergraduate Instructional Assistant",
      zh: "大學部教學助理",
    },
    org: "University of Massachusetts Amherst",
    location: { en: "Amherst, MA", zh: "麻州安默斯特" },
    logo: "/images/umass.png",
    summary: {
      en: "FPGA security labs and office hours for 120 students.",
      zh: "FPGA 安全實驗與 120 名學生的 Office Hour。",
    },
    bullets: [
      {
        en: "Hosted biweekly office hours, supporting 120 students on FPGA security labs, quizzes, and homework.",
        zh: "每兩週開設 Office Hour，協助 120 名學生完成 FPGA 安全實驗、測驗與作業。",
      },
      {
        en: "Led lab exercises, implementing circuits on FPGAs and integrating with the Nios II processor in Quartus Prime.",
        zh: "帶領實驗課程，在 FPGA 上實作電路並整合 Quartus Prime 中的 Nios II 處理器。",
      },
      {
        en: "Facilitated student-professor communication to resolve issues and ensure smooth course delivery.",
        zh: "促進學生與教授之間的溝通，確保課程順利進行。",
      },
      {
        en: "Graded labs, homework, and exams, providing detailed feedback to students and instructor.",
        zh: "批改實驗、作業與考試，提供詳細回饋。",
      },
    ],
    tools: ["FPGA", "Quartus Prime", "Nios II"],
  },
  {
    date: { en: "May 2024 to Aug 2024", zh: "2024年5月 至 8月" },
    title: { en: "Foundry Engineer Intern", zh: "晶圓代工實習工程師" },
    org: "Credo Semiconductor",
    location: { en: "San Jose, CA", zh: "加州聖荷西" },
    logo: "/images/logos/credo.svg",
    summary: {
      en: "PAM4 channel modeling, PLL co-simulation, and SerDes tool migration.",
      zh: "PAM4 通道模擬、PLL 協同模擬與 SerDes 工具遷移。",
    },
    bullets: [
      {
        en: "Simulated PAM4 channels in MATLAB with FFE/DFE equalization, analyzing eye openings and ADC slicer offset.",
        zh: "以 MATLAB 模擬 PAM4 通道並進行 FFE/DFE 等化，分析眼圖開口與 ADC slicer 偏移。",
      },
      {
        en: "Reduced PLL simulation times by 400% on Synopsys CC through Verilog-A scripting and Simulink co-simulation.",
        zh: "透過 Verilog-A 腳本與 Simulink 協同模擬，將 Synopsys CC 上的 PLL 模擬速度提升 4 倍。",
      },
      {
        en: "Migrated SerDes designs from Cadence Virtuoso to Synopsys CC, translating Tcl automation scripts to Perl.",
        zh: "將 SerDes 設計由 Cadence Virtuoso 遷移至 Synopsys CC，並將 Tcl 自動化腳本改寫為 Perl。",
      },
      {
        en: "Coordinated with Synopsys and MathWorks application engineers on co-simulation workflows and tool integration.",
        zh: "與 Synopsys 及 MathWorks 應用工程師協作，整合協同模擬工作流程。",
      },
    ],
    tools: ["MATLAB", "Simulink", "Verilog-A", "Synopsys CC", "Tcl → Perl"],
  },
  {
    date: { en: "Sep 2023 to Dec 2023", zh: "2023年9月 至 12月" },
    title: { en: "Assistant Researcher", zh: "研究助理" },
    org: "Emerging Embedded Technologies Lab",
    location: { en: "Amherst, MA", zh: "麻州安默斯特" },
    logo: "/images/umass.png", // UMass lab
    summary: {
      en: "Mixed Reality sensor-data capture and user-identification research.",
      zh: "混合實境感測資料擷取與使用者識別研究。",
    },
    bullets: [
      {
        en: "Researched methods of capturing Mixed Reality (MR) headset sensor data.",
        zh: "研究擷取混合實境（MR）頭戴裝置感測器資料的方法。",
      },
      {
        en: "Deployed MRTK, Photon Unity Networking, and MS Azure Spatial Anchors to create a collaborative MR environment.",
        zh: "部署 MRTK、Photon Unity Networking 與 MS Azure Spatial Anchors，建立協作式 MR 環境。",
      },
      {
        en: "Scripted a C# program to capture headset data and relevant metrics into CSV for analysis.",
        zh: "撰寫 C# 程式擷取頭戴裝置資料並輸出至 CSV 以供分析。",
      },
      {
        en: "Explored how adversaries could identify users from sensor readings alone.",
        zh: "探討攻擊者僅憑感測器讀數識別使用者的可能性。",
      },
    ],
    tools: ["Unity", "MRTK", "C#", "Azure"],
  },
  {
    date: { en: "Summer 2023", zh: "2023 夏" },
    title: { en: "Cyber Security Engineer Intern", zh: "資安實習工程師" },
    org: "Deloitte & Touche",
    location: { en: "Taipei, Taiwan", zh: "台北" },
    logo: "/images/logos/deloitte.svg",
    summary: {
      en: "AI-bias detection for fintech tools and a Python-automated social engineering test.",
      zh: "金融 AI 工具偏差檢測，以及 Python 自動化社交工程測試。",
    },
    bullets: [
      {
        en: "Detected bias in AI-driven finance management tools with Veritas Toolkit 2.0, deploying it across public AI fintech systems such as credit scoring models.",
        zh: "使用 Veritas Toolkit 2.0 檢測 AI 金融管理工具的偏差，部署於信用評分模型等公開 AI 金融系統。",
      },
      {
        en: "Exported and containerized models for seamless integration with the Veritas tool.",
        zh: "將模型匯出並容器化，以無縫整合 Veritas 工具。",
      },
      {
        en: "Presented findings to audit and solutions teams, shaping how to quantify the metrics and next steps for AI governance in finance.",
        zh: "向稽核與解決方案團隊簡報分析結果，討論指標量化方式與金融 AI 治理的後續方向。",
      },
      {
        en: "Automated the annual internal social engineering test with Python, covering roughly 400 employees and cutting completion time by 30% versus the manual method.",
        zh: "以 Python 自動化年度內部社交工程測試，涵蓋約 400 名員工，較人工方式節省 30% 時間。",
      },
    ],
    tools: ["Veritas Toolkit 2.0", "Python", "Containerization"],
  },
];

export const education = [
  {
    school: {
      en: "University of Southern California",
      zh: "南加州大學（USC）",
    },
    degree: {
      en: "M.S. in Computer Engineering",
      zh: "電腦工程碩士",
    },
    years: { en: "2025 to Present", zh: "2025 至今" },
    logo: "/images/usc.png",
    coursework: [
      "VLSI System Design",
      "Digital Signal Processing",
      "Integrated Memories",
    ],
  },
  {
    school: {
      en: "University of Massachusetts Amherst",
      zh: "麻薩諸塞大學安默斯特分校",
    },
    degree: {
      en: "B.S. in Computer Engineering",
      zh: "電腦工程學士",
    },
    years: { en: "2021 to 2025", zh: "2021 至 2025" },
    logo: "/images/umass.png",
    coursework: [
      "VLSI Design",
      "FPGA Security",
      "Computer Architecture",
      "Embedded Systems",
      "Machine Learning",
    ],
  },
];

export const leadership = [
  {
    date: { en: "2022 to 2025", zh: "2022 至 2025" },
    title: {
      en: "Vice President & Co-founder, Culinary Arts Club",
      zh: "烹飪藝術社 副社長／共同創辦人",
    },
    org: "University of Massachusetts Amherst",
    location: { en: "Amherst, MA", zh: "麻州安默斯特" },
    logo: "/images/umass.png",
    summary: {
      en: "Weekly cooking sessions for 20 members, plus a Discord/Jira bot and a $17k budget.",
      zh: "每週帶 20 名成員下廚，外加 Discord/Jira 機器人與 1.7 萬美元預算。",
    },
    bullets: [
      {
        en: "Coordinated and hosted weekly cooking sessions, directing a team of 20 members in an industrial-grade kitchen.",
        zh: "每週策劃並主持烹飪活動，在商用等級廚房帶領 20 名成員。",
      },
      {
        en: "Scripted a Discord bot synced to Jira Cloud to automate task handling, pushing tasks with approaching deadlines.",
        zh: "撰寫與 Jira Cloud 同步的 Discord 機器人，自動推播即將到期的任務提醒。",
      },
      {
        en: "Mapped out a $17,000 term budget to fund club events, ensuring efficient resource allocation.",
        zh: "規劃 17,000 美元的學期預算，確保社團活動資源有效分配。",
      },
    ],
    tools: ["Discord API", "Jira Cloud"],
  },
];
