"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  IconShield,
  IconDashboard,
  IconUsers,
  IconServer,
  IconCoins,
  IconNews,
  IconFileText,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Дашборд", icon: IconDashboard, exact: true },
  { href: "/admin/users", label: "Пользователи", icon: IconUsers },
  { href: "/admin/servers", label: "Серверы", icon: IconServer },
  { href: "/admin/finance", label: "Финансы", icon: IconCoins },
  { href: "/admin/news", label: "Новости", icon: IconNews },
  { href: "/admin/logs", label: "Логи", icon: IconFileText },
  { href: "/admin/settings", label: "Настройки", icon: IconSettings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative w-64 bg-[#0c0c16] border-r border-[#1a1a2e] min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <Link href="/admin" className="flex items-center gap-2 mb-8">
        <IconShield className="h-6 w-6 text-accent-purple" />
        <span className="text-lg font-bold gradient-text">ASCEND.VPN Admin</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-purple/20 text-accent-purple"
                  : "text-gray-400 hover:text-white hover:bg-[#14142a]"
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
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white hover:bg-[#14142a]"
      >
        <IconLogout className="h-5 w-5" />
        Выйти
      </button>
    </aside>
  );
}
