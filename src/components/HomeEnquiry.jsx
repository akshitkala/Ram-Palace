"use client";
import { useState } from "react";

export default function HomeEnquiry() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  // "idle" | "loading" | "success" | "error"

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
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
        throw new Error(
          data.error || "Failed to send."
        );
      }

      setStatus("success");
      setForm({
        name: "", phone: "",
        email: "", message: "",
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
      <div className="max-w-6xl mx-auto
        grid grid-cols-1 lg:grid-cols-2
        gap-16 lg:gap-24 items-start">

        {/* ── LEFT — INFO ── */}
        <div>
          <p style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color:         "#C9A84C",
            marginBottom:  "24px",
          }}>
            Quick Enquiry
          </p>

          <h2 style={{
            fontFamily:   "'Cormorant Garamond', Georgia, serif",
            fontWeight:   300,
            fontSize:     "clamp(2rem, 4vw, 3rem)",
            lineHeight:   1.15,
            color:        "#1C1C1E",
            marginBottom: "24px",
          }}>
            Start Planning
            <br />Your Event
          </h2>

          <div style={{
            width:        "48px",
            height:       "1px",
            background:   "rgba(201,168,76,0.4)",
            marginBottom: "24px",
          }} />

          <p style={{
            fontFamily:   "'DM Sans', sans-serif",
            fontSize:     "15px",
            lineHeight:   1.7,
            color:        "#6B5E4E",
            marginBottom: "48px",
            maxWidth:     "360px",
          }}>
            Share a few details and our team
            will reach out within 24 hours to
            discuss your vision.
          </p>

          {/* Contact links */}
          <div style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "20px",
          }}>

            {[
              {
                href:  "tel:+918800190003",
                label: "Phone",
                value: "+91 88001 90003",
              },
              {
                href:  "mailto:info@bastirampalace.com",
                label: "Email",
                value: "info@bastirampalace.com",
              },
              {
                href:  null,
                label: "Address",
                value: "IMT Manesar, Gurugram",
              },
            ].map(item => (
              <div key={item.label}
                style={{ display: "flex",
                  flexDirection: "column",
                  gap: "4px" }}>
                <span style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color:         "#6B5E4E",
                }}>
                  {item.label}
                </span>
                {item.href ? (
                  <a href={item.href} style={{
                    fontFamily:     "'DM Sans', sans-serif",
                    fontSize:       "15px",
                    color:          "#C9A84C",
                    textDecoration: "none",
                  }}>
                    {item.value}
                  </a>
                ) : (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize:   "15px",
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
        <div>
          {status === "success" ? (

            /* ── Success state ── */
            <div style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "16px",
              paddingTop:    "32px",
            }}>
              <div style={{
                width:      "48px",
                height:     "1px",
                background: "#C9A84C",
              }} />
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize:   "28px",
                color:      "#1C1C1E",
                margin:     0,
              }}>
                Thank you.
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize:   "14px",
                lineHeight: 1.7,
                color:      "#6B5E4E",
                margin:     0,
              }}>
                We've received your enquiry and
                will be in touch within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop:      "16px",
                  fontFamily:     "'DM Sans', sans-serif",
                  fontSize:       "11px",
                  letterSpacing:  "3px",
                  textTransform:  "uppercase",
                  color:          "#C9A84C",
                  background:     "transparent",
                  border:         "none",
                  borderBottom:   "1px solid rgba(201,168,76,0.4)",
                  paddingBottom:  "4px",
                  cursor:         "pointer",
                  alignSelf:      "flex-start",
                }}
              >
                Send Another →
              </button>
            </div>

          ) : (

            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              style={{
                display:       "flex",
                flexDirection: "column",
                gap:           "20px",
              }}
            >

              {/* Name */}
              <div style={{
                display: "flex", flexDirection: "column",
                gap: "8px"
              }}>
                <label htmlFor="name" style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color:         "#6B5E4E",
                }}>
                  Full Name <span style={{
                    color: "#C9A84C"
                  }}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div style={{
                display: "flex", flexDirection: "column",
                gap: "8px"
              }}>
                <label htmlFor="phone" style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color:         "#6B5E4E",
                }}>
                  Phone Number <span style={{
                    color: "#C9A84C"
                  }}>*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div style={{
                display: "flex", flexDirection: "column",
                gap: "8px"
              }}>
                <label htmlFor="email" style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color:         "#6B5E4E",
                }}>
                  Email Address <span style={{
                    color: "#C9A84C"
                  }}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div style={{
                display: "flex", flexDirection: "column",
                gap: "8px"
              }}>
                <label htmlFor="message" style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color:         "#A99686",
                }}>
                  Message
                  <span style={{
                    color:         "#6B5E4E",
                    marginLeft:    "6px",
                    fontStyle:     "italic",
                    letterSpacing: "0",
                    textTransform: "none",
                    fontSize:      "10px",
                  }}>
                    (optional)
                  </span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Date, type of event, number of guests..."
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize:     "none",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize:   "13px",
                  color:      "#f87171",
                  margin:     0,
                }}>
                  Something went wrong. Please try
                  again or call us directly at
                  +91 88001 90003.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  marginTop:     "8px",
                  width:         "100%",
                  background:    status === "loading"
                    ? "rgba(201,168,76,0.5)"
                    : "#C9A84C",
                  color:         "#1C1C1E",
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight:    600,
                  padding:       "16px 32px",
                  border:        "none",
                  cursor:        status === "loading"
                    ? "not-allowed"
                    : "pointer",
                  transition:    "all 0.2s",
                }}
                className="hover:bg-[#1C1C1E] hover:text-[#FAF7F2] transition-colors"
              >
                {status === "loading"
                  ? "Sending..."
                  : "Send Enquiry →"}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}

// Shared input style object
const inputStyle = {
  background:    "transparent",
  border:        "1px solid #E8E0D0",
  color:         "#1C1C1E",
  fontFamily:    "'DM Sans', sans-serif",
  fontSize:      "14px",
  padding:       "12px 16px",
  width:         "100%",
  outline:       "none",
  boxSizing:     "border-box",
  // Placeholder color via CSS — cannot be set
  // inline, add to globals.css below
};
