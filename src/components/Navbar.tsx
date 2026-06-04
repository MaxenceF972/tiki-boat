"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/excursions", label: "Excursions" },
  { href: "/galerie",    label: "Galerie" },
  { href: "/avis",       label: "Avis" },
  { href: "/blog",       label: "Blog" },
  { href: "/contact",    label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tiki-ocean border-b border-white/8 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Mobile: burger gauche · logo centre · réserver droite */}
        <div className="grid grid-cols-[1fr_auto_1fr] md:flex md:items-center md:justify-between h-16 sm:h-[68px] items-center">

          {/* GAUCHE — burger mobile / logo desktop */}
          <div className="flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu"
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:border-tiki-gold hover:text-tiki-gold transition-all duration-200 shrink-0">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="hidden md:block shrink-0">
              <Image src="/logo.png" alt="Tiki Boat" width={160} height={54}
                className="h-10 sm:h-12 w-auto object-contain" priority />
            </Link>
          </div>

          {/* CENTRE — logo mobile uniquement */}
          <Link href="/" className="md:hidden shrink-0">
            <Image src="/logo.png" alt="Tiki Boat" width={160} height={54}
              className="h-10 w-auto object-contain" priority />
          </Link>

          {/* Nav centré — desktop uniquement */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group py-2">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-tiki-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* DROITE — réserver (toujours) + tel (desktop) */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a href="tel:+590690495848"
              className="hidden lg:flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <Phone size={13} className="text-tiki-gold" />
              <span>0690 49 58 48</span>
            </a>
            <Link href="/reservation"
              className="inline-flex items-center bg-tiki-gold hover:bg-tiki-gold-dark text-tiki-ocean text-xs sm:text-sm font-bold py-2 px-3 sm:px-5 rounded-full transition-all duration-200 whitespace-nowrap min-h-[36px]">
              Réserver
            </Link>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-tiki-ocean border-t border-white/8">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-white/75 hover:text-white font-medium py-3.5 px-3 rounded-xl hover:bg-white/5 transition-all duration-200 min-h-[44px]">
                {link.label}
                <span className="text-white/25 text-sm">›</span>
              </Link>
            ))}

            <div className="pt-3 space-y-2 border-t border-white/8 mt-2">
              <Link href="/reservation" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full bg-tiki-gold text-tiki-ocean font-bold py-4 rounded-full text-sm min-h-[52px]">
                Réserver maintenant
              </Link>
              <a href="tel:+590690495848"
                className="flex items-center justify-center gap-2 text-white/50 text-sm py-3 min-h-[44px]">
                <Phone size={14} className="text-tiki-gold" />
                +590 690 49 58 48
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
