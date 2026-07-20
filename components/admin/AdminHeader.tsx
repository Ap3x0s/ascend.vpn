"use client";

import { useSession } from "next-auth/react";
import { IconBell, IconUser } from "@tabler/icons-react";

const pageTitles: Record<string, string> = {
  "/admin": "Дашборд",
  "/admin/users": "Пользователи",
  "/admin/servers": "Серверы",
  "/admin/finance": "Финансы",
  "/admin/news": "Новости",
  "/admin/logs": "Логи",
  "/admin/settings": "Настройки",
};

interface AdminHeaderProps {
  pathname: string;
}

export function AdminHeader({ pathname }: AdminHeaderProps) {
  const { data: session } = useSession();

  const title = pageTitles[pathname] || "Админ-панель";

  return (
    <header className="h-16 border-b border-[#1a1a2e] bg-[#0c0c16] px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#14142a] transition-colors">
          <IconBell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-purple" />
        </button>

        {/* Admin email */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent-purple/20 flex items-center justify-center">
            <IconUser className="h-4 w-4 text-accent-purple" />
          </div>
          <span className="text-sm text-gray-400">
            {session?.user?.email || "admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
