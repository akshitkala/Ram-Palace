"use client";

export default function CateringStats() {
  const stats = [
    { value: "GD Foods", label: "Catering Partner" },
    { value: "8",        label: "Live Counters", suffix: "+" },
    { value: "Extensive", label: "Menu Options" },
    { value: "14",       label: "Corporate Clients", suffix: "+" },
  ];

  return (
    <section className="bg-[#2B1810] py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`text-center ${
              i > 0 ? "border-l border-[#C9A84C]/20 pl-12" : ""
            }`}
          >
            <div className="font-heading text-xl md:text-2xl text-[#C9A84C] font-semibold">
              <span>{s.value}{s.suffix}</span>
            </div>
            <div className="font-body text-white/45 text-[10px] tracking-widest uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
