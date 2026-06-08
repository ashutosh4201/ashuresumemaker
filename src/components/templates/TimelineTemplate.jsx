import { BulletList, shellStyle } from "./shared/resumeParts.jsx";

export default function TimelineTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: "36px 40px" })}>
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{personal.fullName}</h1>
        <p style={{ margin: "6px 0", fontSize: 14, color: accent, fontWeight: 600 }}>{personal.title}</p>
        <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).join(" · ")}
        </p>
      </header>
      {personal.summary && (
        <p style={{ margin: "0 0 24px", padding: 14, background: "#f8fafc", borderRadius: 6, fontSize: 12, lineHeight: 1.65, color: "#475569" }}>{personal.summary}</p>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>Career Timeline</h2>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{ display: "flex", gap: 16, marginBottom: 18, pageBreakInside: "avoid" }}>
              <div style={{ width: 80, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: accent }}>{exp.start}</div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>{exp.end}</div>
              </div>
              <div style={{ width: 12, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: accent, border: "2px solid #fff", boxShadow: `0 0 0 2px ${accent}` }} />
                {idx < experience.length - 1 && <div style={{ flex: 1, width: 2, background: "#e2e8f0", minHeight: 40 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{exp.role}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{exp.company}</div>
                <BulletList items={exp.bullets} />
              </div>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s) => (
              <span key={s} style={{ border: `1px solid ${accent}`, color: accent, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </section>
      )}
      {education.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8, fontSize: 12 }}>
              <strong>{edu.degree}</strong> — {edu.school} ({edu.end})
            </div>
          ))}
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <h2 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <strong style={{ color: accent }}>{p.name}</strong>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "#475569" }}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
