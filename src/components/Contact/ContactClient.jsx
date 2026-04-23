"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

function ContactHero() {
  return (
    <div className="text-center mb-16 animate-fade-in-up">
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="h-[1px] w-8 bg-[#C9A84C]/50"></div>
        <p className="font-body text-[#C9A84C] text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
          Contact Concierge
        </p>
        <div className="h-[1px] w-8 bg-[#C9A84C]/50"></div>
      </div>
      <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 text-luxury leading-tight">
        Let&apos;s Plan Your <br className="hidden md:block" /> <span className="italic font-light">Grand Celebration</span>
      </h1>
      <p className="font-body text-white/60 text-base md:text-xl tracking-wider max-w-2xl mx-auto leading-relaxed">
        Begin your journey to an unforgettable event at Basti Ram Palace. <br className="hidden md:block" /> 
        Our dedicated curators are ready to bring your vision to life.
      </p>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91 ",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      // Force +91 prefix
      if (!value.startsWith("+91 ")) {
        return;
      }
      // Allow only digits after +91
      const digits = value.slice(4).replace(/\D/g, "");
      if (digits.length <= 10) {
        setFormData(prev => ({ ...prev, phone: "+91 " + digits }));
      }
      return;
    }

    setFormData(prev => ({ 
      ...prev, [name]: value 
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Please enter your full name (min 3 chars)";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneDigits = formData.phone.slice(4);
    if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (formData.message && formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        message: ""
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-3xl p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-2xl bg-white/[0.03] animate-fade-in-up delay-100 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C9A84C]/10 blur-[100px] pointer-events-none group-hover:bg-[#C9A84C]/20 transition-colors duration-700" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#C9A84C]/5 blur-[100px] pointer-events-none group-hover:bg-[#C9A84C]/10 transition-colors duration-700" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group/input">
            <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              className={`w-full bg-white/[0.02] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.05] transition-all duration-500 backdrop-blur-md`}
              placeholder="Ex. John Doe"
            />
            {errors.name && <p className="text-red-400 text-[10px] mt-2 ml-1 tracking-wider uppercase font-medium">{errors.name}</p>}
          </div>
          <div className="group/input">
            <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white/[0.02] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.05] transition-all duration-500 backdrop-blur-md`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-[10px] mt-2 ml-1 tracking-wider uppercase font-medium">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group/input">
            <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Phone Number (10 Digits)</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required 
              className={`w-full bg-white/[0.02] border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.05] transition-all duration-500 backdrop-blur-md`}
            />
            {errors.phone && <p className="text-red-400 text-[10px] mt-2 ml-1 tracking-wider uppercase font-medium">{errors.phone}</p>}
          </div>
          <div className="group/input">
            <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Event Type</label>
            <div className="relative">
              <select 
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`w-full bg-white/[0.02] border ${errors.eventType ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#C9A84C] focus:bg-white/[0.05] transition-all duration-500 cursor-pointer backdrop-blur-md`}
                required
              >
                <option value="" disabled className="bg-[#1A1A1A] text-white/50">Select Event Type</option>
                <option value="wedding" className="bg-[#1A1A1A] text-white">Wedding</option>
                <option value="corporate" className="bg-[#1A1A1A] text-white">Corporate Event</option>
                <option value="birthday" className="bg-[#1A1A1A] text-white">Birthday Party</option>
                <option value="other" className="bg-[#1A1A1A] text-white">Other Celebration</option>
              </select>
            </div>
            {errors.eventType && <p className="text-red-400 text-[10px] mt-2 ml-1 tracking-wider uppercase font-medium">{errors.eventType}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group/input">
            <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Event Date</label>
            <input 
              type="date" 
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.05] transition-all duration-500 backdrop-blur-md"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div className="group/input">
            <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Estimated Guests</label>
            <input 
              type="number" 
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.05] transition-all duration-500 backdrop-blur-md"
              placeholder="e.g. 200"
            />
          </div>
        </div>

        <div className="group/input">
          <label className="block text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ml-1 transition-colors group-focus-within/input:text-[#C9A84C]">Your Requirements</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full bg-white/[0.02] border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.05] transition-all duration-500 backdrop-blur-md resize-none`}
            placeholder="Tell us more about your event..."
          ></textarea>
          {errors.message && <p className="text-red-400 text-[10px] mt-2 ml-1 tracking-wider uppercase font-medium">{errors.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`w-full bg-gradient-to-r from-[#C9A84C] to-[#B08D55] 
              text-[#2B1E14] font-bold uppercase tracking-[0.2em] text-xs
              py-6 rounded-2xl shadow-xl 
              hover:shadow-[#C9A84C]/20 hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-500
              disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {status === "loading" 
              ? "Sending Enquiry..." 
              : status === "success" 
              ? "✓ Enquiry Received" 
              : "Request Private Consultation"}
          </button>


          {status === "success" && (
            <div className="mt-4 p-4 border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-center">
              <p className="text-[#C9A84C] text-sm font-medium">
                Thank you! We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          )}

          {status === "error" && !Object.keys(errors).length && (
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

export default function ContactClient() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero/PremiumContactBg.png" 
          alt="Contact Background"
          fill
          className="object-cover opacity-80 md:scale-105 animate-slow-zoom"
          priority
          quality={95}
          sizes="(max-width: 768px) 150vw, 100vw"
        />
        
        {/* Premium Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_70%)] z-10" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.85%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

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
