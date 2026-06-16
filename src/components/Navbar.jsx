import { Link } from "react-router-dom";
import { useState } from "react";
import { siteConfig } from "../config/siteConfig.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, isPro, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <a href="/#features" className="text-sm font-semibold text-purple-600 hover:text-pink-500" onClick={() => setOpen(false)}>Features</a>
      <a href="/#templates" className="text-sm font-semibold text-blue-600 hover:text-cyan-500" onClick={() => setOpen(false)}>Templates</a>
      <Link to="/pricing" className="text-sm font-semibold text-orange-600 hover:text-yellow-500" onClick={() => setOpen(false)}>Pricing</Link>
      <Link to="/builder" className="text-sm font-semibold text-pink-600 hover:text-fuchsia-500" onClick={() => setOpen(false)}>Builder</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b-2 border-fuchsia-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg shadow-fuchsia-500/30">
            AR
          </span>
          <div className="text-left leading-tight">
            <span className="block text-lg font-black brand-text-gradient">{siteConfig.name}</span>
            <span className="hidden text-[10px] font-bold text-orange-500 sm:block">✨ Bright Resume Magic</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">{navLinks}</nav>

        <div className="flex items-center gap-2">
          {!loading && user ? (
            <>
              {isPro && (
                <span className="hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2.5 py-1 text-[10px] font-black uppercase text-white sm:inline">
                  Pro ⭐
                </span>
              )}
              <Link to="/dashboard" className="hidden rounded-xl px-3 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50 sm:inline">
                Dashboard
              </Link>
              <button type="button" onClick={logout} className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-500 hover:bg-pink-50 sm:inline">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden rounded-xl px-3 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50 sm:inline">
                Log in
              </Link>
              <Link to="/register" className="btn-brand hidden px-5 py-2.5 text-sm sm:inline">
                Start free 🚀
              </Link>
            </>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-purple-700 hover:bg-purple-50 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-fuchsia-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">{navLinks}</nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            {!loading && user ? (
              <>
                <Link to="/dashboard" className="rounded-xl px-3 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50" onClick={() => setOpen(false)}>Dashboard</Link>
                <button type="button" onClick={() => { logout(); setOpen(false); }} className="rounded-xl px-3 py-2 text-left text-sm text-slate-500 hover:bg-pink-50">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-xl px-3 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50" onClick={() => setOpen(false)}>Log in</Link>
                <Link to="/register" className="btn-brand px-5 py-2.5 text-center text-sm" onClick={() => setOpen(false)}>Start free 🚀</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
