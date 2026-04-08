"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/brp-portal-login")) return null;
  return <Navbar />;
}
