import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

// Use high-quality assets for the background carousel
import bg1 from '../assets/images/hall3.webp';
import bg2 from '../assets/images/hero/bg.webp';
import bg3 from '../assets/images/hero/palace.webp';

const backgroundImages = [bg1, bg2, bg3];

const Contact = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* BACKGROUND CAROUSEL */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={img}
            alt={`Luxury Background ${index + 1}`}
            className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
              index === currentSlide ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4 py-24 md:py-32">
        
        {/* Page Header - Moved Outside */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="font-body text-[#C6A75E] text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-semibold">
            Contact Us
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-4">
            Let's Plan Your Grand Celebration
          </h1>
          <p className="font-body text-white/80 text-base md:text-lg tracking-wide max-w-xl mx-auto">
            Begin your journey to an unforgettable event. Fill out the form below and we'll get in touch.
          </p>
        </div>

        {/* GLASSMORPHISM FORM CONTAINER */}
        <div 
          className="w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5 animate-fade-in-up delay-100"
        >
          {/* Form */}
          <form className="space-y-8">
            
            {/* Full Name */}
            <div className="group">
              <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 backdrop-blur-sm"
                placeholder="Ex. John Doe"
              />
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 backdrop-blur-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 backdrop-blur-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Event Type</label>
                <div className="relative">
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 appearance-none cursor-pointer backdrop-blur-sm"
                    defaultValue=""
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 backdrop-blur-sm"
                  placeholder="Ex. 200"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Event Date</label>
              <input 
                type="date" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 calendar-white backdrop-blur-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/80 text-xs uppercase tracking-widest mb-3 font-medium ml-1">Additional Details</label>
              <textarea 
                rows="4" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(198,167,94,0.1)] transition-all duration-300 resize-none backdrop-blur-sm"
                placeholder="Tell us more about your vision..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#C6A75E] to-[#B08D55] text-[#2B1E14] font-bold uppercase tracking-[0.15em] py-5 rounded-xl shadow-lg hover:shadow-[#C6A75E]/30 hover:scale-[1.01] transition-all duration-300"
              >
                Request Consultation
              </button>
              <p className="text-xs text-white/40 text-center mt-4 italic">
                We respect your privacy. Your details are safe with us.
              </p>
            </div>

          </form>
        </div>
      </div>

      {/* Footer (Pushed down or visible on scroll) */}
      <div className="relative z-20">
         <Footer />
      </div>
    </div>
  );
};

export default Contact;
