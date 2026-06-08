import { JobBlock, shellStyle } from "./shared/resumeParts.jsx";

export default function InfographicTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: "32px 36px" })}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, padding: 20, background: `linear-gradient(90deg, ${accent}15 0%, transparent 100%)`, borderRadius: 12 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, flexShrink: 0 }}>
          {personal.fullName.charAt(0)}
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{personal.fullName}</h1>
          <p style={{ margin: "4px 0", fontSize: 13, color: accent, fontWeight: 600 }}>{personal.title}</p>
          <p style={{ margin: 0, fontSize: 10, color: "#64748b" }}>{[personal.email, personal.phone, personal.location].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      {personal.summary && (
        <p style={{ margin: "0 0 22px", fontSize: 12, lineHeight: 1.65, color: "#475569", textAlign: "center", padding: "0 20px" }}>{personal.summary}</p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {skills.length > 0 && (
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16, pageBreakInside: "avoid" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>⚡ Skills</div>
            {skills.slice(0, 8).map((s) => (
              <div key={s} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3 }}>
                  <span>{s}</span>
                  <span style={{ color: accent, fontWeight: 700 }}>●●●●○</span>
                </div>
                <div style={{ height: 4, background: "#e2e8f0", borderRadius: 2 }}>
                  <div style={{ height: 4, width: `${60 + (s.length % 4) * 10}%`, background: accent, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16, pageBreakInside: "avoid" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>🎓 Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `3px solid ${accent}` }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{edu.degree}</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>{edu.school} · {edu.end}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>💼 Experience</div>
          {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>🚀 Projects</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {projects.map((p) => (
              <div key={p.id} style={{ border: `1px solid ${accent}40`, borderRadius: 8, padding: 12, pageBreakInside: "avoid" }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: accent }}>{p.name}</div>
                <p style={{ margin: "4px 0 0", fontSize: 10, color: "#64748b" }}>{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
