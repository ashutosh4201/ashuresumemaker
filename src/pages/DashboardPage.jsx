import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { listMyResumes, createResume, deleteResume } from "../api/client.js";
import { createEmptyResume } from "../utils/defaultResume.js";
import { useToast } from "../context/ToastContext.jsx";

export default function DashboardPage() {
  const { user, isPro, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    listMyResumes()
      .then(setResumes)
      .catch(() => setResumes([]))
      .finally(() => setLoading(false));
  }, [user, authLoading, navigate]);

  const handleNew = async () => {
    if (!isPro && resumes.length >= 1) {
      navigate("/pricing");
      return;
    }
    setCreating(true);
    try {
      const created = await createResume(createEmptyResume());
      localStorage.setItem("resumeflow-resume-id", created.id);
      navigate(`/builder?resume=${created.id}`);
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this resume?")) return;
    await deleteResume(id);
    setResumes((r) => r.filter((x) => x.id !== id));
    showToast("Resume deleted", "success");
  };

  if (authLoading || loading) {
    return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 font-semibold text-purple-700">Loading dashboard…</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-dots-bright">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black brand-text-gradient">My Resumes 📄</h1>
            <p className="text-sm font-medium text-purple-600">Hi {user.username} · {isPro ? "⭐ Pro plan" : "Free plan"}</p>
          </div>
          <div className="flex gap-2">
            {!isPro && (
              <Link to="/pricing" className="rounded-xl border-2 border-orange-300 bg-gradient-to-r from-yellow-200 to-orange-300 px-4 py-2.5 text-sm font-bold text-purple-900 hover:opacity-90">
                Upgrade Pro
              </Link>
            )}
            <button type="button" onClick={handleNew} disabled={creating} className="btn-brand px-5 py-2.5 text-sm disabled:opacity-60">
              {creating ? "Creating…" : "+ New resume"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {resumes.map((r) => (
            <div key={r.id} className="rounded-2xl border-2 border-purple-100 bg-white p-5 shadow-md transition hover:border-pink-300 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{r.title || "Untitled"}</h3>
                  <p className="text-xs text-slate-500">Template: {r.template} · Updated {new Date(r.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to={`/builder?resume=${r.id}`} className="rounded-lg brand-gradient px-4 py-2 text-xs font-semibold text-white hover:opacity-90">
                  Edit
                </Link>
                <button type="button" onClick={() => handleDelete(r.id)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {resumes.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-pink-300 bg-white/60 py-16 text-center font-medium text-purple-600">
              No resumes yet. Create your first one!
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
