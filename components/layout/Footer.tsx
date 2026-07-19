import Link from "next/link";
import { IconShield } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a12]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <IconShield className="h-5 w-5 text-accent-purple" />
              <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Безопасный и быстрый VPN-сервис для защиты вашей
              конфиденциальности в интернете.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white">Навигация</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#pricing" className="text-sm text-muted transition-colors hover:text-white">
                  Тарифы
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted transition-colors hover:text-white">
                  Войти
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white">Контакты</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>support@ascendvpn.com</li>
              <li>Telegram: @ascendvpn</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white">Правовая информация</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/legal/policy" className="transition-colors hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="transition-colors hover:text-white">
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 h-px bg-white/5" />

        <p className="text-center text-sm text-dim">
          &copy; 2026 ASCEND.VPN. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
