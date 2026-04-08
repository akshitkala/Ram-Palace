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
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            Home
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        
        <li>
          <Link 
            href="/services" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            Services
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        
        {/* Events Dropdown - Logic handled by parent or CSS */}
        <li className="relative group h-full">
          <button className="relative text-white transition-all duration-300 hover:text-[#C9A84C] flex items-center gap-1 py-4 font-body text-[15px] font-medium">
            Events ↓
            <span className="absolute bottom-3 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <div className="absolute top-full left-0 w-64 bg-[#FAF7F2] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-[#E8E0D0]/50">
            <div className="py-2">
              <Link
                href="/events/weddings"
                className="block px-6 py-4 text-[13px] text-[#4A4A4A] hover:text-[#C9A84C] border-l-0 hover:border-l-2 border-[#C9A84C] transition-all duration-200"
              >
                Weddings
              </Link>
              <Link
                href="/events/corporate"
                className="block px-6 py-4 text-[13px] text-[#4A4A4A] hover:text-[#C9A84C] border-l-0 hover:border-l-2 border-[#C9A84C] transition-all duration-200"
              >
                Corporate
              </Link>
              <Link
                href="/events/private-parties"
                className="block px-6 py-4 text-[13px] text-[#4A4A4A] hover:text-[#C9A84C] border-l-0 hover:border-l-2 border-[#C9A84C] transition-all duration-200"
              >
                Private parties
              </Link>
            </div>
          </div>
        </li>
        
        <li>
          <Link 
            href="/catering" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            Catering
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/menu" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            Menu
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/gallery" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            Gallery
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/about" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            About
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link 
            href="/contact" 
            className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group font-body text-[15px] font-medium"
          >
            Contact
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
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
