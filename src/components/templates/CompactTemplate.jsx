import { JobBlock, shellStyle } from "./shared/resumeParts.jsx";

/** Dense one-page ATS format — fits more content */
export default function CompactTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: "28px 36px", fontSize: 12 })}>
      <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 10, marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{personal.fullName}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 4, fontSize: 11, color: "#64748b" }}>
          {personal.title && <span style={{ color: accent, fontWeight: 600 }}>{personal.title}</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>
      {personal.summary && (
        <p style={{ margin: "0 0 14px", fontSize: 11.5, lineHeight: 1.55, color: "#475569" }}>{personal.summary}</p>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#0f172a", marginBottom: 8, textTransform: "uppercase" }}>Experience</h2>
          {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
        </section>
      )}
      {projects.length > 0 && (
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#0f172a", marginBottom: 8, textTransform: "uppercase" }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <strong>{p.name}</strong> — <span style={{ color: "#475569" }}>{p.description}</span>
            </div>
          ))}
        </section>
      )}
      <div style={{ display: "flex", gap: 24 }}>
        {skills.length > 0 && (
          <section style={{ flex: 1 }}>
            <h2 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#0f172a", marginBottom: 6, textTransform: "uppercase" }}>Skills</h2>
            <p style={{ margin: 0, fontSize: 11 }}>{skills.join(" · ")}</p>
          </section>
        )}
        {education.length > 0 && (
          <section style={{ flex: 1 }}>
            <h2 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#0f172a", marginBottom: 6, textTransform: "uppercase" }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ fontSize: 11, marginBottom: 4 }}>
                <strong>{edu.degree}</strong>, {edu.school} ({edu.end})
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
