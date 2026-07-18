"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Преимущества" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#faq", label: "Вопросы" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent-purple" />
          <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Войти
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Регистрация</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  Войти
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">
                  Регистрация
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
