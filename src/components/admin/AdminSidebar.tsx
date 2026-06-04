"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarDays,
  ListOrdered,
  Images,
  FileText,
  Anchor,
  BookOpen,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin",              icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/admin/reservations", icon: ListOrdered,     label: "Réservations" },
  { href: "/admin/calendar",     icon: CalendarDays,    label: "Calendrier"   },
  { href: "/admin/excursions",   icon: Anchor,          label: "Excursions"   },
  { href: "/admin/blog",         icon: BookOpen,        label: "Blog"         },
  { href: "/admin/contenu",      icon: FileText,        label: "Contenu"      },
  { href: "/admin/galerie",      icon: Images,          label: "Galerie"      },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-[#111111] border-r border-white/5 h-screen">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/5">
        <Image
          src="/logo.png" alt="Tiki Boat"
          width={110} height={36}
          className="h-8 w-auto object-contain"
        />
        <p className="text-white/20 text-[10px] font-semibold tracking-[0.15em] uppercase mt-2">
          Administration
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-tiki-gold text-[#111111]"
                  : "text-white/45 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={active ? "text-[#111111]" : "text-white/35"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bas de sidebar */}
      <div className="px-3 pb-4 pt-3 border-t border-white/5 space-y-0.5">
        <a
          href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
        >
          <ExternalLink size={14} />
          Voir le site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-500/8 transition-all"
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
