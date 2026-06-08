/** Hex-only colors for resume templates (PDF-safe — no oklch/Tailwind). */

export const BRAND_COLORS = {
  pink: "#FF006E",
  orange: "#FB5607",
  yellow: "#FFBE0B",
  blue: "#3A86FF",
  purple: "#8338EC",
  cyan: "#06D6A0",
};

export const ACCENT_COLORS = [
  { hex: "#8338EC", name: "Purple" },
  { hex: "#FF006E", name: "Pink" },
  { hex: "#3A86FF", name: "Blue" },
  { hex: "#06D6A0", name: "Cyan" },
  { hex: "#FB5607", name: "Orange" },
  { hex: "#FFBE0B", name: "Yellow" },
  { hex: "#2563EB", name: "Royal Blue" },
  { hex: "#0F172A", name: "Navy" },
  { hex: "#DC2626", name: "Red" },
  { hex: "#BE185D", name: "Rose" },
  { hex: "#0891B2", name: "Teal" },
  { hex: "#22C55E", name: "Green" },
];

/** Default accent when user picks a template */
export const TEMPLATE_DEFAULT_ACCENT = {
  premium: "#8338EC",
  executive: "#0F172A",
  corporate: "#1E3A5F",
  professional: "#3A86FF",
  elegant: "#8338EC",
  legal: "#0F172A",
  tech: "#3A86FF",
  monospace: "#22C55E",
  startup: "#06D6A0",
  timeline: "#8338EC",
  infographic: "#FF006E",
  designer: "#FF006E",
  creative: "#FB5607",
  modern: "#8338EC",
  minimal: "#0F172A",
  compact: "#0F172A",
  harvard: "#334155",
  classic: "#3A86FF",
  freshgrad: "#FB5607",
  international: "#1E3A5F",
  medical: "#0891B2",
};

export function normalizeHex(color, fallback = BRAND_COLORS.purple) {
  if (!color || typeof color !== "string") return fallback.toUpperCase();
  let c = color.trim();
  if (!c.startsWith("#")) c = `#${c}`;
  if (/^#[0-9A-Fa-f]{3}$/.test(c)) {
    c = `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`;
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(c)) return fallback.toUpperCase();
  return c.toUpperCase();
}

export function hexWithAlpha(hex, alpha) {
  const n = normalizeHex(hex);
  const r = parseInt(n.slice(1, 3), 16);
  const g = parseInt(n.slice(3, 5), 16);
  const b = parseInt(n.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function accentMatches(a, b) {
  return normalizeHex(a) === normalizeHex(b);
}

export function getTemplateAccent(templateId, currentAccent) {
  const def = TEMPLATE_DEFAULT_ACCENT[templateId];
  return normalizeHex(currentAccent || def || BRAND_COLORS.purple);
}

export function withResumeAccent(resume) {
  const accent = getTemplateAccent(resume.template, resume.accent);
  return { ...resume, accent };
}
