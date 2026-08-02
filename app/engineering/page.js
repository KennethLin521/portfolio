import { profile } from "../../content/profile";
import { experience, education } from "../../content/experience";
import { projects } from "../../content/projects";
import { skillGroups } from "../../content/skills";

export const metadata = {
  title: "Engineering",
  description:
    "Kenneth Lin's engineering work — ASIC/FPGA design, DSP, and mixed-signal experience, projects, and skills.",
};

export default function EngineeringPage() {
  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker kicker--eng">01 / ENGINEERING</p>
        <h1>The work.</h1>
      </header>

      <div className="intro-row">
        <img src="/images/linkedin.jpg" alt="Kenneth Lin" />
        <div className="bio">
          <p>{profile.engineeringBio}</p>
          <a
            className="text-link cta"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>

      <section className="section" id="experience">
        <div className="section-label">
          <span className="num">01</span>
          <h2>Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((job) => (
            <article className="timeline-item" key={job.title + job.date}>
              <p className="date">{job.date}</p>
              <h3>{job.title}</h3>
              <p className="org">
                {job.org} · {job.location}
              </p>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="chip-row">
                {job.tools.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-label">
          <span className="num">02</span>
          <h2>Featured Projects</h2>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="chip-row">
                {p.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="education">
        <div className="section-label">
          <span className="num">03</span>
          <h2>Education</h2>
        </div>
        <div className="education-card">
          <div>
            <h3>{education.school}</h3>
            <p className="degree">
              {education.degree} · {education.years}
            </p>
            <div className="chip-row">
              {education.coursework.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <img src={education.logo} alt={`${education.school} logo`} />
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-label">
          <span className="num">04</span>
          <h2>Technical Skills</h2>
        </div>
        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group.label}>
              <h3>{group.label}</h3>
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
    </div>
  );
}
