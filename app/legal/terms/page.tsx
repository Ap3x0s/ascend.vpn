import Link from "next/link";
import { IconArrowLeft, IconFileText } from "@tabler/icons-react";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-white transition-colors">
            <IconArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-semibold">Пользовательское соглашение</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <IconFileText className="h-8 w-8 text-accent-purple" />
          <h2 className="text-2xl font-bold">ASCEND.VPN</h2>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted">
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">1. Общие условия</h3>
            <p className="leading-relaxed">
              Настоящее Пользовательское соглашение (далее — «Соглашение») является договором между вами (далее — «Пользователь») и ASCEND.VPN (далее — «Сервис») об условиях использования VPN-сервиса. Регистрируясь и используя сервис, вы подтверждаете согласие с данными условиями.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">2. Описание услуги</h3>
            <p className="leading-relaxed">
              Сервис предоставляет доступ к виртуальным частным сетям (VPN) для защиты интернет-трафика пользователей. Сервис включает в себя: доступ к VPN-серверам, личный кабинет для управления подпиской и подключёнными устройствами.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">3. Регистрация и аккаунт</h3>
            <p className="leading-relaxed mb-4">
              Для использования сервиса необходимо зарегистрировать аккаунт. Пользователь несёт ответственность за: сохранность своих учётных данных, все действия, совершённые под его аккаунтом, немедленное уведомление сервиса о несанкционированном доступе.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">4. Подписка и оплата</h3>
            <p className="leading-relaxed mb-4">
              Сервис предоставляется на условиях предоплаты. Оплата производится через доступные способы: банковские карты, СБП, криптовалюта. Стоимость указана на странице тарифов и может изменяться. При продлении время добавляется к текущему периоду.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">5. Использование сервиса</h3>
            <p className="leading-relaxed mb-4">
              Пользователь обязуется: использовать сервис только в законных целях, не использовать сервис для.activities, нарушающих законодательство, не передавать доступ к аккаунту третьим лицам, не пытаться обойти ограничения сервиса.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">6. Ограничения</h3>
            <p className="leading-relaxed mb-4">
              Запрещается использование сервиса для: распространения вредоносного ПО, ДДoS-атак, спама, незаконного контента, коммерческого использования без соглашения. Сервис не гарантирует доступ к определённым ресурсам — доступность зависит от сторонних провайдеров.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">7. Ответственность</h3>
            <p className="leading-relaxed">
              Сервис предоставляется «как есть». Мы не несём ответственности за: скорость подключения (зависит от провайдера и расстояния до сервера), доступность конкретных ресурсов, действия третьих лиц. Мы не гарантируем 100% анонимность — для максимальной безопасности рекомендуется additional меры.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">8. Возврат средств</h3>
            <p className="leading-relaxed">
              Возврат средств возможен в течение 7 дней с момента оплаты при условии, что сервис не использовался. Для запроса возврата обращайтесь в поддержку. Возврат за неиспользованный период активной подписки не производится.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">9. Изменение условий</h3>
            <p className="leading-relaxed">
              Мы оставляем за собой право изменять данное соглашение. При существенных изменениях мы уведомим вас по email. Продолжение использования сервиса после изменений означает согласие с новыми условиями.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">10. Прекращение использования</h3>
            <p className="leading-relaxed">
              Вы можете прекратить использование сервиса в любое время. Для этого просто перестаньте пользоваться сервисом. Возврат средств за оставшийся период подписки не производится.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">11. Контакты</h3>
            <p className="leading-relaxed">
              По вопросам соглашения обращайтесь: support@ascendvpn.com или Telegram: @ascendvpn
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
