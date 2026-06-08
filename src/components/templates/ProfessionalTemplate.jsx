import { SectionHeading, shellStyle, COLORS } from "./shared/resumeParts.jsx";
import { hexWithAlpha } from "../../utils/resumeColors.js";

export default function ProfessionalTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;

  return (
    <div style={shellStyle({ padding: 0 })}>
      <header style={{ padding: "28px 36px", backgroundColor: accent, color: "#ffffff" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>{personal.fullName}</h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, opacity: 0.92 }}>{personal.title}</p>
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 16, fontSize: 11, opacity: 0.9 }}>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28, padding: "28px 36px" }}>
        <div>
          {personal.summary && (
            <section style={{ marginBottom: 22 }}>
              <SectionHeading title="Professional Summary" accent={accent} />
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: COLORS.textMuted }}>{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section style={{ marginBottom: 22 }}>
              <SectionHeading title="Work Experience" accent={accent} />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: 16, borderLeft: `3px solid ${accent}`, paddingLeft: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: COLORS.text }}>
                    <span>{exp.role}</span>
                    <span style={{ fontSize: 10, fontWeight: 400, color: COLORS.textLight }}>{exp.start} – {exp.end}</span>
                  </div>
                  <div style={{ fontSize: 11, color: accent, marginTop: 2 }}>{exp.company}</div>
                  <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 11, color: COLORS.textMuted, lineHeight: 1.55 }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <SectionHeading title="Projects" accent={accent} />
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.text }}>{p.name}</div>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: COLORS.textMuted }}>{p.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {skills.length > 0 && (
            <section style={{ marginBottom: 20, borderRadius: 8, background: hexWithAlpha(accent, 0.08), padding: 16 }}>
              <SectionHeading title="Skills" accent={accent} />
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {skills.map((s) => (
                  <li key={s} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: COLORS.textMuted, marginBottom: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: accent, flexShrink: 0 }} />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section style={{ borderRadius: 8, background: hexWithAlpha(accent, 0.08), padding: 16 }}>
              <SectionHeading title="Education" accent={accent} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 10, fontSize: 11 }}>
                  <div style={{ fontWeight: 700, color: COLORS.text }}>{edu.degree}</div>
                  <div style={{ color: COLORS.textMuted }}>{edu.school}</div>
                  <div style={{ color: COLORS.textLight }}>{edu.start} – {edu.end}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
