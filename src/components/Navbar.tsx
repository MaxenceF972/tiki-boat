"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const NAV_LINKS = [
  { href: "/excursions", key: "excursions" },
  { href: "/galerie",    key: "galerie" },
  { href: "/avis",       key: "avis" },
  { href: "/blog",       key: "blog" },
  { href: "/contact",    key: "contact" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t       = useTranslations("nav");
  const locale  = useLocale();
  const pathname = usePathname();
  const router   = useRouter();

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tiki-ocean shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto_1fr] md:flex md:items-center md:justify-between h-16 sm:h-[68px] items-center">

          {/* Logo */}
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

          {/* Logo mobile */}
          <Link href="/" className="md:hidden shrink-0">
            <Image src="/logo.png" alt="Tiki Boat" width={160} height={54}
              className="h-10 w-auto object-contain" priority />
          </Link>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group py-2">
                {t(link.key)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-tiki-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Droite : tel + réserver + langue */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a href="tel:+590690495848"
              className="hidden lg:flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <Phone size={13} className="text-tiki-gold" />
              <span>0690 49 58 48</span>
            </a>

            {/* Sélecteur langue */}
            <button
              onClick={() => switchLocale(locale === "fr" ? "en" : "fr")}
              className="hidden md:flex items-center gap-1 text-white/60 hover:text-white text-xs font-bold border border-white/20 hover:border-tiki-gold rounded-full px-2.5 py-1 transition-all"
              aria-label="Switch language"
            >
              {locale === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
            </button>

            <Link href="/reservation"
              className="inline-flex items-center bg-tiki-gold hover:bg-tiki-gold-dark text-tiki-ocean text-xs sm:text-sm font-bold py-2 px-3 sm:px-5 rounded-full transition-all duration-200 whitespace-nowrap min-h-[36px]">
              {t("reserver")}
            </Link>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-tiki-ocean border-t border-white/8">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-white/75 hover:text-white font-medium py-3.5 px-3 rounded-xl hover:bg-white/5 transition-all duration-200 min-h-[44px]">
                {t(link.key)}
                <span className="text-white/25 text-sm">›</span>
              </Link>
            ))}

            <div className="pt-3 space-y-2 border-t border-white/8 mt-2">
              <Link href="/reservation" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full bg-tiki-gold text-tiki-ocean font-bold py-4 rounded-full text-sm min-h-[52px]">
                {t("reserver")}
              </Link>
              <a href="tel:+590690495848"
                className="flex items-center justify-center gap-2 text-white/50 text-sm py-3 min-h-[44px]">
                <Phone size={14} className="text-tiki-gold" />
                +590 690 49 58 48
              </a>
              {/* Sélecteur langue mobile */}
              <button
                onClick={() => { switchLocale(locale === "fr" ? "en" : "fr"); setIsOpen(false); }}
                className="flex items-center justify-center w-full gap-2 text-white/60 hover:text-white text-sm py-3 border border-white/10 rounded-xl transition-colors"
              >
                {locale === "fr" ? "🇬🇧 Switch to English" : "🇫🇷 Passer en Français"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
