import { BulletList, JobBlock, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

export default function StartupTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: 0 })}>
      <div style={{ background: `linear-gradient(135deg, ${accent} 0%, #0f172a 100%)`, padding: "36px 40px", color: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em" }}>{personal.fullName}</h1>
        <p style={{ margin: "10px 0 0", fontSize: 16, fontWeight: 500, opacity: 0.95 }}>{personal.title}</p>
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 16, fontSize: 11, opacity: 0.9 }}>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "28px 40px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 22 }}>
            <SectionHeading title="About Me" accent={accent} />
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: "#475569" }}>{personal.summary}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <SectionHeading title="Experience" accent={accent} />
            {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
          </section>
        )}
        {projects.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <SectionHeading title="Projects" accent={accent} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {projects.map((p) => (
                <div key={p.id} style={{ background: "#f8fafc", borderRadius: 8, padding: 14, borderTop: `3px solid ${accent}`, pageBreakInside: "avoid" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{p.name}</div>
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <div style={{ display: "flex", gap: 28 }}>
          {skills.length > 0 && (
            <section style={{ flex: 1 }}>
              <SectionHeading title="Skills" accent={accent} />
              <p style={{ margin: 0, fontSize: 12 }}>{skills.join(" · ")}</p>
            </section>
          )}
          {education.length > 0 && (
            <section style={{ flex: 1 }}>
              <SectionHeading title="Education" accent={accent} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{edu.school} · {edu.end}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
