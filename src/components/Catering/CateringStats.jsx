"use client";

export default function CateringStats() {
  const stats = [
    { target: 500, label: "Events Catered" },
    { target: 14,  label: "Trusted Clients" },
    { target: 8,   label: "Live Counter Concepts" },
    { target: 200, label: "Menu Items" },
  ];

  return (
    <section className="bg-[#2B1810] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`text-center ${
              i > 0 ? "border-l border-[#C9A84C]/20 pl-12" : ""
            }`}
          >
            <div className="font-heading text-4xl md:text-5xl text-[#C9A84C] font-semibold">
              <span className="stat-num" data-target={s.target}>0+</span>
            </div>
            <div className="font-body text-white/45 text-xs tracking-widest uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
