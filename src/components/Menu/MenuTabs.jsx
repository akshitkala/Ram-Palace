"use client";

export default function MenuTabs({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-20 px-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`relative py-3 px-6 text-sm md:text-base font-body tracking-[0.2em] uppercase transition-all duration-500 group ${
            activeCategory === cat.id
              ? "text-[#C9A84C] font-semibold"
              : "text-[#A99686] hover:text-[#2B1E14]"
          }`}
        >
          {cat.name}
          <span
            className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A84C] transition-transform duration-500 origin-left ${
              activeCategory === cat.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
