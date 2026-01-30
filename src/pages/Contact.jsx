import React from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="pt-24 bg-[#F5F1EB] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-heading mb-8">Contact Us</h1>
        <p className="text-lg text-[#555] max-w-2xl mx-auto mb-12">
          Ready to plan your next event? Reach out to us and our team will get back to you shortly.
        </p>
        
        <div className="grid gap-12 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm text-left">
            <h3 className="text-2xl font-heading mb-4">Location</h3>
            <p className="text-[#555]">Basti, Uttar Pradesh</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm text-left">
            <h3 className="text-2xl font-heading mb-4">Phone & Email</h3>
            <p className="text-[#555]">+91 XXXXX XXXXX</p>
            <p className="text-[#555]">info@rampalace.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
