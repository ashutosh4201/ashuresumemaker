import {
  ContactLine,
  EducationBlock,
  JobBlock,
  ProjectBlock,
  SectionHeading,
  SkillsGrid,
  shellStyle,
  COLORS,
} from "./shared/resumeParts.jsx";

export default function ExecutiveTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;
  return (
    <div style={shellStyle()}>
      <div style={{ background: "#0f172a", color: "#fff", padding: "38px 44px 30px" }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {personal.fullName}
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 15, color: accent, fontWeight: 600 }}>
          {personal.title}
        </p>
        <ContactLine
          light
          items={[personal.email, personal.phone, personal.location, personal.website]}
        />
      </div>
      <div style={{ padding: "28px 44px 40px" }}>
        {personal.summary && (
          <section style={{ marginBottom: 24, pageBreakInside: "avoid" }}>
            <SectionHeading title="Executive Summary" accent={accent} />
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: COLORS.textMuted }}>
              {personal.summary}
            </p>
          </section>
        )}
        {experience.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <SectionHeading title="Professional Experience" accent={accent} />
            {experience.map((exp) => (
              <JobBlock key={exp.id} exp={exp} accent={accent} />
            ))}
          </section>
        )}
        <div style={{ display: "flex", gap: 36 }}>
          {skills.length > 0 && (
            <section style={{ flex: 1, pageBreakInside: "avoid" }}>
              <SectionHeading title="Core Skills" accent={accent} />
              <SkillsGrid skills={skills} accent={accent} />
            </section>
          )}
          {education.length > 0 && (
            <section style={{ flex: 1, pageBreakInside: "avoid" }}>
              <SectionHeading title="Education" accent={accent} />
              {education.map((edu) => (
                <EducationBlock key={edu.id} edu={edu} />
              ))}
            </section>
          )}
        </div>
        {projects.length > 0 && (
          <section style={{ marginTop: 24 }}>
            <SectionHeading title="Key Projects" accent={accent} />
            {projects.map((p) => (
              <ProjectBlock key={p.id} project={p} accent={accent} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
