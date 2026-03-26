"use client";

export default function MenuStickyNav({ menuCategories, activeId, scrollTo, navSticky }) {
  return (
    <div className={`sticky top-0 z-40 transition-all duration-300
                     ${navSticky ? "bg-white/96 backdrop-blur-md border-b border-[#EDE5D8] shadow-sm py-3"
                                 : "bg-[#FAF7F2] py-4"}`}>
      <div className="flex gap-2 overflow-x-auto px-6 md:px-14 max-w-7xl mx-auto"
           style={{ scrollbarWidth: "none" }}>
        {menuCategories.map((cat) => (
          <button key={cat.id} onClick={() => scrollTo(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs
                        font-body font-medium tracking-wide whitespace-nowrap flex-shrink-0
                        transition-all duration-300
                        ${activeId === cat.id
                          ? "bg-[#2B1810] text-[#C9A84C] border-[#2B1810] shadow-sm"
                          : "bg-white text-[#666] border-[#E0D8CC] hover:border-[#C9A84C]/50 hover:text-[#2B1810]"}`}>
            <span className="text-sm">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
