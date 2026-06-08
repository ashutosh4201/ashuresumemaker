import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { siteConfig } from "../config/siteConfig.js";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-dots-bright">
      <Navbar />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 prose prose-slate">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
        <p>{siteConfig.company} (&quot;{siteConfig.name}&quot;) respects your privacy. This policy explains how we collect, use, and protect your data when you use our resume builder platform.</p>
        <h2>Data we collect</h2>
        <ul>
          <li>Account information (username, email)</li>
          <li>Resume content you enter (stored securely on our servers)</li>
          <li>Usage analytics (optional, can be disabled)</li>
        </ul>
        <h2>How we use data</h2>
        <p>To provide the service, save your resumes, process payments, and improve the product. We do not sell personal data to third parties.</p>
        <h2>Data retention</h2>
        <p>You may delete your account and resumes at any time. Backups are purged within 30 days.</p>
        <h2>Contact</h2>
        <p>{siteConfig.supportEmail}</p>
      </main>
      <Footer />
    </div>
  );
}
