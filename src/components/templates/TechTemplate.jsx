import {
  BulletList,
  JobBlock,
  SectionHeading,
  EducationBlock,
  ProjectBlock,
  shellStyle,
  COLORS,
} from "./shared/resumeParts.jsx";

export default function TechTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;

  return (
    <div style={shellStyle({ display: "flex", padding: 0 })}>
      <aside
        style={{
          width: 250,
          flexShrink: 0,
          background: "#0f172a",
          color: "#fff",
          padding: "36px 24px",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.25 }}>
          {personal.fullName}
        </h1>
        <p style={{ margin: "8px 0 24px", fontSize: 12.5, fontWeight: 600, color: accent }}>
          {personal.title}
        </p>

        {[
          ["EMAIL", personal.email],
          ["PHONE", personal.phone],
          ["LOCATION", personal.location],
          ["WEB", personal.website],
        ]
          .filter(([, v]) => v)
          .map(([label, val]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 3,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.45, wordBreak: "break-word" }}>{val}</div>
            </div>
          ))}

        {skills.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: accent,
                marginBottom: 12,
              }}
            >
              TECHNICAL SKILLS
            </div>
            {skills.map((s) => (
              <div
                key={s}
                style={{
                  fontSize: 11,
                  padding: "6px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </aside>

      <main style={{ flex: 1, padding: "36px 32px 40px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 22 }}>
            <SectionHeading title="Profile" accent={accent} />
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: COLORS.textMuted }}>
              {personal.summary}
            </p>
          </section>
        )}
        {experience.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <SectionHeading title="Experience" accent={accent} />
            {experience.map((exp) => (
              <JobBlock key={exp.id} exp={exp} accent={accent} />
            ))}
          </section>
        )}
        {projects.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <SectionHeading title="Projects" accent={accent} />
            {projects.map((p) => (
              <ProjectBlock key={p.id} project={p} accent={accent} />
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section>
            <SectionHeading title="Education" accent={accent} />
            {education.map((edu) => (
              <EducationBlock key={edu.id} edu={edu} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
