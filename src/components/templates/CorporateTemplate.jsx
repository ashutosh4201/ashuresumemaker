import { JobBlock, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

export default function CorporateTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  const navy = accent || "#1E3A5F";
  return (
    <div style={shellStyle({ padding: 0 })}>
      <div style={{ display: "flex", borderBottom: `5px solid ${navy}` }}>
        <div style={{ flex: 1, padding: "28px 36px", background: navy, color: "#fff" }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{personal.fullName}</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.9 }}>{personal.title}</p>
        </div>
        <div style={{ width: 260, padding: "28px 24px", background: "#f1f5f9", fontSize: 10, color: "#334155", lineHeight: 1.8 }}>
          {personal.email && <div><strong>Email:</strong> {personal.email}</div>}
          {personal.phone && <div><strong>Phone:</strong> {personal.phone}</div>}
          {personal.location && <div><strong>Location:</strong> {personal.location}</div>}
          {personal.website && <div><strong>Web:</strong> {personal.website}</div>}
        </div>
      </div>
      <div style={{ padding: "24px 36px 36px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Executive Profile" accent={navy} />
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#475569" }}>{personal.summary}</p>
          </section>
        )}
        <div style={{ display: "flex", gap: 28 }}>
          <div style={{ flex: 2 }}>
            {experience.length > 0 && (
              <section style={{ marginBottom: 18 }}>
                <SectionHeading title="Professional History" accent={navy} />
                {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
              </section>
            )}
            {projects.length > 0 && (
              <section>
                <SectionHeading title="Key Achievements" accent={navy} />
                {projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: 10 }}>
                    <strong>{p.name}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "#64748b" }}>{p.description}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <section style={{ marginBottom: 18, background: "#f8fafc", padding: 16, borderRadius: 4 }}>
                <SectionHeading title="Competencies" accent={navy} />
                {skills.map((s) => (
                  <div key={s} style={{ fontSize: 11, padding: "5px 0", borderBottom: "1px solid #e2e8f0", color: "#334155" }}>{s}</div>
                ))}
              </section>
            )}
            {education.length > 0 && (
              <section style={{ background: "#f8fafc", padding: 16, borderRadius: 4 }}>
                <SectionHeading title="Education" accent={navy} />
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 10, fontSize: 11 }}>
                    <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                    <div style={{ color: "#64748b" }}>{edu.school}</div>
                    <div style={{ color: accent }}>{edu.end}</div>
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
