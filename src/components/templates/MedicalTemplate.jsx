import { BulletList, JobBlock, SectionHeading, shellStyle } from "./shared/resumeParts.jsx";

export default function MedicalTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  const blue = accent || "#0891b2";
  return (
    <div style={shellStyle({ padding: 0 })}>
      <div style={{ background: "#f0f9ff", borderBottom: `4px solid ${blue}`, padding: "32px 40px" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0c4a6e" }}>{personal.fullName}</h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, color: blue, fontWeight: 600 }}>{personal.title}</p>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: "#0369a1" }}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).join("  •  ")}
        </p>
      </div>
      <div style={{ padding: "28px 40px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Professional Summary" accent={blue} />
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#334155" }}>{personal.summary}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Clinical / Work Experience" accent={blue} />
            {experience.map((exp) => <JobBlock key={exp.id} exp={exp} accent={blue} />)}
          </section>
        )}
        {education.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Education & Certifications" accent={blue} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 10, padding: 12, background: "#f0f9ff", borderRadius: 6, pageBreakInside: "avoid" }}>
                <div style={{ fontWeight: 700, color: "#0c4a6e" }}>{edu.degree}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{edu.school} · {edu.start}–{edu.end}</div>
              </div>
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Core Competencies" accent={blue} />
            <div style={{ columns: 2, fontSize: 12, columnGap: 24 }}>
              {skills.map((s) => (
                <div key={s} style={{ marginBottom: 6, breakInside: "avoid" }}>✓ {s}</div>
              ))}
            </div>
          </section>
        )}
        {projects.length > 0 && (
          <section>
            <SectionHeading title="Research / Projects" accent={blue} />
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700, color: "#0c4a6e" }}>{p.name}</div>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#475569" }}>{p.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
