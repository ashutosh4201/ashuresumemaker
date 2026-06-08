import { SectionHeading, shellStyle, COLORS } from "./shared/resumeParts.jsx";

export default function ClassicTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: "40px 44px" })}>
      <header style={{ marginBottom: 24, textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: COLORS.text }}>{personal.fullName}</h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, fontWeight: 600, color: accent }}>{personal.title}</p>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: COLORS.textLight }}>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(" · ")}
        </p>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Summary" accent={accent} />
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: COLORS.textMuted }}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Experience" accent={accent} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontWeight: 600, color: COLORS.text }}>
                <span>{exp.role}</span>
                <span style={{ fontSize: 10, fontWeight: 400, color: COLORS.textLight }}>{exp.start} – {exp.end}</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</div>
              <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 11, color: COLORS.textMuted, lineHeight: 1.55 }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Education" accent={accent} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, color: COLORS.text }}>{edu.degree}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{edu.school} · {edu.start} – {edu.end}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Skills" accent={accent} />
          <p style={{ margin: 0, fontSize: 11, color: COLORS.textMuted }}>{skills.join(" · ")}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <SectionHeading title="Projects" accent={accent} />
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, color: COLORS.text }}>{p.name}</div>
              {p.link && <div style={{ fontSize: 10, color: accent }}>{p.link}</div>}
              <p style={{ margin: "4px 0 0", fontSize: 11, color: COLORS.textMuted }}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
