import { useEffect, useState } from "react";

const METHODS = [
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "card", label: "Card", icon: "💳" },
  { id: "netbanking", label: "Netbanking", icon: "🏦" },
];

function formatInr(paise) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default function RazorpayDemoModal({ order, onSuccess, onClose }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("demo@upi");
  const [card, setCard] = useState({ number: "4111 1111 1111 1111", expiry: "12/28", cvv: "123" });
  const [bank, setBank] = useState("HDFC Bank");
  const [step, setStep] = useState("pay"); // pay | processing | success
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && step === "pay") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  if (!order) return null;

  const handlePay = async () => {
    setError("");
    setStep("processing");
    const paymentId = `pay_demo_${Date.now()}`;

    await new Promise((r) => setTimeout(r, 1800));

    try {
      await onSuccess({ order_id: order.order_id, payment_id: paymentId });
      setStep("success");
      setTimeout(onClose, 1400);
    } catch (e) {
      setStep("pay");
      setError(e.message || "Payment failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={step === "pay" ? onClose : undefined}>
      <div
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Razorpay demo checkout"
      >
        <div className="flex items-center justify-between border-b border-slate-100 bg-[#528FF0] px-5 py-3 text-white">
          <div>
            <p className="text-xs font-medium opacity-90">Razorpay · Demo</p>
            <p className="text-sm font-bold">{order.name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black">{formatInr(order.amount)}</p>
            <p className="text-[10px] uppercase tracking-wide opacity-80">{order.currency}</p>
          </div>
        </div>

        {step === "processing" && (
          <div className="flex flex-col items-center px-6 py-14">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#528FF0] border-t-transparent" />
            <p className="mt-4 text-sm font-semibold text-slate-700">Processing payment…</p>
            <p className="mt-1 text-xs text-slate-400">Demo mode — no real charge</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center px-6 py-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">✓</div>
            <p className="mt-4 text-lg font-bold text-slate-900">Payment successful</p>
            <p className="mt-1 text-sm text-slate-500">Pro plan activated</p>
          </div>
        )}

        {step === "pay" && (
          <>
            <div className="border-b border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-500">{order.description}</p>
              {order.prefill?.email && (
                <p className="mt-1 text-xs text-slate-400">{order.prefill.name} · {order.prefill.email}</p>
              )}
            </div>

            <div className="flex border-b border-slate-100">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex-1 py-3 text-xs font-bold transition ${
                    method === m.id ? "border-b-2 border-[#528FF0] text-[#528FF0]" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 px-5 py-4">
              {method === "upi" && (
                <label className="block">
                  <span className="text-xs font-semibold text-slate-600">UPI ID</span>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#528FF0]"
                    placeholder="name@upi"
                  />
                </label>
              )}

              {method === "card" && (
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-600">Card number</span>
                    <input
                      type="text"
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#528FF0]"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-600">Expiry</span>
                      <input
                        type="text"
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#528FF0]"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-600">CVV</span>
                      <input
                        type="text"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#528FF0]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {method === "netbanking" && (
                <label className="block">
                  <span className="text-xs font-semibold text-slate-600">Select bank</span>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#528FF0]"
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                  </select>
                </label>
              )}

              <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-800">
                Demo checkout — koi real payment nahi hogi. Test ke liye Pay dabao.
              </p>

              {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            </div>

            <div className="flex gap-3 border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePay}
                className="flex-1 rounded-lg bg-[#528FF0] py-2.5 text-sm font-bold text-white hover:bg-[#4178d4]"
              >
                Pay {formatInr(order.amount)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
