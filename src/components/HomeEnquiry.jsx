"use client";
import { useState } from "react";

export default function HomeEnquiry() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guestCount: "",
    eventDate: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  // "idle" | "loading" | "success" | "error"

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    const phoneRegex = /^[0-9\s\-\+\(\)]{10,15}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!form.eventType) newErrors.eventType = "Please select an event type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    
    if (!validate()) {
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/enquiry", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send.");
      }

      setStatus("success");
      setForm({
        name: "", phone: "", email: "",
        eventType: "", guestCount: "", eventDate: "",
        message: "",
      });

    } catch (err) {
      console.error("[HomeEnquiry]", err);
      setStatus("error");
    }
  };

  return (
    <section
      style={{ background: "#FAF7F2" }}
      className="py-24 px-6 md:px-14"
    >
      <div className={`max-w-6xl mx-auto
        grid grid-cols-1 lg:grid-cols-2
        gap-16 lg:gap-24 items-start`}>

        {/* ── LEFT — INFO ── */}
        <div className="lg:sticky lg:top-32">
          <p style={{
            fontSize:      "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color:         "#C9A84C",
            marginBottom:  "24px",
            fontBold:      500,
          }}>
            Quick Enquiry
          </p>

          <h2 className="font-heading" style={{
            fontWeight:   300,
            fontSize:     "clamp(2.4rem, 4.5vw, 3.5rem)",
            lineHeight:   1.1,
            color:        "#1C1C1E",
            marginBottom: "24px",
          }}>
            Where Every Occasion 
            <br />
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Becomes a Memory</em>
          </h2>

          <div style={{
            width:        "48px",
            height:       "1px",
            background:   "rgba(201,168,76,0.4)",
            marginBottom: "24px",
          }} />

          <p style={{
            fontSize:     "15px",
            lineHeight:   1.7,
            color:        "#6B5E4E",
            marginBottom: "48px",
            maxWidth:     "380px",
          }}>
            From grand weddings to intimate gatherings—share your vision with us and our dedicated planning team will bring it to life.
          </p>

          <div style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "24px",
          }}>

            {[
              {
                href:  "tel:+918800190003",
                label: "Speak with us",
                value: "+91 88001 90003",
              },
              {
                href:  "mailto:info@bastirampalace.com",
                label: "General Inquiries",
                value: "info@bastirampalace.com",
              },
              {
                href:  null,
                label: "Visit Us",
                value: "IMT Manesar, Gurugram, Haryana",
              },
            ].map(item => (
              <div key={item.label}
                style={{ display: "flex",
                  flexDirection: "column",
                  gap: "6px" }}>
                <span style={{
                  fontSize:      "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color:         "#A99686",
                }}>
                  {item.label}
                </span>
                {item.href ? (
                  <a href={item.href} style={{
                    fontSize:       "16px",
                    color:          "#C9A84C",
                    textDecoration: "none",
                    fontWeight:     500,
                  }}>
                    {item.value}
                  </a>
                ) : (
                  <span style={{
                    fontSize:   "16px",
                    color:      "#1C1C1E",
                  }}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — FORM ── */}
        <div className="bg-white p-8 md:p-12 border border-[#E8E0D0] shadow-sm">
          {status === "success" ? (
            <div style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "20px",
              textAlign:     "center",
              padding:       "40px 0",
            }}>
              <div style={{ 
                margin: "0 auto 10px", 
                width: "60px", 
                height: "60px",
                borderRadius: "50%",
                background: "#F7F3EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C9A84C",
                fontSize: "24px"
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize:   "32px",
                color:      "#1C1C1E",
                margin:     0,
              }}>
                Enquiry Received
              </h3>
              <p style={{
                fontSize:   "15px",
                lineHeight: 1.7,
                color:      "#6B5E4E",
                margin:     0,
              }}>
                Thank you for choosing Basti Ram Palace. Our event manager will contact you within 24 hours to discuss your requirements.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop:      "20px",
                  fontSize:       "11px",
                  letterSpacing:  "3px",
                  textTransform:  "uppercase",
                  color:          "#C9A84C",
                  background:     "transparent",
                  border:         "none",
                  borderBottom:   "1px solid #C9A84C",
                  padding:        "0 0 4px",
                  cursor:         "pointer",
                  display:        "inline-block",
                  margin:         "24px auto 0",
                }}
              >
                Send Another Enquiry →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] tracking-[2px] uppercase text-[#6B5E4E]">
                    Full Name <span className="text-[#C9A84C]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="E.g. Rohan Sharma"
                    className={`w-full bg-transparent border ${errors.name ? 'border-red-400' : 'border-[#E8E0D0]'} p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors`}
                  />
                  {errors.name && <span className="text-[11px] text-red-500 font-medium tracking-wide mt-1">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[10px] tracking-[2px] uppercase text-[#6B5E4E]">
                    Phone Number <span className="text-[#C9A84C]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-transparent border ${errors.phone ? 'border-red-400' : 'border-[#E8E0D0]'} p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors`}
                  />
                  {errors.phone && <span className="text-[11px] text-red-500 font-medium tracking-wide mt-1">{errors.phone}</span>}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[10px] tracking-[2px] uppercase text-[#6B5E4E]">
                  Email Address <span className="text-[#C9A84C]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full bg-transparent border ${errors.email ? 'border-red-400' : 'border-[#E8E0D0]'} p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors`}
                />
                {errors.email && <span className="text-[11px] text-red-500 font-medium tracking-wide mt-1">{errors.email}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventType" className="text-[10px] tracking-[2px] uppercase text-[#6B5E4E]">
                    Type of Event <span className="text-[#C9A84C]">*</span>
                  </label>
                  <select
                    id="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className={`w-full bg-transparent border ${errors.eventType ? 'border-red-400' : 'border-[#E8E0D0]'} p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors appearance-none`}
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement / Sagaai</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Birthday">Birthday / Anniversary</option>
                    <option value="Other">Other Private Party</option>
                  </select>
                  {errors.eventType && <span className="text-[11px] text-red-500 font-medium tracking-wide mt-1">{errors.eventType}</span>}
                </div>

                {/* Event Date */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventDate" className="text-[10px] tracking-[2px] uppercase text-[#6B5E4E]">
                    Event Date
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-[#E8E0D0] p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div className="flex flex-col gap-2">
                <label htmlFor="guestCount" className="text-[10px] tracking-[2px] uppercase text-[#6B5E4E]">
                  Guest Count
                </label>
                <select
                  id="guestCount"
                  value={form.guestCount}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#E8E0D0] p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors appearance-none"
                >
                  <option value="">Approx. Number of Guests</option>
                  <option value="50-100">50 - 100</option>
                  <option value="100-300">100 - 300</option>
                  <option value="300-500">300 - 500</option>
                  <option value="500-800">500 - 800</option>
                  <option value="800+">800+</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] tracking-[2px] uppercase text-[#A99686]">
                  Additional Requirements <span className="text-[10px] italic lowercase normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share any specific details or questions you have..."
                  rows={4}
                  className="w-full bg-transparent border border-[#E8E0D0] p-3 text-sm focus:border-[#C9A84C] outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500 text-center font-medium bg-red-50 p-3 border border-red-100">
                  An error occurred. Please try again or call us at +91 88001 90003.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-4 px-8 text-[11px] tracking-[3px] uppercase font-bold transition-all duration-300
                  ${status === "loading" 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-[#C9A84C] text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white shadow-md hover:shadow-lg"}`}
              >
                {status === "loading" ? "Processing..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
