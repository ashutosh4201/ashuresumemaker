import { SectionHeading, shellStyle, COLORS, FONTS } from "./shared/resumeParts.jsx";

export default function MinimalTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;

  return (
    <div style={shellStyle({ padding: "48px 52px", fontFamily: FONTS.serif })}>
      <header style={{ marginBottom: 36, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: COLORS.text }}>{personal.fullName}</h1>
        <p style={{ margin: "10px 0 0", fontSize: 14, fontStyle: "italic", color: COLORS.textMuted }}>{personal.title}</p>
        <p style={{ margin: "12px 0 0", fontSize: 10, color: COLORS.textLight }}>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(" · ")}
        </p>
      </header>

      {personal.summary && (
        <p style={{ margin: "0 0 28px", fontSize: 12, lineHeight: 1.85, color: COLORS.textMuted }}>{personal.summary}</p>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <SectionHeading title="Experience" accent={accent} style={{ fontFamily: FONTS.sans }} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontWeight: 700, color: COLORS.text }}>{exp.role}</span>
                <span style={{ fontSize: 10, color: COLORS.textLight }}>{exp.start} – {exp.end}</span>
              </div>
              <div style={{ fontSize: 11, color: accent, marginTop: 2 }}>{exp.company}</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 16, fontSize: 11, color: COLORS.textMuted, lineHeight: 1.6 }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <SectionHeading title="Education" accent={accent} style={{ fontFamily: FONTS.sans }} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8, fontSize: 11 }}>
              <span style={{ fontWeight: 700 }}>{edu.degree}</span>
              <span style={{ color: COLORS.textMuted }}> — {edu.school}, {edu.end}</span>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <SectionHeading title="Skills" accent={accent} style={{ fontFamily: FONTS.sans }} />
          <p style={{ margin: 0, fontSize: 11, color: COLORS.textMuted }}>{skills.join(", ")}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <SectionHeading title="Projects" accent={accent} style={{ fontFamily: FONTS.sans }} />
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 12, fontSize: 11 }}>
              <span style={{ fontWeight: 700, color: COLORS.text }}>{p.name}</span>
              <p style={{ margin: "4px 0 0", color: COLORS.textMuted }}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
