"use client";

import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { experience, education, leadership } from "../content/experience";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";
import { ui } from "../content/strings";
import Reveal from "./Reveal";

const SECTIONS = ["experience", "projects", "education", "skills", "leadership"];

function TimelineItem({ item, lang }) {
  return (
    <article className="timeline-item">
      <p className="date">{pick(item.date, lang)}</p>
      <h3>{pick(item.title, lang)}</h3>
      <p className="org">
        {item.org} · {pick(item.location, lang)}
      </p>
      <ul>
        {item.bullets.map((b) => (
          <li key={b.en}>{pick(b, lang)}</li>
        ))}
      </ul>
      <div className="chip-row">
        {item.tools.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function CareerContent() {
  const { lang } = useLang();
  const t = ui.career;

  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker kicker--eng">{t.kicker}</p>
        <h1>{pick(t.title, lang)}</h1>
      </header>

      {/* In-page anchor nav — sticks under the main nav on scroll */}
      <nav className="subnav" aria-label="Page sections">
        {SECTIONS.map((id) => (
          <a key={id} href={`#${id}`} className="subnav-link">
            {pick(t.sections[id], lang)}
          </a>
        ))}
      </nav>

      <div className="intro-row">
        <img src="/images/linkedin.jpg" alt="Kenneth Lin" />
        <div className="bio">
          <p>{pick(profile.careerBio, lang)}</p>
          <a
            className="text-link cta"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pick(t.linkedinCta, lang)}
          </a>
        </div>
      </div>

      <section className="section" id="experience">
        <div className="section-label">
          <span className="num">01</span>
          <h2>{pick(t.sections.experience, lang)}</h2>
        </div>
        <div className="timeline">
          {experience.map((job) => (
            <Reveal key={job.title.en + job.date.en}>
              <TimelineItem item={job} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-label">
          <span className="num">02</span>
          <h2>{pick(t.sections.projects, lang)}</h2>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <Reveal key={p.name}>
              <article className="project-card">
                <p className="date">{pick(p.date, lang)}</p>
                <h3>{p.name}</h3>
                <p>{pick(p.description, lang)}</p>
                <div className="chip-row">
                  {p.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="education">
        <div className="section-label">
          <span className="num">03</span>
          <h2>{pick(t.sections.education, lang)}</h2>
        </div>
        <div className="education-stack">
          {education.map((school) => (
            <Reveal key={school.school.en}>
              <div className="education-card">
                <div>
                  <h3>{pick(school.school, lang)}</h3>
                  <p className="degree">
                    {pick(school.degree, lang)} · {pick(school.years, lang)}
                  </p>
                  <p className="coursework-label">
                    {pick(t.courseworkLabel, lang)}
                  </p>
                  <div className="chip-row">
                    {school.coursework.map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <img src={school.logo} alt="" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-label">
          <span className="num">04</span>
          <h2>{pick(t.sections.skills, lang)}</h2>
        </div>
        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group.label.en}>
              <h3>{pick(group.label, lang)}</h3>
              <div className="chip-row">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="leadership">
        <div className="section-label">
          <span className="num">05</span>
          <h2>{pick(t.sections.leadership, lang)}</h2>
        </div>
        <div className="timeline">
          {leadership.map((item) => (
            <Reveal key={item.title.en}>
              <TimelineItem item={item} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
