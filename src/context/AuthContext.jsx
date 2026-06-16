import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchProfile,
  fetchBillingStatus,
  upgradeToPro,
  createCheckoutSession,
  claimResume,
} from "../api/client.js";

const AuthContext = createContext(null);
const RESUME_ID_KEY = "resumeflow-resume-id";

async function claimGuestResume() {
  const id = localStorage.getItem(RESUME_ID_KEY);
  if (!id) return;
  try {
    await claimResume(id);
  } catch {
    /* guest resume may already be owned or plan limit */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = localStorage.getItem("resumeflow-access");
    if (!token) {
      setUser(null);
      setBilling(null);
      setLoading(false);
      return;
    }
    try {
      const profile = await fetchProfile();
      setUser(profile);
      try {
        const bill = await fetchBillingStatus();
        setBilling(bill);
      } catch {
        setBilling({ plan: profile.profile?.plan || "free", is_pro: false });
      }
    } catch {
      logoutUser();
      setUser(null);
      setBilling(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (username, password) => {
    await loginUser(username, password);
    await claimGuestResume();
    await refresh();
  };

  const register = async (username, email, password) => {
    await registerUser(username, email, password);
    await login(username, password);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setBilling(null);
  };

  const checkout = async () => {
    const res = await createCheckoutSession();
    if (res.checkout_url) {
      window.location.href = res.checkout_url;
      return res;
    }
    if (res.demo && !res.razorpay_demo) {
      await refresh();
    }
    return res;
  };

  const upgrade = async () => {
    const res = await upgradeToPro();
    await refresh();
    return res;
  };

  const plan = billing?.plan || user?.profile?.plan || "free";
  const isPro = billing?.is_pro || user?.profile?.is_pro || plan === "pro";

  return (
    <AuthContext.Provider
      value={{ user, billing, loading, plan, isPro, login, register, logout, upgrade, checkout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
