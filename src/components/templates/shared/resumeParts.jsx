/** A4 at 96dpi — crisp print/PDF */
import { hexWithAlpha, normalizeHex } from "../../../utils/resumeColors.js";

export const A4 = { width: 794, minHeight: 1123 };

export const FONTS = {
  sans: "'Source Sans 3', 'Inter', 'Segoe UI', Arial, sans-serif",
  serif: "'Merriweather', Georgia, 'Times New Roman', serif",
};

export const COLORS = {
  text: "#1a1a2e",
  textMuted: "#4a5568",
  textLight: "#718096",
  border: "#e2e8f0",
  bgSoft: "#f8fafc",
};

export function shellStyle(extra = {}) {
  return {
    width: A4.width,
    minHeight: A4.minHeight,
    maxWidth: A4.width,
    background: "#ffffff",
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 1.55,
    color: COLORS.text,
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    ...extra,
  };
}

export function SectionHeading({ title, accent, style = {} }) {
  const color = normalizeHex(accent);
  return (
    <h2
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        borderBottom: `1.5px solid ${color}`,
        paddingBottom: 5,
        marginBottom: 12,
        marginTop: 0,
        ...style,
      }}
    >
      {title}
    </h2>
  );
}

export function ContactLine({ items, light = false }) {
  const list = items.filter(Boolean);
  return (
    <p
      style={{
        margin: "10px 0 0",
        fontSize: 11.5,
        color: light ? "rgba(255,255,255,0.88)" : COLORS.textLight,
        lineHeight: 1.7,
        letterSpacing: "0.01em",
      }}
    >
      {list.join("   ·   ")}
    </p>
  );
}

export function BulletList({ items, accent, style = {} }) {
  const bullets = items.filter(Boolean);
  if (!bullets.length) return null;
  const dot = accent ? normalizeHex(accent) : COLORS.textLight;
  return (
    <ul
      style={{
        margin: "8px 0 0",
        padding: 0,
        listStyle: "none",
        fontSize: 12.5,
        color: COLORS.textMuted,
        lineHeight: 1.6,
        ...style,
      }}
    >
      {bullets.map((b, i) => (
        <li
          key={i}
          style={{
            marginBottom: 5,
            paddingLeft: 14,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "0.55em",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: dot,
            }}
          />
          {b}
        </li>
      ))}
    </ul>
  );
}

export function JobBlock({ exp, accent }) {
  return (
    <div style={{ marginBottom: 18, pageBreakInside: "avoid" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.text, lineHeight: 1.3 }}>
            {exp.role}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: accent, marginTop: 3 }}>
            {exp.company}
            {exp.location ? `  ·  ${exp.location}` : ""}
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: COLORS.textLight,
            whiteSpace: "nowrap",
            paddingTop: 2,
          }}
        >
          {exp.start} – {exp.end}
        </div>
      </div>
      <BulletList items={exp.bullets} accent={accent} />
    </div>
  );
}

export function SkillsGrid({ skills, accent }) {
  if (!skills.length) return null;
  const color = normalizeHex(accent);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {skills.map((s) => (
        <span
          key={s}
          style={{
            background: hexWithAlpha(color, 0.1),
            color: COLORS.text,
            border: `1px solid ${hexWithAlpha(color, 0.35)}`,
            padding: "5px 12px",
            borderRadius: 4,
            fontSize: 11.5,
            fontWeight: 500,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function ProjectBlock({ project, accent }) {
  return (
    <div style={{ marginBottom: 14, pageBreakInside: "avoid" }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.text }}>{project.name}</div>
      {project.link && (
        <div style={{ fontSize: 10.5, color: accent, marginTop: 2, fontWeight: 500 }}>{project.link}</div>
      )}
      <p style={{ margin: "5px 0 0", fontSize: 12.5, color: COLORS.textMuted, lineHeight: 1.55 }}>
        {project.description}
      </p>
    </div>
  );
}

export function EducationBlock({ edu }) {
  return (
    <div style={{ marginBottom: 12, pageBreakInside: "avoid" }}>
      <div style={{ fontWeight: 700, fontSize: 13.5, color: COLORS.text }}>{edu.degree}</div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
        {edu.school}
        {edu.location ? `, ${edu.location}` : ""}
      </div>
      <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 1 }}>
        {edu.start} – {edu.end}
      </div>
    </div>
  );
}
