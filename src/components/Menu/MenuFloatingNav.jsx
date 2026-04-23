"use client";

export default function MenuFloatingNav({ categories, activeId, onSelect }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6">
      {categories.map((cat) => {
        const active = activeId === cat.id;
        return (
          <button 
            key={cat.id} 
            onClick={() => onSelect(cat.slug)} 
            title={cat.label}
            className="group relative flex items-center justify-end"
          >
            <span className={`
              mr-4 font-bold text-[9px] tracking-[3px] uppercase
              text-[#2B1810] whitespace-nowrap
              transition-all duration-500 pointer-events-none
              ${active ? "opacity-100 translate-x-0"
                       : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}
            `}>
              {cat.label}
            </span>
            
            <div className="relative flex items-center justify-center">
              {/* Outer Ring */}
              <div className={`
                absolute w-5 h-5 border border-[#C9A84C]/30 rounded-full transition-all duration-700
                ${active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-50"}
              `} />
              
              {/* Inner Dot */}
              <span className={`
                block rounded-full transition-all duration-500 z-10
                ${active ? "w-1.5 h-1.5 bg-[#C9A84C]"
                         : "w-1 h-1 bg-[#2B1810]/20 group-hover:bg-[#C9A84C]"}
              `} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
