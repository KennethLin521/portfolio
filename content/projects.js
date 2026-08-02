// ---------------------------------------------------------------------------
// Featured projects on the Career page (the two from the 2025 resume).
// Cards are collapsed to the tagline; clicking expands the full description.
//
// To add a picture: drop a file in public/images/projects/ and set `image`
// (e.g. image: "/images/projects/pam4-eye.png"). null = no image shown.
// ---------------------------------------------------------------------------

export const projects = [
  {
    name: "PAM4 DSP Equalizer — 3-tap FFE / 1-tap DFE",
    date: { en: "Summer 2026", zh: "2026 夏" },
    tagline: {
      en: "Adaptive FFE/DFE equalizer, from MATLAB model to signed-off GDSII.",
      zh: "適應性 FFE/DFE 等化器，從 MATLAB 模型到完成簽核的 GDSII。",
    },
    description: {
      en: "An SS-LMS adaptive 3-tap FFE / 1-tap DFE equalizer, closing timing at 50 MHz post-layout on SkyWater 130nm. RTL verified against MATLAB co-simulation with eye-diagram metrics and BER analysis; RTL-to-GDSII automated with Yosys and OpenROAD to a DRC-clean, timing-clean signoff.",
      zh: "SS-LMS 適應性 3-tap FFE / 1-tap DFE 等化器，於 SkyWater 130nm 製程完成 50 MHz 佈局後時序收斂。RTL 透過 MATLAB 協同模擬驗證，以眼圖指標與 BER 分析確認；並以 Yosys 與 OpenROAD 自動化 RTL-to-GDSII 流程，完成 DRC 與時序皆通過的簽核。",
    },
    tags: ["MATLAB", "Verilog", "Yosys / OpenROAD", "SkyWater 130nm"],
    image: null,
  },
  {
    name: "512-bit SRAM Array",
    date: { en: "Spring 2026", zh: "2026 春" },
    tagline: {
      en: "Custom 512-bit array reaching 650 MHz post-layout.",
      zh: "佈局後達 650 MHz 的客製 512-bit 陣列。",
    },
    description: {
      en: "A 512-bit SRAM array with peripheral logic, reaching 1 GHz pre-layout simulation and 650 MHz post-layout. Hierarchical layout generation automated with SKILL scripting, minimizing area through custom cell abutment; verified through DRC/LVS sign-off with read/write test vector sequences.",
      zh: "含週邊邏輯的 512-bit SRAM 陣列，佈局前模擬達 1 GHz、佈局後達 650 MHz。以 SKILL 腳本自動產生階層式佈局，透過自訂 cell 拼接最小化面積；經 DRC/LVS 簽核與讀寫測試向量驗證。",
    },
    tags: ["Cadence Virtuoso", "SKILL", "DRC / LVS"],
    image: null,
  },
];
