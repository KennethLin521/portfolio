import Link from "next/link";
import { profile } from "../content/profile";

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <p className="kicker">KENNETH LIN — PORTFOLIO</p>
        <h1>
          Computer <span className="u-eng">engineer</span> with a serious{" "}
          <span className="u-food">appetite</span>.
        </h1>
        <p className="sub">{profile.subhead}</p>
      </section>

      <section className="paths container">
        <Link href="/engineering" className="path-card path-card--eng">
          <span className="path-label">01 / ENGINEERING</span>
          <h2>Chips, signals, and the tools I live in.</h2>
          <p>
            Experience from RTL to tape-out — ASIC/FPGA design, DSP, and
            mixed-signal work, plus projects and the full toolbox.
          </p>
          <span className="path-arrow">→ the work</span>
        </Link>

        <Link href="/food" className="path-card path-card--food">
          <span className="path-label">02 / FOOD</span>
          <h2>Cooking, and everywhere worth eating.</h2>
          <p>
            What I cook, where I post it, and a world map of restaurants —
            heaviest in Taiwan and Vietnam, where it means the most.
          </p>
          <span className="path-arrow">→ the list</span>
        </Link>
      </section>
    </>
  );
}
