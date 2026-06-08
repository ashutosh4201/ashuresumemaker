import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { siteConfig } from "../config/siteConfig.js";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-dots-bright">
      <Navbar />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 prose prose-slate">
        <h1>Terms of Service</h1>
        <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
        <p>By using {siteConfig.name}, you agree to these terms.</p>
        <h2>Service</h2>
        <p>We provide an online resume builder. Free and paid plans are subject to feature limits described on our Pricing page.</p>
        <h2>Your content</h2>
        <p>You retain ownership of resume content you create. You grant us a license to host and display it solely to provide the service.</p>
        <h2>Acceptable use</h2>
        <p>No illegal content, spam, or attempts to disrupt the platform.</p>
        <h2>Payments</h2>
        <p>Pro subscriptions renew monthly unless cancelled. Refunds per our refund policy (14-day money-back for annual plans).</p>
        <h2>Limitation of liability</h2>
        <p>Service provided &quot;as is.&quot; We are not liable for hiring outcomes based on resumes created with our tool.</p>
        <h2>Contact</h2>
        <p>{siteConfig.supportEmail}</p>
      </main>
      <Footer />
    </div>
  );
}
