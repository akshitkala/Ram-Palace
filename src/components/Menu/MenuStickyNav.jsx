"use client";

export default function MenuStickyNav({ menuCategories, activeId, scrollTo, navSticky }) {
  return (
    <div className={`sticky top-0 z-40 transition-all duration-500
                     ${navSticky ? "bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#C9A84C]/10 shadow-sm py-2"
                                 : "bg-[#FAF7F2] py-6"}`}>
      <div className="flex gap-8 overflow-x-auto px-6 md:px-14 max-w-7xl mx-auto items-center no-scrollbar justify-center md:justify-start"
           style={{ scrollbarWidth: "none" }}>
        {menuCategories.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => scrollTo(cat.slug)}
            className="relative group py-2 whitespace-nowrap flex-shrink-0 transition-all duration-300"
          >
            <span className={`
              text-[10px] md:text-xs font-bold tracking-[3px] uppercase
              transition-colors duration-300
              ${activeId === cat.id ? "text-[#2B1810]" : "text-[#2B1810]/40 group-hover:text-[#2B1810]"}
            `}>
              {cat.label}
            </span>
            
            {/* Active/Hover Underline */}
            <div className={`
              absolute -bottom-1 left-0 h-[2px] bg-[#C9A84C] transition-all duration-500
              ${activeId === cat.id ? "w-full" : "w-0 group-hover:w-full"}
            `} />
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
