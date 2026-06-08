import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { LANDING_TEMPLATES } from "../utils/defaultResume.js";
import { siteConfig } from "../config/siteConfig.js";

const TESTIMONIALS = [
  { name: "Priya S.", role: "Software Engineer", text: "AshuResumeMaker templates are gorgeous — got hired in 2 weeks!", color: "from-pink-500 to-purple-500" },
  { name: "Rahul M.", role: "MBA Graduate", text: "Bright, clean, professional — recruiters loved my PDF!", color: "from-orange-500 to-yellow-500" },
  { name: "Ananya K.", role: "Designer", text: "Best resume builder I've used. So easy and colorful!", color: "from-cyan-500 to-blue-500" },
];

const FEATURES = [
  { emoji: "🎨", title: "20+ Bright Templates", desc: "Executive, Tech, Creative & more", bg: "bg-pink-100 border-pink-300" },
  { emoji: "⚡", title: "Instant PDF", desc: "Download in one click", bg: "bg-orange-100 border-orange-300" },
  { emoji: "☁️", title: "Cloud Save", desc: "Auto-sync to server", bg: "bg-yellow-100 border-yellow-300" },
  { emoji: "🔒", title: "Secure Auth", desc: "JWT login & dashboard", bg: "bg-cyan-100 border-cyan-300" },
  { emoji: "💎", title: "Pro Plans", desc: "Unlock all templates", bg: "bg-purple-100 border-purple-300" },
  { emoji: "📱", title: "Mobile Ready", desc: "Edit anywhere", bg: "bg-blue-100 border-blue-300" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dots-bright">
      <Navbar />

      {/* Hero — full bright gradient */}
      <section className="brand-gradient relative overflow-hidden px-4 py-24 text-white">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/20 px-5 py-2 text-sm font-bold backdrop-blur">
            🌈 Welcome to {siteConfig.name}!
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Resumes that
            <span className="block text-yellow-300 drop-shadow-lg"> shine bright!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/95">
            Create stunning, professional resumes with {siteConfig.stats.templates} colorful templates.
            Free to start. No watermark. Pure magic ✨
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="rounded-full bg-yellow-400 px-8 py-4 text-base font-black text-purple-900 shadow-xl hover:bg-yellow-300 hover:scale-105 transition">
              Start free 🚀
            </Link>
            <Link to="/builder?tab=design" className="rounded-full border-2 border-white bg-white/10 px-8 py-4 text-base font-bold backdrop-blur hover:bg-white/25 transition">
              Try builder
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-bold">
            <span className="rounded-full bg-white/20 px-4 py-2">👥 {siteConfig.stats.users} users</span>
            <span className="rounded-full bg-white/20 px-4 py-2">⭐ {siteConfig.stats.rating}/5</span>
            <span className="rounded-full bg-white/20 px-4 py-2">📄 {siteConfig.stats.templates} templates</span>
          </div>
        </div>
      </section>

      {/* Features — rainbow cards */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-black brand-text-gradient">Why AshuResumeMaker?</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className={`rounded-2xl border-2 p-6 ${f.bg} shadow-md hover:scale-105 transition`}>
                <span className="text-3xl">{f.emoji}</span>
                <h3 className="mt-3 font-black text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="brand-gradient-cool py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-black text-white">Pick a colorful template</h2>
          <p className="mt-3 font-medium text-white/90">Click any card to start editing</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {LANDING_TEMPLATES.map((t) => (
              <Link
                key={t.id}
                to={`/builder?template=${t.id}&tab=design`}
                className="group overflow-hidden rounded-2xl border-2 border-white/50 bg-white text-left shadow-xl transition hover:-translate-y-2 hover:border-yellow-300"
              >
                <div className="h-36 p-4" style={{ background: `linear-gradient(135deg, ${t.color}33, ${t.color}88)` }}>
                  <div className="h-3 w-3/4 rounded-full bg-white/80" />
                  <div className="mt-2 h-2 w-1/2 rounded-full" style={{ backgroundColor: t.color }} />
                  <div className="mt-4 space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-white/60" />
                    <div className="h-1.5 w-2/3 rounded-full bg-white/60" />
                  </div>
                </div>
                <div className="p-3 font-bold text-slate-800 group-hover:text-pink-600">{t.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-black text-purple-700">Happy users 💬</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className={`rounded-2xl bg-gradient-to-br ${t.color} p-6 text-white shadow-lg`}>
                <p className="text-sm font-medium italic">&quot;{t.text}&quot;</p>
                <footer className="mt-4 text-sm font-black">{t.name}<span className="block font-normal opacity-90">{t.role}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="brand-gradient-warm py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-black">Ready to shine? 🌟</h2>
          <p className="mt-3 text-lg font-medium">Free plan · No credit card · Unlimited PDFs</p>
          <Link to="/register" className="mt-8 inline-block rounded-full bg-white px-10 py-4 font-black text-pink-600 shadow-xl hover:scale-105 transition">
            Create my resume now →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
