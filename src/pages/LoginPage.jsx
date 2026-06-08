import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border-2 border-pink-200 bg-white p-8 shadow-xl ring-2 ring-purple-100">
          <h1 className="text-2xl font-black brand-text-gradient">Welcome back ✨</h1>
          <p className="mt-1 text-sm text-slate-500">Log in to manage your resumes</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            <label className="block">
              <span className="text-xs font-medium text-slate-600">Username</span>
              <input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-fuchsia-400" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-600">Password</span>
              <input type="password" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-fuchsia-400" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" disabled={loading} className="btn-brand w-full py-3 text-sm disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            No account? <Link to="/register" className="font-semibold text-fuchsia-600">Create free account</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
