import { withResumeAccent } from "../../utils/resumeColors.js";

import PremiumTemplate from "./PremiumTemplate.jsx";
import ClassicTemplate from "./ClassicTemplate.jsx";
import ModernTemplate from "./ModernTemplate.jsx";
import MinimalTemplate from "./MinimalTemplate.jsx";
import ProfessionalTemplate from "./ProfessionalTemplate.jsx";
import ExecutiveTemplate from "./ExecutiveTemplate.jsx";
import TechTemplate from "./TechTemplate.jsx";
import HarvardTemplate from "./HarvardTemplate.jsx";
import CreativeTemplate from "./CreativeTemplate.jsx";
import CompactTemplate from "./CompactTemplate.jsx";
import ElegantTemplate from "./ElegantTemplate.jsx";
import StartupTemplate from "./StartupTemplate.jsx";
import TimelineTemplate from "./TimelineTemplate.jsx";
import LegalTemplate from "./LegalTemplate.jsx";
import MedicalTemplate from "./MedicalTemplate.jsx";
import FreshGradTemplate from "./FreshGradTemplate.jsx";
import DesignerTemplate from "./DesignerTemplate.jsx";
import CorporateTemplate from "./CorporateTemplate.jsx";
import InfographicTemplate from "./InfographicTemplate.jsx";
import MonospaceTemplate from "./MonospaceTemplate.jsx";
import InternationalTemplate from "./InternationalTemplate.jsx";

export const TEMPLATE_MAP = {
  premium: PremiumTemplate,
  executive: ExecutiveTemplate,
  tech: TechTemplate,
  harvard: HarvardTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  elegant: ElegantTemplate,
  startup: StartupTemplate,
  timeline: TimelineTemplate,
  legal: LegalTemplate,
  medical: MedicalTemplate,
  freshgrad: FreshGradTemplate,
  designer: DesignerTemplate,
  corporate: CorporateTemplate,
  infographic: InfographicTemplate,
  monospace: MonospaceTemplate,
  international: InternationalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
};

export default function ResumePreview({ resume, id = "resume-print" }) {
  const normalized = withResumeAccent(resume);
  const Template = TEMPLATE_MAP[normalized.template] || PremiumTemplate;
  return (
    <div id={id} className="resume-page mx-auto" style={{ overflow: "hidden", background: "#ffffff" }}>
      <Template resume={normalized} />
    </div>
  );
}
