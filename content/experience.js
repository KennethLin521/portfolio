// ---------------------------------------------------------------------------
// Work experience (from the 2025 resume), newest first. Each entry renders
// as one timeline card on the Career page. `tools` show as chips.
// Text fields are { en, zh }; tool/tech names stay in English by convention.
// ---------------------------------------------------------------------------

export const experience = [
  {
    date: { en: "Jun 2025 – Present", zh: "2025年6月 – 至今" },
    title: {
      en: "Technology Design Co-Optimization Engineer Intern",
      zh: "技術設計協同最佳化實習工程師",
    },
    org: "Credo Semiconductor",
    location: { en: "San Jose, CA", zh: "加州聖荷西" },
    summary: {
      en: "High-speed circuit characterization and RTL-to-GDSII flow automation on advanced nodes.",
      zh: "先進製程上的高速電路特性分析與 RTL-to-GDSII 流程自動化。",
    },
    bullets: [
      {
        en: "Delivered testbenches to characterize high-speed circuits across frequency, timing, and power metrics.",
        zh: "建置測試平台，針對高速電路進行頻率、時序與功耗特性分析。",
      },
      {
        en: "Optimized the Rx signal chain (CTLE, Sample & Hold, ADC) with ASO.ai to enhance signal integrity and performance.",
        zh: "使用 ASO.ai 最佳化 Rx 訊號鏈（CTLE、Sample & Hold、ADC），提升訊號完整性與效能。",
      },
      {
        en: "Migrating a legacy Fusion Compiler flow to an advanced PDK, reading RTL designs and compiling NDMs with Tcl.",
        zh: "將舊有 Fusion Compiler 流程遷移至先進 PDK，解讀 RTL 設計並以 Tcl 編譯 NDM。",
      },
      {
        en: "Developed a MATLAB–PrimeWave pipeline for automated waveform post-processing, accelerating schematic validation.",
        zh: "開發 MATLAB–PrimeWave 自動化波形後處理流程，加速電路驗證。",
      },
    ],
    tools: ["Fusion Compiler", "PrimeWave", "MATLAB", "Tcl", "ASO.ai"],
  },
  {
    date: { en: "Sep 2024 – Dec 2024", zh: "2024年9月 – 12月" },
    title: {
      en: "Undergraduate Instructional Assistant",
      zh: "大學部教學助理",
    },
    org: "University of Massachusetts Amherst",
    location: { en: "Amherst, MA", zh: "麻州安默斯特" },
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
        en: "Facilitated student–professor communication to resolve issues and ensure smooth course delivery.",
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
    date: { en: "May 2024 – Aug 2024", zh: "2024年5月 – 8月" },
    title: { en: "Foundry Engineer Intern", zh: "晶圓代工實習工程師" },
    org: "Credo Semiconductor",
    location: { en: "San Jose, CA", zh: "加州聖荷西" },
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
    date: { en: "Sep 2023 – Dec 2023", zh: "2023年9月 – 12月" },
    title: { en: "Assistant Researcher", zh: "研究助理" },
    org: "Emerging Embedded Technologies Lab",
    location: { en: "Amherst, MA", zh: "麻州安默斯特" },
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
    years: { en: "2025 – Present", zh: "2025 – 至今" },
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
    years: { en: "2021 – 2025", zh: "2021 – 2025" },
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
    date: { en: "2022 – 2025", zh: "2022 – 2025" },
    title: {
      en: "Vice President & Co-founder, Culinary Arts Club",
      zh: "烹飪藝術社 副社長／共同創辦人",
    },
    org: "University of Massachusetts Amherst",
    location: { en: "Amherst, MA", zh: "麻州安默斯特" },
    summary: {
      en: "Weekly cooking sessions for 20 members — plus a Discord/Jira bot and a $17k budget.",
      zh: "每週帶 20 名成員下廚——外加 Discord/Jira 機器人與 1.7 萬美元預算。",
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
