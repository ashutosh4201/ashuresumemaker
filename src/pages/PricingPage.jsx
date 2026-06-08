import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { siteConfig } from "../config/siteConfig.js";
import { useAuth } from "../context/AuthContext.jsx";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    sub: "Forever free",
    color: "from-cyan-400 to-blue-500",
    features: ["1 resume", "6 templates", "Unlimited PDF", "No watermark", "Cloud save"],
    cta: "Get started",
    href: "/register",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: `₹${siteConfig.pricing.pro.priceInr}`,
    sub: "per month",
    color: "from-pink-500 via-purple-500 to-orange-500",
    features: ["Unlimited resumes", "All 20+ templates", "Priority support", "Cover letter soon", "Bright premium designs"],
    cta: "Upgrade to Pro",
    href: "/register",
    highlight: true,
  },
];

export default function PricingPage() {
  const { user, isPro, upgrade } = useAuth();

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = "/register";
      return;
    }
    try {
      await upgrade();
      alert("🎉 Upgraded to Pro! All bright templates unlocked.");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-dots-bright">
      <Navbar />
      <main className="mx-auto max-w-5xl flex-1 px-4 py-16 text-center">
        <h1 className="text-4xl font-black brand-text-gradient">Simple, colorful pricing 🌈</h1>
        <p className="mt-3 font-medium text-purple-600">Start free. Go Pro when you&apos;re ready to shine!</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl border-2 p-8 text-left shadow-xl ${
                p.highlight ? "border-pink-400 bg-white ring-4 ring-purple-200" : "border-blue-200 bg-white"
              }`}
            >
              {p.highlight && (
                <span className={`rounded-full bg-gradient-to-r ${p.color} px-3 py-1 text-xs font-black text-white`}>
                  ⭐ Most popular
                </span>
              )}
              <h2 className="mt-4 text-2xl font-black text-slate-900">{p.name}</h2>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-4xl font-black bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>{p.price}</span>
                <span className="text-slate-500">{p.sub}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span className="text-pink-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              {p.id === "pro" && user && !isPro ? (
                <button type="button" onClick={handleUpgrade} className="btn-brand mt-8 block w-full py-3 text-center text-sm">
                  Upgrade now 🚀
                </button>
              ) : p.id === "pro" && isPro ? (
                <div className="mt-8 rounded-xl bg-gradient-to-r from-yellow-300 to-orange-400 py-3 text-center text-sm font-black text-purple-900">
                  You are on Pro ⭐
                </div>
              ) : (
                <Link
                  to={p.href}
                  className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-bold ${
                    p.highlight ? "btn-brand" : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  {p.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
