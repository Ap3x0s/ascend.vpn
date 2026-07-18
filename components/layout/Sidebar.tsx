"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Shield,
  LayoutDashboard,
  Smartphone,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Обзор", icon: LayoutDashboard },
  { href: "/dashboard/devices", label: "Устройства", icon: Smartphone },
  { href: "/dashboard/payments", label: "История оплат", icon: CreditCard },
  { href: "/dashboard/settings", label: "Настройки", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative w-64 bg-card border-r border-border min-h-screen p-4">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <Shield className="h-6 w-6 text-accent-purple" />
        <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-purple/20 text-accent-purple"
                  : "text-gray-400 hover:text-white hover:bg-card-hover"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white hover:bg-card-hover"
      >
        <LogOut className="h-5 w-5" />
        Выйти
      </button>
    </aside>
  );
}
