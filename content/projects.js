// ---------------------------------------------------------------------------
// Featured projects on the Career page. The first two are from the 2025
// resume; the last two are earlier undergrad work worth keeping around.
// ---------------------------------------------------------------------------

export const projects = [
  {
    name: "PAM4 DSP Equalizer — 3-tap FFE / 1-tap DFE",
    date: { en: "Summer 2026", zh: "2026 夏" },
    description: {
      en: "An SS-LMS adaptive 3-tap FFE / 1-tap DFE equalizer, closing timing at 50 MHz post-layout on SkyWater 130nm. RTL verified against MATLAB co-simulation with eye-diagram metrics and BER analysis; RTL-to-GDSII automated with Yosys and OpenROAD to a DRC-clean, timing-clean signoff.",
      zh: "SS-LMS 適應性 3-tap FFE / 1-tap DFE 等化器，於 SkyWater 130nm 製程完成 50 MHz 佈局後時序收斂。RTL 透過 MATLAB 協同模擬驗證，以眼圖指標與 BER 分析確認；並以 Yosys 與 OpenROAD 自動化 RTL-to-GDSII 流程，完成 DRC 與時序皆通過的簽核。",
    },
    tags: ["MATLAB", "Verilog", "Yosys / OpenROAD", "SkyWater 130nm"],
  },
  {
    name: "512-bit SRAM Array",
    date: { en: "Spring 2026", zh: "2026 春" },
    description: {
      en: "A 512-bit SRAM array with peripheral logic, reaching 1 GHz pre-sim and 650 MHz post-layout. Hierarchical layout generation automated with SKILL scripting, minimizing area through custom cell abutment; verified through DRC/LVS sign-off with read/write test vector sequences.",
      zh: "含週邊邏輯的 512-bit SRAM 陣列，佈局前模擬達 1 GHz、佈局後達 650 MHz。以 SKILL 腳本自動產生階層式佈局，透過自訂 cell 拼接最小化面積；經 DRC/LVS 簽核與讀寫測試向量驗證。",
    },
    tags: ["Cadence Virtuoso", "SKILL", "DRC / LVS"],
  },
  {
    name: "Efficient Dual-ALU RISC-V Processor",
    date: { en: "2024", zh: "2024" },
    description: {
      en: "A custom RISC-V processor with dual ALUs that dynamically switches between high and low precision for power efficiency. Designed the datapath and control unit, then validated with comprehensive testbenches and SPICE simulation for full RV32I compliance.",
      zh: "客製化雙 ALU RISC-V 處理器，可在高低精度間動態切換以最佳化功耗。設計資料路徑與控制單元，並以完整測試平台與 SPICE 模擬驗證，完全符合 RV32I 指令集。",
    },
    tags: ["Cadence Virtuoso", "Cadence Innovus", "Synopsys Verdi", "RISC-V"],
  },
  {
    name: "PulsePatch",
    date: { en: "2024", zh: "2024" },
    description: {
      en: "A wearable ECG device for real-time cardiac monitoring, focused on minimizing channel noise. Built a CNN classifier trained on the MIT-BIH dataset to detect arrhythmias, and engineered a portable battery-powered system with verified power consumption and signal quality.",
      zh: "即時心電監測穿戴裝置，著重降低通道雜訊。以 MIT-BIH 資料集訓練 CNN 分類器偵測心律不整，並打造可攜式電池供電系統，驗證功耗與訊號品質。",
    },
    tags: ["Embedded C", "TensorFlow", "KiCad", "Android Studio"],
  },
];
