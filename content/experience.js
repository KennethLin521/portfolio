// ---------------------------------------------------------------------------
// Work experience, newest first. Each entry renders as one timeline card on
// the Engineering page. `tools` show as small chips under the bullets.
// ---------------------------------------------------------------------------

export const experience = [
  {
    date: "Summer 2025",
    title: "Technology Design Co-Optimization Engineer Intern",
    org: "Credo Semiconductor",
    location: "San Jose, CA",
    bullets: [
      "Worked on process node migration and RTL-to-GDSII flows for advanced semiconductor designs.",
      "Conducted signal analysis and DSP optimization for high-speed communication systems.",
      "Designed and tested SAR ADC architectures for precision analog-to-digital conversion.",
      "Implemented Synopsys pipelining techniques and integrated with MATLAB for system-level validation.",
    ],
    tools: ["RTL-to-GDSII", "DSP", "SAR ADC", "Synopsys", "MATLAB"],
  },
  {
    date: "Fall 2024",
    title: "Undergraduate Instructional Assistant",
    org: "University of Massachusetts Amherst",
    location: "Amherst, MA",
    bullets: [
      "Hosted biweekly office hours, supporting ~120 students on FPGA security labs and homework.",
      "Assisted with lab procedures, such as implementing a TRNG on Altera Quartus Prime with Nios II scripting.",
      "Facilitated communication between students and professor, addressing concerns and ensuring smooth course delivery.",
      "Graded labs, homework, and exams, providing feedback to both course instructor and students.",
    ],
    tools: ["FPGA", "Quartus Prime", "Nios II"],
  },
  {
    date: "Summer 2024",
    title: "Foundry Engineer Intern",
    org: "Credo Semiconductor",
    location: "San Jose, CA",
    bullets: [
      "Simulated a PAM4 channel in MATLAB with FFE/DFE equalization, visualizing eye openings and ADC slicer offset.",
      "Reduced PLL simulation times by 400% on Synopsys Custom Compiler through Verilog-A scripting and Simulink co-simulation.",
      "Migrated SerDes designs from Cadence Virtuoso to Synopsys CC, translating Tcl automation scripts to Perl.",
      "Facilitated meetings with Synopsys and MathWorks application engineers on co-simulation workflows.",
    ],
    tools: ["MATLAB", "Simulink", "Verilog-A", "Synopsys CC", "Tcl → Perl"],
  },
  {
    date: "Fall 2023",
    title: "Assistant Researcher",
    org: "Emerging Embedded Technologies Lab",
    location: "Amherst, MA",
    bullets: [
      "Researched methods of capturing Mixed Reality (MR) headset sensor data.",
      "Deployed MRTK, Photon Unity Networking, and Azure Spatial Anchors to create a collaborative MR environment.",
      "Scripted a C# program to capture headset data and relevant metrics into CSV for analysis.",
      "Explored how adversaries could identify users from sensor readings alone.",
    ],
    tools: ["Unity", "MRTK", "C#", "Azure"],
  },
  {
    date: "Summer 2023",
    title: "Cyber Security Engineer Intern",
    org: "Deloitte & Touche",
    location: "Taipei, Taiwan",
    bullets: [
      "Assessed bias in blackbox AI fintech tools using Veritas Toolkit 2.0.",
      "Automated an internal social-engineering test with Python, saving 30% versus the manual method.",
      "Translated NIST AI frameworks to Chinese, quantifying and presenting proposals.",
      "Assisted app development for startup clients using Android Studio, Gradle, and the Google Maps API.",
    ],
    tools: ["Python", "Veritas Toolkit", "Android Studio"],
  },
];

export const education = {
  school: "University of Massachusetts Amherst",
  degree: "B.S. in Computer Engineering",
  years: "2021 – 2025",
  logo: "/images/umass.png",
  coursework: [
    "VLSI Design",
    "FPGA Security",
    "Computer Architecture",
    "Digital Signal Processing",
    "Digital Communication Systems",
    "Statistics",
    "Security Engineering",
    "Wireless Networking",
    "Embedded Systems",
    "Machine Learning",
  ],
};
