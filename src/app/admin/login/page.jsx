"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm border border-[#E8E0D0] bg-white">
        <div className="bg-[#1C1C1E] px-6 py-4 border-b border-white/10">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.28em] uppercase font-body">
            Basti Ram Palace
          </p>
          <p className="mt-1 text-[22px] leading-tight text-white font-heading">
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6 font-body">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[11px] tracking-[0.22em] uppercase text-[#A99686]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8E0D0] text-[#1C1C1E] text-sm font-body focus:border-[#C9A84C] focus:outline-none"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-[13px] text-[#DC2626] font-body">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1C1C1E] text-white text-[14px] tracking-[0.18em] uppercase py-3 font-body transition-colors duration-300 disabled:opacity-60 hover:bg-[#C9A84C] hover:text-[#1C1C1E]"
          >
            {loading ? "Verifying..." : "Enter Admin Panel"}
          </button>
        </form>
      </div>

      <a
        href="/"
        className="mt-4 text-[13px] text-[#A99686] hover:text-[#1C1C1E] font-body"
      >
        ← Back to site
      </a>
    </div>
  );
}
