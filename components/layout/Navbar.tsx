"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IconShield, IconMenu2, IconX, IconUser, IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const navLinks = [
  { href: "#features", label: "Преимущества" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#faq", label: "Вопросы" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#08080f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <IconShield className="h-6 w-6 text-accent-purple" />
          <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link px-4 py-2 text-sm text-muted"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-accent-purple/20 flex items-center justify-center">
                  <IconUser className="h-4 w-4 text-accent-purple" />
                </div>
                <span className="max-w-[120px] truncate">
                  {session.user.email?.split("@")[0]}
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                <IconLogout className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm text-muted transition-colors hover:text-white"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-accent-purple to-accent-violet px-5 py-2 text-sm font-semibold text-[#08080f] shadow-glow-sm transition-all hover:scale-105"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#08080f]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link px-4 py-2 text-sm text-muted"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-white/5">
              {session?.user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    <IconUser className="h-4 w-4" />
                    {session.user.email?.split("@")[0]}
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted hover:text-white"
                  >
                    <IconLogout className="h-4 w-4" />
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl px-4 py-2.5 text-center text-sm text-muted transition-colors hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-xl bg-gradient-to-r from-accent-purple to-accent-violet px-4 py-2.5 text-center text-sm font-semibold text-[#08080f]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
