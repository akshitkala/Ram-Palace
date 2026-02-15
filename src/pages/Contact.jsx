import React from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="pt-24 bg-[#F5F1EB] min-h-screen flex flex-col">
      <section className="booking-section flex-1">
        <form className="booking-form">
          <h2 className="font-heading text-3xl md:text-4xl tracking-wide mb-2 text-[#2A2015]">
            Book Your Experience
          </h2>
          <p className="font-body text-sm md:text-base text-[#6F5B42] mb-8">
            Luxury begins with a reservation.
          </p>

          <div className="input-group">
            <input type="text" required />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input type="email" required />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input type="tel" required />
            <label>Phone Number</label>
          </div>

          <div className="input-group">
            <input type="date" required />
            <label>Event Date</label>
          </div>

          <div className="input-group">
            <select required defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              <option>Wedding</option>
              <option>Corporate Event</option>
              <option>Birthday</option>
              <option>Private Party</option>
            </select>
            <label>Event Type</label>
          </div>

          <div className="input-group">
            <textarea rows="3" required></textarea>
            <label>Additional Requirements</label>
          </div>

          <button type="submit" className="booking-submit">
            Request Booking
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
