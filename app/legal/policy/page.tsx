import Link from "next/link";
import { IconArrowLeft, IconShield } from "@tabler/icons-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-white transition-colors">
            <IconArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-semibold">Политика конфиденциальности</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <IconShield className="h-8 w-8 text-accent-purple" />
          <h2 className="text-2xl font-bold">ASCEND.VPN</h2>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted">
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">1. Общие положения</h3>
            <p className="leading-relaxed">
              Настоящая Политика конфиденциальности описывает, как ASCEND.VPN собирает, использует и защищает информацию при использовании нашего VPN-сервиса. Используя наш сервис, вы соглашаетесь с условиями данной политики.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">2. Сбор информации</h3>
            <p className="leading-relaxed mb-4">
              Мы собираем минимально необходимую информацию для предоставления услуги:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Email адрес</strong> — для регистрации и связи с вами</li>
              <li><strong className="text-white">Данные оплаты</strong> — обрабатываются платёжной системой, мы не храним данные карт</li>
              <li><strong className="text-white">Данные об устройствах</strong> — только для ограничения количества подключений</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">3. Что мы НЕ собираем</h3>
            <p className="leading-relaxed mb-4">
              Мы гарантируем, что <strong className="text-accent-purple">не собираем и не храним</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Историю посещённых сайтов</li>
              <li>Данные о вашем трафике</li>
              <li>IP-адреса подключений</li>
              <li>DNS-запросы</li>
              <li>Любую информацию о вашей онлайн-активности</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">4. Использование информации</h3>
            <p className="leading-relaxed">
              Собранная информация используется исключительно для: предоставления VPN-услуг, обработки платежей, связи с вами по вопросам сервиса и улучшения качества обслуживания.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">5. Защита данных</h3>
            <p className="leading-relaxed">
              Мы применяем современные методы защиты информации, включая шифрование SSL/TLS для передачи данных и безопасное хранение паролей с использованием алгоритмов хеширования. Мы не несём ответственности за утечку данных, произошедшую по вине пользователя (например, утечка пароля).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">6. Передача данных третьим лицам</h3>
            <p className="leading-relaxed">
              Мы не передаём вашу информацию третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации, а также платёжных систем для обработки транзакций.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">7. Cookies</h3>
            <p className="leading-relaxed">
              Мы используем cookies исключительно для технических целей (аутентификация сессии). Мы не используем рекламные cookies и не отслеживаем пользователей.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">8. Права пользователей</h3>
            <p className="leading-relaxed">
              Вы имеете право: запросить информацию о хранящихся данных, потребовать удаления аккаунта и всех связанных данных, отказаться от получения маркетинговых рассылок.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">9. Контакты</h3>
            <p className="leading-relaxed">
              По вопросам конфиденциальности обращайтесь: support@ascendvpn.com или Telegram: @ascendvpn
            </p>
          </section>

          <section>
            <p className="text-sm text-dim">
              Последнее обновление: 18 июля 2026 г.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
