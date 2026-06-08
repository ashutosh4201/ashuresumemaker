import { BulletList, JobBlock, shellStyle } from "./shared/resumeParts.jsx";

export default function HarvardTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ fontFamily: "'Merriweather', Georgia, serif", padding: "44px 48px" })}>
      <header style={{ textAlign: "center", borderBottom: "1px solid #cbd5e1", paddingBottom: 20, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#0f172a" }}>{personal.fullName}</h1>
        <p style={{ margin: "6px 0", fontSize: 13, fontStyle: "italic", color: "#475569" }}>{personal.title}</p>
        <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).join(" · ")}
        </p>
      </header>
      {personal.summary && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Summary</h2>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "#334155" }}>{personal.summary}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "Inter, sans-serif" }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 14, pageBreakInside: "avoid" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>{exp.role}, {exp.company}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>{exp.start}–{exp.end}</span>
              </div>
              <BulletList items={exp.bullets} style={{ fontFamily: "Inter, sans-serif" }} />
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "Inter, sans-serif" }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8 }}>
              <strong>{edu.degree}</strong>, {edu.school} <span style={{ color: "#64748b" }}>({edu.end})</span>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Skills</h2>
          <p style={{ margin: 0, fontSize: 12 }}>{skills.join(", ")}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "Inter, sans-serif" }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <strong>{p.name}</strong> — <span style={{ fontSize: 12, color: "#475569" }}>{p.description}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
