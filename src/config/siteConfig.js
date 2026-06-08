/** AshuResumeMaker — bright brand theme */
export const siteConfig = {
  name: "AshuResumeMaker",
  tagline: "Make resumes that pop! 🎨",
  domain: "ashuresumemaker.com",
  supportEmail: "support@ashuresumemaker.com",
  company: "AshuResumeMaker",
  year: new Date().getFullYear(),

  pricing: {
    free: { name: "Free", priceInr: 0, priceUsd: 0 },
    pro: { name: "Pro", priceInr: 499, priceUsd: 9, period: "month" },
  },

  stats: {
    users: "10,000+",
    templates: "20+",
    rating: "4.9",
  },

  social: {
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
};

export const brand = {
  pink: "#FF006E",
  orange: "#FB5607",
  yellow: "#FFBE0B",
  blue: "#3A86FF",
  purple: "#8338EC",
  cyan: "#06D6A0",
  gradient: "linear-gradient(135deg, #FF006E 0%, #8338EC 45%, #3A86FF 100%)",
  gradientWarm: "linear-gradient(135deg, #FB5607 0%, #FFBE0B 50%, #FF006E 100%)",
  gradientCool: "linear-gradient(135deg, #06D6A0 0%, #3A86FF 50%, #8338EC 100%)",
};

export const FREE_TEMPLATE_IDS = new Set([
  "premium", "executive", "compact", "harvard", "classic", "modern", "tech",
]);

export function isProTemplate(id, userPlan) {
  if (userPlan === "pro" || userPlan === "guest") return false;
  return !FREE_TEMPLATE_IDS.has(id);
}
