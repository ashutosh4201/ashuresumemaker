import { BulletList, JobBlock, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

/** European CV (Europass-style) format */
export default function InternationalTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle({ padding: "32px 40px" })}>
      <div style={{ border: `2px solid ${accent}`, padding: "20px 24px", marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>{personal.fullName}</h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600, color: "#334155" }}>{personal.title}</p>
      </div>
      <table style={{ width: "100%", fontSize: 11, marginBottom: 20, borderCollapse: "collapse" }}>
        <tbody>
          {[
            ["Address", personal.location],
            ["E-mail", personal.email],
            ["Telephone", personal.phone],
            ["Website", personal.website],
          ].filter(([, v]) => v).map(([label, val]) => (
            <tr key={label}>
              <td style={{ padding: "6px 12px 6px 0", fontWeight: 700, color: accent, width: 100, verticalAlign: "top" }}>{label}</td>
              <td style={{ padding: "6px 0", color: "#334155" }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {personal.summary && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Personal Statement" accent={accent} />
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#475569" }}>{personal.summary}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Work Experience" accent={accent} />
          {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={accent} />)}
        </section>
      )}
      {education.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Education & Training" accent={accent} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10, display: "flex", gap: 16, pageBreakInside: "avoid" }}>
              <div style={{ width: 90, fontSize: 11, color: "#64748b", flexShrink: 0 }}>{edu.start}–{edu.end}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{edu.degree}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{edu.school}</div>
              </div>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <SectionHeading title="Language & IT Skills" accent={accent} />
          <p style={{ margin: 0, fontSize: 12 }}><strong>Technical:</strong> {skills.join(", ")}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <SectionHeading title="Personal Projects" accent={accent} />
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <strong>{p.name}</strong> — <span style={{ fontSize: 11, color: "#64748b" }}>{p.description}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
