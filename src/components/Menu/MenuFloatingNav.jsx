"use client";

export default function MenuFloatingNav({ categories, activeId, onSelect }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {categories.map((cat) => {
        const active = activeId === cat.id;
        return (
          <button key={cat.id} onClick={() => onSelect(cat.slug)} title={cat.label}
            className="group relative flex items-center gap-2">
            <span className={`absolute right-6 font-body text-[9px] tracking-[2px] uppercase
                              bg-[#2B1810] text-[#C9A84C] px-3 py-1.5 rounded-md whitespace-nowrap
                              transition-all duration-300 pointer-events-none
                              ${active ? "opacity-100 translate-x-0"
                                       : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
              {cat.label}
            </span>
            <span className={`block rounded-full transition-all duration-300 flex-shrink-0
                              ${active ? "w-3 h-3 bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.7)]"
                                       : "w-2 h-2 bg-[#C9A84C]/25 hover:bg-[#C9A84C]/55"}`} />
          </button>
        );
      })}
    </div>
  );
}
