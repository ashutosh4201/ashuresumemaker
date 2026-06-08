import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W_PX = 794;

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap";

function injectFonts(doc) {
  if (!doc.head.querySelector("[data-resume-fonts]")) {
    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_URL;
    link.setAttribute("data-resume-fonts", "1");
    doc.head.appendChild(link);
  }
}

function sanitizeCloneForCanvas(clonedDoc, root) {
  const win = clonedDoc.defaultView;
  if (!win) return;

  injectFonts(clonedDoc);
  clonedDoc.querySelectorAll("style, link[rel='stylesheet']:not([data-resume-fonts])").forEach((n) => n.remove());

  root.style.width = `${A4_W_PX}px`;
  root.style.maxWidth = `${A4_W_PX}px`;
  root.style.background = "#ffffff";
  root.style.boxShadow = "none";

  root.querySelectorAll("*").forEach((node) => {
    if (!(node instanceof win.HTMLElement)) return;
    const cs = win.getComputedStyle(node);
    node.style.WebkitFontSmoothing = "antialiased";
    [
      "color",
      "backgroundColor",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
    ].forEach((prop) => {
      const v = cs[prop];
      if (v && !String(v).includes("oklch") && !String(v).includes("lab(")) {
        node.style[prop] = v;
      }
    });
  });
}

export async function downloadPdf(elementId, filename = "resume.pdf") {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Resume not found");

  // Wait for fonts
  if (document.fonts?.ready) await document.fonts.ready;

  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    width: A4_W_PX,
    height: element.scrollHeight,
    windowWidth: A4_W_PX,
    onclone: (doc) => {
      const root = doc.getElementById(elementId);
      if (root) sanitizeCloneForCanvas(doc, root);
    },
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const imgW = A4_W_MM;
  const imgH = (canvas.height * imgW) / canvas.width;
  const imgData = canvas.toDataURL("image/png");

  let offsetY = 0;
  let remaining = imgH;

  while (remaining > 0) {
    if (offsetY > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, -offsetY, imgW, imgH, undefined, "FAST");
    offsetY += A4_H_MM;
    remaining -= A4_H_MM;
  }

  pdf.save(filename);
}

export function printResume() {
  window.print();
}
