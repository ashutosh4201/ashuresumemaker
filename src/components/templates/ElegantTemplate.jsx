import { JobBlock, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

export default function ElegantTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: 0 })}>
      <div style={{ padding: "40px 44px 24px", textAlign: "center" }}>
        <div style={{ width: 48, height: 4, background: accent, margin: "0 auto 16px" }} />
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 300, letterSpacing: "0.06em", textTransform: "uppercase", color: "#0f172a" }}>{personal.fullName}</h1>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: accent, letterSpacing: "0.04em" }}>{personal.title}</p>
        <p style={{ margin: "12px 0 0", fontSize: 10, color: "#94a3b8", letterSpacing: "0.08em" }}>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join("  |  ")}
        </p>
      </div>
      <div style={{ padding: "8px 44px 40px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 22, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.75, color: "#64748b", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>{personal.summary}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Experience" accent={accent} style={{ textAlign: "center", borderBottom: "none", letterSpacing: "0.2em" }} />
            {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
          </section>
        )}
        {skills.length > 0 && (
          <section style={{ marginBottom: 20, textAlign: "center" }}>
            <SectionHeading title="Expertise" accent={accent} style={{ textAlign: "center", borderBottom: "none", letterSpacing: "0.2em" }} />
            <p style={{ fontSize: 12, color: "#475569" }}>{skills.join("   ·   ")}</p>
          </section>
        )}
        {education.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Education" accent={accent} style={{ textAlign: "center", borderBottom: "none", letterSpacing: "0.2em" }} />
            {education.map((edu) => (
              <div key={edu.id} style={{ textAlign: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{edu.school} · {edu.end}</div>
              </div>
            ))}
          </section>
        )}
        {projects.length > 0 && (
          <section>
            <SectionHeading title="Selected Work" accent={accent} style={{ textAlign: "center", borderBottom: "none", letterSpacing: "0.2em" }} />
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 10, textAlign: "center" }}>
                <div style={{ fontWeight: 600, color: accent }}>{p.name}</div>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#64748b" }}>{p.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
