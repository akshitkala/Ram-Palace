import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <Link 
        href="/" 
        className="nav-logo text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#C9A84C] tracking-wider whitespace-nowrap origin-left will-change-transform"
      >
        Basti Ram Palace
      </Link>

      <ul className="hidden lg:flex gap-8 items-center">
        <li>
          <Link 
            href="/" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        
        {/* Events Dropdown - Logic handled by parent or CSS */}
        <li className="relative group h-full">
          <button className="relative text-white transition-all duration-300 hover:text-[#C9A84C] flex items-center gap-1 py-4">
            Events
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          {/* Dropdown Menu - Simplified for SC, CSS can handle basic visibility if needed, 
              but the audit suggested splitting for hydration speed. */}
          <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="py-2">
              <Link
                href="/events/weddings"
                className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
              >
                Weddings & Receptions
              </Link>
              <Link
                href="/events/corporate-events"
                className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
              >
                Corporate Events
              </Link>
              <Link
                href="/events/private-parties"
                className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
              >
                Private Parties
              </Link>
            </div>
          </div>
        </li>
        
        <li>
          <Link 
            href="/catering" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
          >
            Catering
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/Menu" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
          >
            Menu
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/gallery" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
          >
            Gallery
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/contact" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      </ul>

      <Link 
        href="/contact" 
        className="hidden lg:block ml-4"
      >
        <button className="
          bg-[#C9A84C] text-[#1C1C1E]
          px-6 py-2.5
          text-xs tracking-[2px] uppercase font-medium
          transition-all duration-300
          hover:bg-[#b8963e] 
          hover:scale-105 
          hover:shadow-[0_4px_20px_rgba(201,168,76,0.4)]
        ">
          Reserve Now
        </button>
      </Link>
    </>
  );
}
