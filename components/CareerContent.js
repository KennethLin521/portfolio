"use client";

import { useEffect, useState } from "react";
import { useLang, pick } from "../lib/i18n";
import { profile } from "../content/profile";
import { experience, education, leadership } from "../content/experience";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";
import { ui } from "../content/strings";
import Reveal from "./Reveal";

const SECTIONS = ["experience", "projects", "education", "skills", "leadership"];

// One expandable timeline entry. Content flows per role: title (with the
// date on the same line), then the summary — which the bullets replace in
// place when the card is opened. Stacked entries (item.roles) lead with the
// company; the logo and the +/− live in a slim right column. The whole card
// is the click target.
function TimelineItem({ item, lang, open, onToggle }) {
  const roles = item.roles ?? [item];
  const stacked = Boolean(item.roles);

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      className="timeline-item xp-card"
      onClick={onToggle}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="xp-card-top">
        <div className="xp-card-main">
          {stacked && (
            <span className="org org-lead">
              {item.org} · {pick(item.location, lang)}
            </span>
          )}
          {roles.map((role) => (
            <div className="role" key={role.title.en}>
              <div className="role-row">
                <span className="xp-title">{pick(role.title, lang)}</span>
                <span className="date">{pick(role.date, lang)}</span>
              </div>
              {!stacked && (
                <span className="org">
                  {item.org} · {pick(item.location, lang)}
                </span>
              )}
              {/* Summary is for skimming; the bullets replace it in place */}
              {!open && (
                <span className="xp-summary">{pick(role.summary, lang)}</span>
              )}
              <div className={`xp-body${open ? " is-open" : ""}`}>
                <div>
                  <ul>
                    {role.bullets.map((b) => (
                      <li key={b.en}>{pick(b, lang)}</li>
                    ))}
                  </ul>
                  <div className="chip-row">
                    {role.tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="xp-card-side">
          {item.logo && (
            <img className="xp-logo" src={item.logo} alt={`${item.org} logo`} />
          )}
          <span className="xp-sign" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </div>
      </div>
    </article>
  );
}

// One expandable project card: collapsed = name + tagline, expanded =
// description + side-by-side images (click to enlarge) + tags.
function ProjectCard({ project, lang, open, onToggle, onZoom }) {
  return (
    <article className="project-card">
      <button className="xp-toggle" onClick={onToggle} aria-expanded={open}>
        <span className="xp-head">
          <span className="role-row">
            <span className="xp-title xp-title--serif">{project.name}</span>
            <span className="date">{pick(project.date, lang)}</span>
          </span>
          {!open && (
            <span className="xp-summary">{pick(project.tagline, lang)}</span>
          )}
        </span>
        <span className="xp-sign" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div className={`xp-body${open ? " is-open" : ""}`}>
        <div>
          <p className="proj-desc">{pick(project.description, lang)}</p>
          {project.images?.length > 0 && (
            <div className="proj-img-row">
              {project.images.map((img) => (
                <figure key={img.src}>
                  <button
                    className="proj-zoom"
                    onClick={() =>
                      onZoom({ src: img.src, caption: pick(img.caption, lang) })
                    }
                    aria-label={`Enlarge: ${pick(img.caption, lang)}`}
                  >
                    <img
                      src={img.src}
                      alt={pick(img.caption, lang)}
                      loading="lazy"
                    />
                  </button>
                  <figcaption>{pick(img.caption, lang)}</figcaption>
                </figure>
              ))}
            </div>
          )}
          <div className="chip-row">
            {project.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CareerContent() {
  const { lang } = useLang();
  const t = ui.career;
  const [open, setOpen] = useState(() => new Set());
  const [zoom, setZoom] = useState(null); // { src, caption } | null

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  // Esc closes the image lightbox
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <div className="container formal">
      {/* Header: intro text sits beside the portrait — no dead whitespace */}
      <header className="page-header career-header">
        <div className="career-header-text">
          <p className="kicker kicker--eng">{t.kicker}</p>
          <h1>{pick(t.title, lang)}</h1>
          <p className="lede">{pick(profile.careerBio, lang)}</p>
          <span className="cta-row">
            <a
              className="text-link cta"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pick(t.linkedinCta, lang)}
            </a>
            <a
              className="text-link cta"
              href="/Kenneth_Lin_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {pick(t.resumeCta, lang)}
            </a>
          </span>
        </div>
        <img className="portrait" src="/images/linkedin.jpg" alt="Kenneth Lin" />
      </header>

      {/* In-page anchor nav — sticks under the main nav on scroll */}
      <nav className="subnav" aria-label="Page sections">
        {SECTIONS.map((id) => (
          <a key={id} href={`#${id}`} className="subnav-link">
            {pick(t.sections[id], lang)}
          </a>
        ))}
      </nav>

      <section className="section" id="experience">
        <div className="section-label">
          <span className="num">01</span>
          <h2>{pick(t.sections.experience, lang)}</h2>
        </div>
        <div className="timeline">
          {experience.map((job) => {
            const key = job.roles ? job.org : job.title.en + job.date.en;
            return (
              <Reveal key={key}>
                <TimelineItem
                  item={job}
                  lang={lang}
                  open={open.has(key)}
                  onToggle={() => toggle(key)}
                />
              </Reveal>
            );
          })}
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
              <ProjectCard
                project={p}
                lang={lang}
                open={open.has(p.name)}
                onToggle={() => toggle(p.name)}
                onZoom={setZoom}
              />
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

      {zoom && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoom(null)}
        >
          <figure>
            <img src={zoom.src} alt={zoom.caption} />
            {zoom.caption && <figcaption>{zoom.caption}</figcaption>}
          </figure>
        </div>
      )}

      <section className="section" id="leadership">
        <div className="section-label">
          <span className="num">05</span>
          <h2>{pick(t.sections.leadership, lang)}</h2>
        </div>
        <div className="timeline">
          {leadership.map((item) => {
            const key = item.title.en;
            return (
              <Reveal key={key}>
                <TimelineItem
                  item={item}
                  lang={lang}
                  open={open.has(key)}
                  onToggle={() => toggle(key)}
                />
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
