"use client";

export default function MenuIntro() {
  return (
    <div className="bg-white border-b border-[#EDE5D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#C9A84C]" />
              <span className="font-body text-[#C9A84C] text-[9px] tracking-[4px] uppercase font-bold">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl text-[#2B1810] leading-tight">
              Where Flavour<br />
              <em className="not-italic text-[#C9A84C]">Meets Precision</em>
            </h2>
          </div>
          <p className="font-body text-[#5A4A3A] text-base md:text-lg leading-relaxed">
            GD Foods India specializes in delivering thoughtfully curated catering
            solutions that balance great taste, consistency, and flawless execution.
            Every menu is planned with care, every dish prepared fresh, presented with
            precision, and delivered on time.
          </p>
        </div>
      </div>
    </div>
  );
}
