"use client";

import Image from "next/image";

export default function MenuGrid({ activeCategory, menuItems }) {
  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
      {filteredItems.map((item, idx) => (
        <div key={idx} className="menu-item flex items-start gap-6 group">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-full border border-[#C9A84C]/20 group-hover:border-[#C9A84C]/50 transition-colors duration-500">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="flex-grow pt-2">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-heading text-xl md:text-2xl text-[#2B1E14] group-hover:text-[#C9A84C] transition-colors duration-500">
                {item.name}
              </h3>
              <div className="h-px border-b border-dotted border-[#C9A84C]/30 flex-grow mx-4 order-last md:order-none" />
              <span className="font-body text-[#C9A84C] font-semibold">₹{item.price}</span>
            </div>
            <p className="font-body text-[#7A6B5C] text-sm md:text-base leading-relaxed italic">
              {item.description}
            </p>
            {item.tags && (
              <div className="flex gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-body tracking-widest text-[#C9A84C] bg-[#C9A84C]/5 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
