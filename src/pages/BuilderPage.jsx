import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EditorPanel from "../components/EditorPanel.jsx";
import ResumePreview from "../components/templates/ResumePreview.jsx";
import { useResume } from "../context/ResumeContext.jsx";
import { downloadPdf, printResume } from "../utils/pdfExport.js";
import { TEMPLATES, isValidTemplateId, TEMPLATE_DEFAULT_ACCENT } from "../utils/defaultResume.js";

export default function BuilderPage() {
  const { resume, resetResume, updateFields, loading, syncing, apiOnline } = useResume();
  const [searchParams, setSearchParams] = useSearchParams();
  const [downloading, setDownloading] = useState(false);

  const urlTemplate = searchParams.get("template");
  const urlTab = searchParams.get("tab");
  const defaultTab = urlTab === "design" || urlTemplate ? "design" : "personal";

  useEffect(() => {
    if (!urlTemplate || !isValidTemplateId(urlTemplate)) return;
    const patch = { template: urlTemplate };
    if (TEMPLATE_DEFAULT_ACCENT[urlTemplate]) patch.accent = TEMPLATE_DEFAULT_ACCENT[urlTemplate];
    updateFields(patch);
  }, [urlTemplate, updateFields]);

  const activeTemplateName =
    TEMPLATES.find((t) => t.id === resume.template)?.name || resume.template;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const name = resume.personal.fullName.replace(/\s+/g, "_") || "resume";
      await downloadPdf("resume-print", `${name}_resume.pdf`);
    } catch (e) {
      console.error(e);
      const usePrint = confirm(
        "PDF export failed. Use browser Print instead?\n\nClick OK → then choose 'Save as PDF' in the print dialog."
      );
      if (usePrint) printResume();
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-purple-700 font-semibold">
        Loading resume from server…
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="no-print flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="brand-gradient flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black text-white">
              AR
            </span>
            AshuResumeMaker
          </Link>
          <span className="hidden text-xs text-fuchsia-600 sm:inline">
            {loading ? "Loading…" : syncing ? "● Saving…" : apiOnline ? "● Saved to server" : "● Offline (local only)"}
          </span>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 md:inline">
            Template: {activeTemplateName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchParams({ tab: "design", template: resume.template })}
            className="rounded-lg border border-fuchsia-200 bg-fuchsia-50 px-3 py-2 text-xs font-semibold text-fuchsia-700 hover:bg-fuchsia-100"
          >
            Change template
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all content?")) resetResume();
            }}
            className="hidden rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-100 sm:block"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={printResume}
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:block"
          >
            Print / Save PDF
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="btn-brand px-5 py-2.5 text-sm disabled:opacity-60"
          >
            {downloading ? "Generating..." : "Download PDF"}
          </button>
          <span className="hidden text-[10px] text-slate-400 lg:inline" title="For sharpest output use Print → Save as PDF">
            Tip: Print = best quality
          </span>
        </div>
      </header>

      <div className="no-print flex flex-1 overflow-hidden">
        <div className="w-full max-w-md shrink-0 border-r border-slate-200 lg:max-w-lg">
          <EditorPanel
            defaultTab={defaultTab}
            activeTab={urlTab === "design" ? "design" : undefined}
            onTemplateChange={(id) => setSearchParams({ template: id, tab: "design" })}
          />
        </div>
        <div className="hidden flex-1 overflow-auto bg-slate-200 p-6 md:block">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
            Live preview
          </p>
          <div className="mx-auto origin-top scale-[0.42] xl:scale-[0.48] 2xl:scale-[0.55]">
            <ResumePreview resume={resume} id="resume-print-preview" />
          </div>
        </div>
      </div>

      {/* Full-size off-screen copy for PDF export (not scaled) */}
      <div
        className="print-only pdf-export-target pointer-events-none"
        style={{ left: "-9999px", top: 0 }}
      >
        <ResumePreview resume={resume} id="resume-print" />
      </div>

      {/* Mobile preview floating button */}
      <div className="no-print fixed bottom-4 right-4 md:hidden">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("mobile-preview");
            el?.classList.toggle("hidden");
          }}
          className="rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          Preview
        </button>
      </div>
      <div
        id="mobile-preview"
        className="no-print fixed inset-0 z-50 hidden overflow-auto bg-black/60 p-4 pt-16 md:hidden"
        onClick={(e) => e.target.id === "mobile-preview" && e.currentTarget.classList.add("hidden")}
      >
        <div className="mx-auto max-w-full scale-[0.45] origin-top">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
