const API_BASE = import.meta.env.VITE_API_URL || "/api";

function authHeaders() {
  const token = localStorage.getItem("resumeflow-access");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function refreshAccessToken() {
  const refresh = localStorage.getItem("resumeflow-refresh");
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem("resumeflow-access", data.access);
    if (data.refresh) localStorage.setItem("resumeflow-refresh", data.refresh);
    return true;
  } catch {
    return false;
  }
}

async function request(path, options = {}, retried = false) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Start the backend: cd resumeflow/backend && python manage.py runserver"
    );
  }

  if (res.status === 401 && !retried && localStorage.getItem("resumeflow-refresh")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) return request(path, options, true);
    logoutUser();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const fieldErrors = data && typeof data === "object"
      ? Object.entries(data)
          .flatMap(([k, v]) => (Array.isArray(v) ? v.map((msg) => `${k}: ${msg}`) : [`${k}: ${v}`]))
          .join(" ")
      : "";
    throw new Error(data.detail || fieldErrors || data.message || "API request failed");
  }
  if (res.status === 204) return null;
  return data;
}

export async function fetchTemplates() {
  return request("/templates/");
}

export async function createResume(resume) {
  return request("/resumes/", {
    method: "POST",
    body: JSON.stringify({
      title: resume.personal?.fullName || "My Resume",
      template: resume.template,
      accent: resume.accent,
      data: resume,
    }),
  });
}

export async function getResume(id) {
  return request(`/resumes/${id}/`);
}

export async function updateResume(id, resume) {
  return request(`/resumes/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      title: resume.personal?.fullName || "My Resume",
      template: resume.template,
      accent: resume.accent,
      data: resume,
    }),
  });
}

export async function claimResume(id) {
  return request(`/resumes/${id}/claim/`, { method: "POST" });
}

export async function registerUser(username, email, password) {
  return request("/auth/register/", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function loginUser(username, password) {
  const data = await request("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  localStorage.setItem("resumeflow-access", data.access);
  localStorage.setItem("resumeflow-refresh", data.refresh);
  return data;
}

export function logoutUser() {
  localStorage.removeItem("resumeflow-access");
  localStorage.removeItem("resumeflow-refresh");
}

export async function fetchProfile() {
  return request("/auth/me/");
}

export async function fetchBillingStatus() {
  return request("/billing/status/");
}

export async function fetchPlans() {
  return request("/billing/plans/");
}

export async function createCheckoutSession() {
  return request("/billing/checkout/", { method: "POST" });
}

export async function verifyRazorpayDemoPayment(orderId, paymentId) {
  return request("/billing/razorpay/demo/verify/", {
    method: "POST",
    body: JSON.stringify({ order_id: orderId, payment_id: paymentId }),
  });
}

export async function upgradeToPro() {
  return request("/billing/upgrade/", { method: "POST" });
}

export async function listMyResumes() {
  return request("/resumes/");
}

export async function deleteResume(id) {
  return request(`/resumes/${id}/`, { method: "DELETE" });
}

export async function fetchResumeMeta() {
  return request("/resumes/meta/");
}
