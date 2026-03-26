"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

function ContactHero() {
  return (
    <div className="text-center mb-12 animate-fade-in-up">
      <p className="font-body text-[#C9A84C] text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-semibold">
        Contact Us
      </p>
      <h1 className="font-heading text-4xl md:text-6xl text-white mb-4">
        Let&apos;s Plan Your Grand Celebration
      </h1>
      <p className="font-body text-white/80 text-base md:text-lg tracking-wide max-w-xl mx-auto">
        Begin your journey to an unforgettable event. Fill out the form below and we&apos;ll get in touch.
      </p>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    eventType: "", guestCount: "",
    eventDate: "", message: ""
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ 
      ...prev, [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      setFormData({
        name: "", email: "", phone: "",
        eventType: "", guestCount: "",
        eventDate: "", message: ""
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5 animate-fade-in-up delay-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="group">
          <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            placeholder="Ex. John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Event Type</label>
            <div className="relative">
              <select 
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-sm"
                required
              >
                <option value="" disabled className="text-black">Select Type</option>
                <option value="wedding" className="text-black">Wedding</option>
                <option value="corporate" className="text-black">Corporate Event</option>
                <option value="birthday" className="text-black">Birthday Party</option>
                <option value="other" className="text-black">Other Celebration</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Guest Count</label>
            <input 
              type="number" 
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              placeholder="Ex. 200"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Event Date</label>
          <input 
            type="date" 
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-none"
          />
        </div>

        <div>
          <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Additional Details</label>
          <textarea 
            rows="4" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all duration-300 resize-none backdrop-blur-sm"
            placeholder="Tell us more about your vision..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`w-full bg-gradient-to-r from-[#C9A84C] to-[#B08D55] 
              text-[#2B1E14] font-bold uppercase tracking-[0.15em] 
              py-5 rounded-xl shadow-lg 
              hover:shadow-[#C9A84C]/30 hover:scale-[1.01] 
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {status === "loading" 
              ? "Sending..." 
              : status === "success" 
              ? "✓ Enquiry Sent!" 
              : "Request Consultation"}
          </button>

          {status === "success" && (
            <div className="mt-4 p-4 border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-center">
              <p className="text-[#C9A84C] text-sm font-medium">
                Thank you! We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 p-4 border border-red-500/20 bg-red-500/5 text-center">
              <p className="text-red-400 text-sm">
                {errorMsg || "Something went wrong. Please try again."}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* STATIC BACKGROUND PLACEHOLDER */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero/hero.webp" 
          alt="Contact Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4 py-24 md:py-32">
        <ContactHero />
        <ContactForm />
      </div>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
