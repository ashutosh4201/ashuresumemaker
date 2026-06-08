import { BulletList, shellStyle } from "./shared/resumeParts.jsx";

export default function MonospaceTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  const green = accent || "#22c55e";
  return (
    <div style={shellStyle({ background: "#0f172a", color: "#e2e8f0", fontFamily: "Consolas, 'Courier New', monospace", padding: "36px 40px" })}>
      <div style={{ color: green, fontSize: 12, marginBottom: 8 }}>// developer.resume</div>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#f8fafc" }}>
        const name = &quot;{personal.fullName}&quot;;
      </h1>
      <p style={{ margin: "8px 0 20px", fontSize: 13, color: green }}>
        const role = &quot;{personal.title}&quot;;
      </p>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 24, lineHeight: 1.8 }}>
        {personal.email && <div>email: &quot;{personal.email}&quot;</div>}
        {personal.phone && <div>phone: &quot;{personal.phone}&quot;</div>}
        {personal.location && <div>location: &quot;{personal.location}&quot;</div>}
        {personal.website && <div>github: &quot;{personal.website}&quot;</div>}
      </div>
      {personal.summary && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ color: green, fontSize: 11, marginBottom: 8 }}>/* about */</div>
          <p style={{ margin: 0, fontSize: 11, lineHeight: 1.7, color: "#cbd5e1" }}>{personal.summary}</p>
        </section>
      )}
      {skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ color: green, fontSize: 11, marginBottom: 8 }}>const skills = [</div>
          <div style={{ paddingLeft: 16, fontSize: 11, color: "#fde047" }}>
            {skills.map((s, i) => (
              <div key={s}>&quot;{s}&quot;{i < skills.length - 1 ? "," : ""}</div>
            ))}
          </div>
          <div style={{ color: green, fontSize: 11 }}>];</div>
        </section>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ color: green, fontSize: 11, marginBottom: 10 }}>// experience</div>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 16, padding: 14, background: "#1e293b", borderRadius: 6, borderLeft: `3px solid ${green}`, pageBreakInside: "avoid" }}>
              <div style={{ color: "#f8fafc", fontWeight: 700, fontSize: 13 }}>{exp.role} @ {exp.company}</div>
              <div style={{ fontSize: 10, color: "#64748b", marginBottom: 6 }}>{exp.start} → {exp.end}</div>
              <BulletList items={exp.bullets} style={{ color: "#cbd5e1", fontSize: 11 }} />
            </div>
          ))}
        </section>
      )}
      {projects.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ color: green, fontSize: 11, marginBottom: 10 }}>// projects</div>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10, fontSize: 11 }}>
              <span style={{ color: green }}>export</span>{" "}
              <span style={{ color: "#fde047" }}>{p.name.replace(/\s+/g, "_")}</span>
              <p style={{ margin: "4px 0 0", color: "#94a3b8" }}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section>
          <div style={{ color: green, fontSize: 11, marginBottom: 8 }}>// education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ fontSize: 11, marginBottom: 6 }}>
              {edu.degree} — {edu.school} ({edu.end})
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
