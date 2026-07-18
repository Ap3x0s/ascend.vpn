import Link from "next/link";
import { IconShield } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <Card className="rounded-none border-x-0 border-b-0 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <IconShield className="h-5 w-5 text-accent-purple" />
              <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Безопасный и быстрый VPN-сервис с военным шифрованием для вашей
              конфиденциальности.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white">Навигация</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Тарифы
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white">Контакты</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>support@ascendvpn.com</li>
              <li>Telegram: @ascendvpn</li>
            </ul>
          </div>

          {/* Legal placeholder */}
          <div>
            <h4 className="text-sm font-semibold text-white">Правовая информация</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-gray-500">
          &copy; 2026 ASCEND.VPN. Все права защищены.
        </p>
      </div>
    </Card>
  );
}
