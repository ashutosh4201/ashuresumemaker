import { JobBlock, SectionHeading, shellStyle, COLORS } from "./shared/resumeParts.jsx";
import { hexWithAlpha } from "../../utils/resumeColors.js";

export default function ModernTemplate({ resume }) {
  const { personal, experience, education, skills, projects, accent } = resume;

  return (
    <div style={shellStyle({ padding: 0, display: "flex", minHeight: 1123 })}>
      <aside
        style={{
          width: "32%",
          flexShrink: 0,
          padding: 24,
          backgroundColor: accent,
          color: "#ffffff",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.25 }}>{personal.fullName}</h1>
        <p style={{ margin: "8px 0 0", fontSize: 12, opacity: 0.92 }}>{personal.title}</p>

        <div style={{ marginTop: 28, fontSize: 10, lineHeight: 1.9 }}>
          {[
            ["Email", personal.email],
            ["Phone", personal.phone],
            ["Location", personal.location],
            ["Website", personal.website],
          ]
            .filter(([, v]) => v)
            .map(([label, val]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700, textTransform: "uppercase", opacity: 0.75, fontSize: 9 }}>{label}</div>
                <div style={{ wordBreak: "break-all" }}>{val}</div>
              </div>
            ))}
        </div>

        {skills.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", opacity: 0.85 }}>
              Skills
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {skills.map((s) => (
                <span
                  key={s}
                  style={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.22)",
                    padding: "3px 8px",
                    fontSize: 9,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        {personal.summary && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Profile" accent={accent} />
            <p style={{ margin: 0, fontSize: 11, lineHeight: 1.65, color: COLORS.textMuted }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Experience" accent={accent} />
            {experience.map((exp) => (
              <JobBlock key={exp.id} exp={exp} accent={accent} />
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading title="Education" accent={accent} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700, color: COLORS.text }}>{edu.degree}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{edu.school} · {edu.start} – {edu.end}</div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SectionHeading title="Projects" accent={accent} />
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 10, padding: 10, background: hexWithAlpha(accent, 0.06), borderRadius: 6 }}>
                <div style={{ fontWeight: 700, color: COLORS.text }}>{p.name}</div>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: COLORS.textMuted }}>{p.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
