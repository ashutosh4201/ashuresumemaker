import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border-2 border-cyan-200 bg-white p-8 shadow-xl ring-2 ring-blue-100">
          <h1 className="text-2xl font-black brand-text-gradient">Create your account 🚀</h1>
          <p className="mt-1 text-sm text-slate-500">Free plan · 1 resume · 6 templates · No credit card</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            {["username", "email", "password"].map((field) => (
              <label key={field} className="block">
                <span className="text-xs font-medium capitalize text-slate-600">{field}</span>
                <input
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-fuchsia-400"
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  required
                />
              </label>
            ))}
            <button type="submit" disabled={loading} className="btn-brand w-full py-3 text-sm disabled:opacity-60">
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-400">
            By signing up you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
