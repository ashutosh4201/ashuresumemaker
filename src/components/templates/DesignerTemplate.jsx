import { JobBlock, shellStyle } from "./shared/resumeParts.jsx";

export default function DesignerTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: 0, display: "flex" })}>
      <div style={{ flex: 1, padding: "40px 32px 40px 40px" }}>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 900, lineHeight: 1, color: "#0f172a", letterSpacing: "-0.04em" }}>
          {personal.fullName.split(" ").map((w, i) => (
            <span key={i} style={{ display: "block" }}>{w}</span>
          ))}
        </h1>
        <p style={{ margin: "16px 0 32px", fontSize: 13, color: accent, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{personal.title}</p>
        {personal.summary && (
          <p style={{ margin: "0 0 28px", fontSize: 12, lineHeight: 1.75, color: "#64748b", maxWidth: 380 }}>{personal.summary}</p>
        )}
        {experience.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#94a3b8", marginBottom: 14 }}>EXPERIENCE</h2>
            {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
          </section>
        )}
        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#94a3b8", marginBottom: 14 }}>PORTFOLIO</h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 16, pageBreakInside: "avoid" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{p.name}</div>
                <p style={{ margin: "6px 0 0", fontSize: 11, color: "#64748b" }}>{p.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
      <aside style={{ width: 220, background: accent, padding: "40px 24px", color: "#fff", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", opacity: 0.7, marginBottom: 20 }}>CONTACT</div>
        {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).map((x) => (
          <div key={x} style={{ fontSize: 10, marginBottom: 12, lineHeight: 1.5, wordBreak: "break-word" }}>{x}</div>
        ))}
        {skills.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", opacity: 0.7, marginBottom: 14 }}>SKILLS</div>
            {skills.map((s) => (
              <div key={s} style={{ fontSize: 11, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>{s}</div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", opacity: 0.7, marginBottom: 14 }}>EDUCATION</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ fontSize: 10, marginBottom: 12, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                <div style={{ opacity: 0.85 }}>{edu.school}</div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
