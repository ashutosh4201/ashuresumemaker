import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-dots-bright">
      <Navbar />
      <main className="mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-6xl font-black brand-text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">This page doesn&apos;t exist. Try the builder instead!</p>
        <div className="mt-8 flex gap-3">
          <Link to="/" className="rounded-xl border-2 border-purple-200 px-5 py-2.5 text-sm font-bold text-purple-700 hover:bg-purple-50">
            Home
          </Link>
          <Link to="/builder" className="btn-brand px-5 py-2.5 text-sm">
            Open builder
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
