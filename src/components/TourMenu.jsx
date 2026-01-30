export function TourMenu({ activeId, onSelect, items }) {
  return (
    <div className="relative z-10 flex h-full flex-col p-6 md:p-12">
      <div className="flex w-full max-w-sm flex-col rounded-[2.5rem] border border-white/20 bg-white/10 p-10 backdrop-blur-2xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-[10px] tracking-[0.3em] text-white/80">HERITAGE</p>
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">LUMINA</h1>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`text-left text-sm font-medium tracking-[0.2em] transition-all duration-300
                ${activeId === item.id 
                  ? "text-white underline decoration-[#c9a24d] decoration-2 underline-offset-8" 
                  : "text-white/60 hover:text-white"
                }`}
            >
              {item.title}
            </button>
          ))}
        </nav>

        {/* Footer info inside panel */}
        <div className="mt-auto pt-20">
          <p className="text-[10px] tracking-[0.2em] text-white/50">RESERVED EXPERIENCES</p>
          <p className="text-[10px] tracking-[0.2em] text-white/50">EST. 1924</p>
        </div>
      </div>

      {/* Page-level footer info outside panel */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <p className="text-[10px] tracking-[0.2em] text-white/60">VIRTUAL TOUR © 2026</p>
      </div>
    </div>
  );
}
