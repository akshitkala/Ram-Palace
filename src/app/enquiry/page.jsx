"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: ""
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        eventDate: "", message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-20 bg-[#F5F1EB] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#A99686] to-[#8B7A6A] px-6 py-16 md:py-20 text-center">
        <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
          Enquire Now
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Let us help you plan your perfect event at Basti Ram Palace
        </p>
      </section>

      {/* Form Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl mb-2">Thank You!</h2>
              <p className="text-[#C9A84C] text-sm font-medium">
                Thank you! We&apos;ll be in touch within 24 hours.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                A confirmation has been sent to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-lg shadow-lg">
              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold text-[#555] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                  placeholder="Your full name"
                />

              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-semibold text-[#555] mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                  placeholder="Your phone number"
                />

              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-[#555] mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                  placeholder="your.email@example.com"
                />

              </div>

              {/* Event Type */}
              <div className="mb-6">
                <label htmlFor="eventType" className="block text-sm font-semibold text-[#555] mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding &amp; Reception</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>

              </div>

              {/* Event Date */}
              <div className="mb-6">
                <label htmlFor="eventDate" className="block text-sm font-semibold text-[#555] mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                />

              </div>

              {/* Guest Count */}
              <div className="mb-6">
                <label htmlFor="guestCount" className="block text-sm font-semibold text-[#555] mb-2">
                  Expected Guest Count *
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                  placeholder="Number of guests"
                  min="1"
                />

              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-[#555] mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A99686]"
                  placeholder="Tell us more about your event requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-[#A99686] text-white px-8 py-4 rounded-md text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                  ? "✓ Enquiry Sent!"
                  : "Request a Proposal"}
              </button>

              {status === "error" && (
                <div className="mt-4 p-4 border border-red-500/20 bg-red-500/5 text-center">
                  <p className="text-red-400 text-sm">
                    {errorMsg}
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
