import { BulletList, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

export default function FreshGradTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: "36px 40px" })}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{personal.fullName}</h1>
        <p style={{ margin: "4px 0", fontSize: 13, color: accent, fontWeight: 600 }}>{personal.title}</p>
        <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>{[personal.email, personal.phone, personal.location].filter(Boolean).join(" · ")}</p>
      </header>
      {education.length > 0 && (
        <section style={{ marginBottom: 22, pageBreakInside: "avoid" }}>
          <SectionHeading title="Education" accent={accent} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 12, padding: 14, border: `2px solid ${accent}`, borderRadius: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{edu.degree}</div>
              <div style={{ fontSize: 13, color: accent, fontWeight: 600, marginTop: 4 }}>{edu.school}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{edu.start} – {edu.end} {edu.location && `· ${edu.location}`}</div>
            </div>
          ))}
        </section>
      )}
      {personal.summary && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Career Objective" accent={accent} />
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#475569" }}>{personal.summary}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Academic & Personal Projects" accent={accent} />
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 12, pageBreakInside: "avoid" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: accent }}>{p.name}</div>
              {p.link && <div style={{ fontSize: 10, color: "#94a3b8" }}>{p.link}</div>}
              <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#475569" }}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Internships & Experience" accent={accent} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 12, pageBreakInside: "avoid" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>{exp.role} @ {exp.company}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>{exp.start}–{exp.end}</span>
              </div>
              <BulletList items={exp.bullets} />
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section>
          <SectionHeading title="Technical Skills" accent={accent} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s) => (
              <span key={s} style={{ background: accent, color: "#fff", padding: "5px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
