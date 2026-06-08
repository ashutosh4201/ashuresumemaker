import { ACCENT_COLORS, TEMPLATE_DEFAULT_ACCENT } from "./resumeColors.js";

export { ACCENT_COLORS, TEMPLATE_DEFAULT_ACCENT };

export const TEMPLATE_CATEGORIES = [
  {
    id: "professional",
    label: "Professional & Corporate",
    templates: [
      { id: "premium", name: "Premium Pro", desc: "Best ATS layout — recruiter approved", badge: "Best" },
      { id: "executive", name: "Executive", desc: "Dark header, corporate look", badge: "Popular" },
      { id: "corporate", name: "Corporate", desc: "Banking & finance style navy header", badge: "New" },
      { id: "professional", name: "Professional", desc: "Bold header + skill sidebar" },
      { id: "elegant", name: "Elegant", desc: "Luxury minimal spacing" },
      { id: "legal", name: "Legal / Formal", desc: "Times New Roman, traditional", badge: "New" },
    ],
  },
  {
    id: "tech",
    label: "Tech & Developer",
    templates: [
      { id: "tech", name: "Tech Developer", desc: "Sidebar stack + timeline", badge: "Dev" },
      { id: "monospace", name: "Code / Terminal", desc: "Dark dev theme, monospace", badge: "New" },
      { id: "startup", name: "Startup", desc: "Gradient header, project cards", badge: "New" },
      { id: "timeline", name: "Timeline", desc: "Vertical career timeline", badge: "New" },
      { id: "infographic", name: "Infographic", desc: "Avatar, skill bars, icons", badge: "New" },
    ],
  },
  {
    id: "creative",
    label: "Creative & Design",
    templates: [
      { id: "designer", name: "Designer", desc: "Bold typography, portfolio sidebar", badge: "New" },
      { id: "creative", name: "Creative", desc: "Color blocks + skill bars" },
      { id: "modern", name: "Modern", desc: "Two-column accent sidebar" },
      { id: "minimal", name: "Minimal", desc: "Clean whitespace typography" },
    ],
  },
  {
    id: "ats",
    label: "ATS & Academic",
    templates: [
      { id: "compact", name: "Compact ATS", desc: "Dense one-page, max content", badge: "ATS" },
      { id: "harvard", name: "Harvard", desc: "Classic academic serif", badge: "ATS" },
      { id: "classic", name: "Classic", desc: "Traditional centered layout" },
      { id: "freshgrad", name: "Fresh Graduate", desc: "Education first, for students", badge: "New" },
      { id: "international", name: "International / EU", desc: "Europass-style CV format", badge: "New" },
    ],
  },
  {
    id: "industry",
    label: "Industry Specific",
    templates: [
      { id: "medical", name: "Medical / Healthcare", desc: "Clinical blue, competencies", badge: "New" },
    ],
  },
];

/** Flat list for backward compatibility */
export const TEMPLATES = TEMPLATE_CATEGORIES.flatMap((c) => c.templates);

/** Landing page — click → opens builder with template selected */
export const LANDING_TEMPLATES = [
  { id: "premium", name: "Premium Pro", color: "#8338EC" },
  { id: "executive", name: "Executive", color: "#0f172a" },
  { id: "tech", name: "Tech", color: "#2563eb" },
  { id: "timeline", name: "Timeline", color: "#7c3aed" },
  { id: "designer", name: "Designer", color: "#be185d" },
  { id: "monospace", name: "Monospace", color: "#22c55e" },
  { id: "startup", name: "Startup", color: "#10b981" },
  { id: "harvard", name: "Harvard", color: "#334155" },
  { id: "medical", name: "Medical", color: "#0891b2" },
  { id: "freshgrad", name: "Fresh Grad", color: "#d97706" },
  { id: "international", name: "EU CV", color: "#1e3a5f" },
];

export function isValidTemplateId(id) {
  return TEMPLATES.some((t) => t.id === id);
}

export function createEmptyResume() {
  return {
    template: "premium",
    accent: "#8338EC",
    personal: {
      fullName: "Ashutosh Damle",
      title: "Full Stack Developer",
      email: "aashutoshkd5@gmail.com",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
      website: "linkedin.com/in/ashutoshdamle",
      summary:
        "Results-driven Full Stack Developer with hands-on experience building scalable web applications using React, Django REST Framework, and PostgreSQL. Proven track record delivering production-ready e-commerce platforms with JWT authentication, payment gateway integration (Razorpay), and role-based access control. Passionate about writing clean, maintainable code and solving real-world business problems.",
    },
    experience: [
      {
        id: crypto.randomUUID(),
        company: "Freelance / Personal Projects",
        role: "Full Stack Developer",
        location: "Remote",
        start: "2024",
        end: "Present",
        bullets: [
          "Architected and deployed ShopHub, a full-stack e-commerce platform serving end-to-end checkout with React frontend, Django REST API, JWT authentication, and Razorpay payment integration.",
          "Engineered role-based access control (RBAC) seller admin dashboard with 5 permission tiers, reducing unauthorized access and enabling multi-user store management.",
          "Designed RESTful APIs with atomic database transactions, server-side payment signature verification, and real-time inventory validation — ensuring data integrity at scale.",
        ],
      },
    ],
    education: [
      {
        id: crypto.randomUUID(),
        school: "Your University",
        degree: "B.Tech — Computer Science",
        location: "India",
        start: "2020",
        end: "2024",
      },
    ],
    skills: ["React", "JavaScript", "Java", "Django", "REST APIs", "JWT", "PostgreSQL", "Git", "Razorpay"],
    projects: [
      {
        id: crypto.randomUUID(),
        name: "ShopHub — E-Commerce Platform",
        link: "github.com/ashutosh4201",
        description:
          "Production-grade e-commerce SaaS: React storefront, Django REST API, JWT auth, Razorpay payments, and multi-role seller admin with RBAC.",
      },
      {
        id: crypto.randomUUID(),
        name: "AshuResumeMaker — CV Builder SaaS",
        link: "github.com/ashutosh4201",
        description:
          "Commercial-ready resume builder with 20+ templates, subscription billing, JWT auth, and high-quality PDF export.",
      },
    ],
  };
}
