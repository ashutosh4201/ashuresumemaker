import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig.js";

export default function Footer() {
  return (
    <footer className="brand-gradient text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-xs font-black">AR</span>
            <span className="text-lg font-black">{siteConfig.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Bright, beautiful, professional resumes — made with love and color! 🌈
          </p>
        </div>
        <div>
          <h4 className="font-bold text-yellow-300">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link to="/builder?tab=design" className="hover:text-yellow-200">Resume Builder</Link></li>
            <li><Link to="/pricing" className="hover:text-yellow-200">Pricing</Link></li>
            <li><a href="/#templates" className="hover:text-yellow-200">Templates</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-cyan-200">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link to="/privacy" className="hover:text-cyan-100">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-cyan-100">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-pink-200">Contact</h4>
          <p className="mt-3 text-sm text-white/90">{siteConfig.supportEmail}</p>
        </div>
      </div>
      <div className="border-t border-white/20 py-6 text-center text-xs text-white/70">
        © {siteConfig.year} {siteConfig.name}. Made with 💖 and bright colors.
      </div>
    </footer>
  );
}
