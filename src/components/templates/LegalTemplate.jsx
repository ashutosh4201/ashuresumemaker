import { BulletList, shellStyle } from "./shared/resumeParts.jsx";

export default function LegalTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ fontFamily: "'Times New Roman', Times, serif", padding: "44px 48px" })}>
      <header style={{ textAlign: "center", borderBottom: "2px solid #0f172a", paddingBottom: 16, marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{personal.fullName}</h1>
        <p style={{ margin: "8px 0 0", fontSize: 13, fontStyle: "italic" }}>{personal.title}</p>
        <p style={{ margin: "10px 0 0", fontSize: 11 }}>{[personal.email, personal.phone, personal.location].filter(Boolean).join(" | ")}</p>
      </header>
      {personal.summary && (
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, borderBottom: "1px solid #cbd5e1", paddingBottom: 4, marginBottom: 8 }}>OBJECTIVE</h2>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, textAlign: "justify" }}>{personal.summary}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, borderBottom: "1px solid #cbd5e1", paddingBottom: 4, marginBottom: 10 }}>PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 14, pageBreakInside: "avoid" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 12 }}>
                <span>{exp.role}, {exp.company}</span>
                <span style={{ fontWeight: 400 }}>{exp.start} – {exp.end}</span>
              </div>
              <BulletList items={exp.bullets} style={{ fontFamily: "Times New Roman, serif" }} />
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, borderBottom: "1px solid #cbd5e1", paddingBottom: 4, marginBottom: 10 }}>EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8, fontSize: 12 }}>
              <strong>{edu.degree}</strong>, {edu.school} ({edu.start}–{edu.end})
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, borderBottom: "1px solid #cbd5e1", paddingBottom: 4, marginBottom: 8 }}>SKILLS & COMPETENCIES</h2>
          <p style={{ margin: 0, fontSize: 12 }}>{skills.join("; ")}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 700, borderBottom: "1px solid #cbd5e1", paddingBottom: 4, marginBottom: 10 }}>ADDITIONAL PROJECTS</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8, fontSize: 12 }}>
              <strong>{p.name}</strong> — {p.description}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
