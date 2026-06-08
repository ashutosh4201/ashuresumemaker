import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useResume } from "../context/ResumeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { TEMPLATES, TEMPLATE_CATEGORIES, ACCENT_COLORS, TEMPLATE_DEFAULT_ACCENT } from "../utils/defaultResume.js";
import { accentMatches, normalizeHex } from "../utils/resumeColors.js";
import { isProTemplate } from "../config/siteConfig.js";

function Field({ label, value, onChange, placeholder, multiline = false }) {
  const cls =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

export default function EditorPanel({ defaultTab = "personal", activeTab, onTemplateChange }) {
  const {
    resume,
    updatePersonal,
    updateField,
    updateFields,
    updateListItem,
    addListItem,
    removeListItem,
    addSkill,
    removeSkill,
  } = useResume();
  const { isPro, plan } = useAuth();

  const [skillInput, setSkillInput] = useState("");
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    if (activeTab) setTab(activeTab);
  }, [activeTab]);

  const selectTemplate = (id) => {
    if (!isPro && isProTemplate(id, plan)) {
      if (window.confirm("This is a Pro template. Upgrade to unlock all 20+ designs?")) {
        window.location.href = "/pricing";
      }
      return;
    }
    const patch = { template: id };
    if (TEMPLATE_DEFAULT_ACCENT[id]) patch.accent = TEMPLATE_DEFAULT_ACCENT[id];
    updateFields(patch);
    onTemplateChange?.(id);
  };

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "design", label: "Design" },
  ];

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-white p-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              tab === t.id
                ? "bg-fuchsia-500 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tab === "personal" && (
          <>
            <Field label="Full name" value={resume.personal.fullName} onChange={(v) => updatePersonal("fullName", v)} />
            <Field label="Job title" value={resume.personal.title} onChange={(v) => updatePersonal("title", v)} />
            <Field label="Email" value={resume.personal.email} onChange={(v) => updatePersonal("email", v)} />
            <Field label="Phone" value={resume.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
            <Field label="Location" value={resume.personal.location} onChange={(v) => updatePersonal("location", v)} />
            <Field label="Website / LinkedIn" value={resume.personal.website} onChange={(v) => updatePersonal("website", v)} />
            <Field label="Professional summary" value={resume.personal.summary} onChange={(v) => updatePersonal("summary", v)} multiline />
          </>
        )}

        {tab === "experience" && (
          <>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <Field label="Role" value={exp.role} onChange={(v) => updateListItem("experience", exp.id, "role", v)} />
                <Field label="Company" value={exp.company} onChange={(v) => updateListItem("experience", exp.id, "company", v)} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start" value={exp.start} onChange={(v) => updateListItem("experience", exp.id, "start", v)} />
                  <Field label="End" value={exp.end} onChange={(v) => updateListItem("experience", exp.id, "end", v)} />
                </div>
                <Field label="Location" value={exp.location} onChange={(v) => updateListItem("experience", exp.id, "location", v)} />
                {exp.bullets.map((b, i) => (
                  <Field
                    key={i}
                    label={`Bullet ${i + 1}`}
                    value={b}
                    onChange={(v) => {
                      const bullets = [...exp.bullets];
                      bullets[i] = v;
                      updateListItem("experience", exp.id, "bullets", bullets);
                    }}
                  />
                ))}
                <button
                  type="button"
                  className="text-xs text-fuchsia-600 hover:underline"
                  onClick={() =>
                    updateListItem("experience", exp.id, "bullets", [...exp.bullets, ""])
                  }
                >
                  + Add bullet
                </button>
                <button
                  type="button"
                  className="block text-xs text-red-500 hover:underline"
                  onClick={() => removeListItem("experience", exp.id)}
                >
                  Remove job
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-xl border-2 border-dashed border-fuchsia-300 py-3 text-sm font-medium text-fuchsia-600 hover:bg-fuchsia-50"
              onClick={() =>
                addListItem("experience", {
                  id: crypto.randomUUID(),
                  company: "",
                  role: "",
                  location: "",
                  start: "",
                  end: "",
                  bullets: [""],
                })
              }
            >
              + Add experience
            </button>
          </>
        )}

        {tab === "education" && (
          <>
            {resume.education.map((edu) => (
              <div key={edu.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <Field label="Degree" value={edu.degree} onChange={(v) => updateListItem("education", edu.id, "degree", v)} />
                <Field label="School" value={edu.school} onChange={(v) => updateListItem("education", edu.id, "school", v)} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start" value={edu.start} onChange={(v) => updateListItem("education", edu.id, "start", v)} />
                  <Field label="End" value={edu.end} onChange={(v) => updateListItem("education", edu.id, "end", v)} />
                </div>
                <button type="button" className="text-xs text-red-500 hover:underline" onClick={() => removeListItem("education", edu.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-xl border-2 border-dashed border-fuchsia-300 py-3 text-sm font-medium text-fuchsia-600 hover:bg-fuchsia-50"
              onClick={() =>
                addListItem("education", {
                  id: crypto.randomUUID(),
                  school: "",
                  degree: "",
                  location: "",
                  start: "",
                  end: "",
                })
              }
            >
              + Add education
            </button>
          </>
        )}

        {tab === "skills" && (
          <>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-fuchsia-400"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addSkill(skillInput);
                    setSkillInput("");
                  }
                }}
                placeholder="Type skill + Enter"
              />
              <button
                type="button"
                className="rounded-lg bg-fuchsia-500 px-4 text-sm font-medium text-white"
                onClick={() => {
                  addSkill(skillInput);
                  setSkillInput("");
                }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-medium text-fuchsia-800">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="text-fuchsia-600 hover:text-red-500">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </>
        )}

        {tab === "projects" && (
          <>
            {resume.projects.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <Field label="Project name" value={p.name} onChange={(v) => updateListItem("projects", p.id, "name", v)} />
                <Field label="Link" value={p.link} onChange={(v) => updateListItem("projects", p.id, "link", v)} />
                <Field label="Description" value={p.description} onChange={(v) => updateListItem("projects", p.id, "description", v)} multiline />
                <button type="button" className="text-xs text-red-500 hover:underline" onClick={() => removeListItem("projects", p.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-xl border-2 border-dashed border-fuchsia-300 py-3 text-sm font-medium text-fuchsia-600 hover:bg-fuchsia-50"
              onClick={() =>
                addListItem("projects", {
                  id: crypto.randomUUID(),
                  name: "",
                  link: "",
                  description: "",
                })
              }
            >
              + Add project
            </button>
          </>
        )}

        {tab === "design" && (
          <>
            <p className="mb-3 text-xs text-slate-500">
              {TEMPLATES.length} templates · Click to preview instantly
            </p>
            {TEMPLATE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="mb-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {cat.label}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {cat.templates.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => selectTemplate(t.id)}
                      className={`rounded-xl border p-3 text-left text-xs transition cursor-pointer ${
                        resume.template === t.id
                          ? "border-fuchsia-500 bg-fuchsia-50 ring-2 ring-fuchsia-200"
                          : "border-slate-200 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{t.name}</span>
                        {t.badge && (
                          <span className="rounded-full bg-fuchsia-100 px-2 py-0.5 text-[9px] font-bold text-fuchsia-700">
                            {t.badge}
                          </span>
                        )}
                        {!isPro && isProTemplate(t.id, plan) && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800">
                            PRO
                          </span>
                        )}
                        </div>
                        {resume.template === t.id && (
                          <span className="shrink-0 text-[10px] font-bold text-fuchsia-600">✓ Selected</span>
                        )}
                      </div>
                      <div className="mt-0.5 text-slate-500">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="mb-2 text-xs font-medium text-slate-600">
                Accent color <span className="font-mono text-fuchsia-600">{normalizeHex(resume.accent)}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => updateField("accent", normalizeHex(c.hex))}
                    className={`h-9 w-9 rounded-full border-2 transition ${
                      accentMatches(resume.accent, c.hex) ? "border-slate-900 scale-110 ring-2 ring-fuchsia-300" : "border-white shadow"
                    }`}
                    style={{ backgroundColor: normalizeHex(c.hex) }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
