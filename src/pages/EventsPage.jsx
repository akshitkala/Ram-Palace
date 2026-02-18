import React from 'react';
import Footer from '../components/Footer';

const EventsPage = () => {
  return (
    <div className="pt-24 bg-[#F5F1EB] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-heading mb-8">Our Events</h1>
        <p className="text-lg text-[#555] max-w-2xl mb-12">
          From grand weddings to intimate private gatherings, Basti Ram Palace provides the perfect setting for every occasion.
        </p>
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Weddings", desc: "Celebrate your special day in our grand ballroom." },
            { title: "Corporate Events", desc: "Professional spaces for meetings and conferences." },
            { title: "Private Parties", desc: "Birthdays, anniversaries, and family celebrations." }
          ].map((event, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-heading mb-4">{event.title}</h3>
              <p className="text-[#555] mb-6">{event.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
