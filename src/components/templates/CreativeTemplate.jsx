import { JobBlock, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

export default function CreativeTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle()}>
      <div style={{ display: "flex", minHeight: 140 }}>
        <div style={{ flex: 1, background: accent, padding: "32px 28px", color: "#fff" }}>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>{personal.fullName}</h1>
          <p style={{ margin: "8px 0 0", fontSize: 14, opacity: 0.95 }}>{personal.title}</p>
        </div>
        <div style={{ width: 220, background: "#0f172a", color: "#e2e8f0", padding: "24px 18px", fontSize: 10, lineHeight: 1.8 }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.website && <div style={{ wordBreak: "break-all" }}>{personal.website}</div>}
        </div>
      </div>
      <div style={{ padding: "26px 32px 36px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 20, background: "#f8fafc", padding: 16, borderRadius: 8, borderLeft: `4px solid ${accent}` }}>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#475569" }}>{personal.summary}</p>
          </section>
        )}
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ flex: 2 }}>
            {experience.length > 0 && (
              <section style={{ marginBottom: 18 }}>
                <SectionHeading title="Work History" accent={accent} />
                {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
              </section>
            )}
            {projects.length > 0 && (
              <section>
                <SectionHeading title="Projects" accent={accent} />
                {projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: 10, pageBreakInside: "avoid" }}>
                    <div style={{ fontWeight: 700, color: accent }}>{p.name}</div>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: "#475569" }}>{p.description}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <section style={{ marginBottom: 18 }}>
                <SectionHeading title="Skills" accent={accent} />
                {skills.map((s) => (
                  <div key={s} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, marginBottom: 3 }}>{s}</div>
                    <div style={{ height: 4, background: "#e2e8f0", borderRadius: 2 }}>
                      <div style={{ height: 4, width: "85%", background: accent, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </section>
            )}
            {education.length > 0 && (
              <section>
                <SectionHeading title="Education" accent={accent} />
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{edu.degree}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{edu.school}</div>
                    <div style={{ fontSize: 10, color: accent }}>{edu.end}</div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
