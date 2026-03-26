"use client";

export default function MenuTicker({ tickerRef, categories }) {
  const TICKER = categories.map(c => c.label);
  return (
    <div className="mh-sentinel bg-[#2B1810] py-3.5 overflow-hidden border-y border-[#C9A84C]/10">
      <div ref={tickerRef} className="flex w-max" aria-hidden="true">
        {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-body text-[10px] tracking-[4px] uppercase text-[#C9A84C]/45 px-8">{item}</span>
            <span className="text-[#C9A84C]/20 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
