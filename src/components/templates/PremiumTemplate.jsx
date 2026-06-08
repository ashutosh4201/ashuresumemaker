import {
  BulletList,
  ContactLine,
  EducationBlock,
  JobBlock,
  ProjectBlock,
  SectionHeading,
  SkillsGrid,
  shellStyle,
  COLORS,
  FONTS,
} from "./shared/resumeParts.jsx";

/** Default — ATS-friendly, recruiter-approved layout */
export default function PremiumTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;

  return (
    <div style={shellStyle({ padding: "0" })}>
      {/* Header */}
      <div
        style={{
          padding: "40px 44px 32px",
          borderBottom: `3px solid ${accent}`,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {personal.fullName}
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 15,
            fontWeight: 600,
            color: accent,
            letterSpacing: "0.02em",
          }}
        >
          {personal.title}
        </p>
        <ContactLine
          items={[personal.email, personal.phone, personal.location, personal.website]}
        />
      </div>

      <div style={{ padding: "28px 44px 40px" }}>
        {/* Summary */}
        {personal.summary && (
          <section style={{ marginBottom: 24, pageBreakInside: "avoid" }}>
            <SectionHeading title="Professional Summary" accent={accent} />
            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                textAlign: "justify",
              }}
            >
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <SectionHeading title="Professional Experience" accent={accent} />
            {experience.map((exp) => (
              <JobBlock key={exp.id} exp={exp} accent={accent} />
            ))}
          </section>
        )}

        {/* Two column: Skills + Education */}
        {(skills.length > 0 || education.length > 0) && (
          <div
            style={{
              display: "flex",
              gap: 36,
              marginBottom: 24,
              pageBreakInside: "avoid",
            }}
          >
            {skills.length > 0 && (
              <section style={{ flex: 1 }}>
                <SectionHeading title="Technical Skills" accent={accent} />
                <SkillsGrid skills={skills} accent={accent} />
              </section>
            )}
            {education.length > 0 && (
              <section style={{ flex: 1 }}>
                <SectionHeading title="Education" accent={accent} />
                {education.map((edu) => (
                  <EducationBlock key={edu.id} edu={edu} />
                ))}
              </section>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <SectionHeading title="Projects" accent={accent} />
            {projects.map((p) => (
              <ProjectBlock key={p.id} project={p} accent={accent} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
