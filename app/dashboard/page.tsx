import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPlanName, PLAN_DEVICES, PLAN_LOCATIONS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconShieldCheck,
  IconClock,
  IconDeviceMobile,
  IconWorld,
  IconUser,
  IconMail,
  IconKey,
  IconDownload,
  IconUpload,
  IconActivity,
  IconWifi,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
      devices: true,
    },
  });

  const subscription = user?.subscriptions.find((s) => s.status === "active");
  const now = new Date();
  const endDate = subscription ? new Date(subscription.endDate) : null;
  const daysLeft = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const totalDays = subscription
    ? Math.ceil(
        (new Date(subscription.endDate).getTime() -
          new Date(subscription.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 30;
  const progress = Math.min(100, (daysLeft / totalDays) * 100);

  const maxDevices = subscription ? PLAN_DEVICES[subscription.plan] || 5 : 5;
  const availableLocations = subscription
    ? (PLAN_LOCATIONS[subscription.plan] || []).length
    : 0;

  const memberSince = user?.createdAt
    ? Math.floor((now.getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Mock connection status
  const isConnected = true;
  const currentServer = "🇱🇻 Рига, Латвия";
  const currentPing = 12;

  // Mock traffic for current period
  const trafficUsed = 45.2;
  const trafficLimit = "∞";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Обзор</h1>
        <p className="text-muted text-sm mt-1">
          Добро пожаловать{user?.name ? `, ${user.name}` : ""}!
        </p>
      </div>

      {/* Connection status banner */}
      <Card className={isConnected ? "border-green-500/30 bg-green-500/5" : ""}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
              <div>
                <p className="font-medium text-white">
                  {isConnected ? "Подключено" : "Не подключено"}
                </p>
                {isConnected && (
                  <p className="text-sm text-muted flex items-center gap-1">
                    <IconWorld className="w-3 h-3" />
                    {currentServer} • {currentPing}ms
                  </p>
                )}
              </div>
            </div>
            {isConnected && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <IconWifi className="w-4 h-4" />
                Защищено
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-accent-purple/20 flex items-center justify-center">
                  <IconUser className="h-6 w-6 text-accent-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{user?.name || "Пользователь"}</h3>
                  <p className="text-xs text-muted flex items-center gap-1">
                    <IconMail className="w-3 h-3" />
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5">
                  <span className="text-muted">Участник</span>
                  <span className="text-white">{memberSince} дн.</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted">Регистрация</span>
                  <span className="text-white">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ru-RU") : "—"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick access key */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <IconKey className="w-4 h-4 text-accent-purple" />
                <span className="text-sm font-medium text-white">VPN ключ</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-border">
                <code className="flex-1 text-xs text-muted font-mono truncate">
                  asc_vpn_xxxx...xxxx
                </code>
                <button className="px-3 py-1.5 rounded-md bg-accent-purple/20 text-accent-purple text-xs font-medium hover:bg-accent-purple/30 transition-colors">
                  Копировать
                </button>
              </div>
              <p className="text-xs text-dim mt-2">
                Используйте для подключения через Hiddify
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Middle column - Subscription */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${subscription ? "bg-green-500/15" : "bg-gray-500/15"}`}>
                    <IconShieldCheck className={`h-5 w-5 ${subscription ? "text-green-400" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {subscription ? getPlanName(subscription.plan) : "Нет подписки"}
                    </h3>
                    <p className={`text-xs ${subscription ? "text-green-400" : "text-gray-400"}`}>
                      {subscription ? "Активна" : "Не активна"}
                    </p>
                  </div>
                </div>
                {!subscription && (
                  <Link
                    href="/#pricing"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-violet text-white text-sm font-medium hover:scale-105 transition-transform"
                  >
                    Купить
                  </Link>
                )}
              </div>

              {subscription && (
                <>
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-lg bg-white/[0.03]">
                      <p className="text-xs text-muted mb-0.5">Начало</p>
                      <p className="text-sm font-medium text-white">
                        {new Date(subscription.startDate).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03]">
                      <p className="text-xs text-muted mb-0.5">Окончание</p>
                      <p className="text-sm font-medium text-white">
                        {endDate?.toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted">Осталось {daysLeft} дн.</span>
                      <span className="text-xs text-white">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white/[0.03] text-center">
                      <IconDeviceMobile className="w-4 h-4 text-accent-blue mx-auto mb-1" />
                      <p className="text-lg font-bold text-white">
                        {user?.devices.length || 0}/{maxDevices}
                      </p>
                      <p className="text-xs text-muted">Устройства</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] text-center">
                      <IconWorld className="w-4 h-4 text-accent-purple mx-auto mb-1" />
                      <p className="text-lg font-bold text-white">{availableLocations}</p>
                      <p className="text-xs text-muted">Локации</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] text-center">
                      <IconKey className="w-4 h-4 text-accent-violet mx-auto mb-1" />
                      <p className="text-lg font-bold text-white">256</p>
                      <p className="text-xs text-muted">Бит</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Traffic usage */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IconDownload className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm font-medium text-white">Трафик за период</span>
                </div>
                <span className="text-xs text-muted">Обновлено 5 мин назад</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <IconDownload className="w-3 h-3 text-accent-blue" />
                    <span className="text-xs text-muted">Загрузка</span>
                  </div>
                  <p className="text-xl font-bold text-white">45.2 <span className="text-sm font-normal text-muted">ГБ</span></p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <IconUpload className="w-3 h-3 text-accent-violet" />
                    <span className="text-xs text-muted">Отдача</span>
                  </div>
                  <p className="text-xl font-bold text-white">12.8 <span className="text-sm font-normal text-muted">ГБ</span></p>
                </div>
              </div>

              <div className="h-2 rounded-full bg-border overflow-hidden flex">
                <div className="bg-accent-blue" style={{ width: "78%" }} />
                <div className="bg-accent-violet" style={{ width: "22%" }} />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-muted">78% загрузка</span>
                <span className="text-xs text-muted">Всего: 58.0 ГБ</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick links + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick links */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-medium text-white mb-4">Быстрый доступ</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/locations">
                <div className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <IconWorld className="w-5 h-5 text-accent-purple mb-2" />
                  <p className="text-sm font-medium text-white">Локации</p>
                  <p className="text-xs text-muted">Статистика →</p>
                </div>
              </Link>
              <Link href="/dashboard/devices">
                <div className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <IconDeviceMobile className="w-5 h-5 text-accent-blue mb-2" />
                  <p className="text-sm font-medium text-white">Устройства</p>
                  <p className="text-xs text-muted">Управление →</p>
                </div>
              </Link>
              <Link href="/dashboard/payments">
                <div className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <IconClock className="w-5 h-5 text-accent-violet mb-2" />
                  <p className="text-sm font-medium text-white">Платежи</p>
                  <p className="text-xs text-muted">История →</p>
                </div>
              </Link>
              <Link href="/dashboard/settings">
                <div className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <IconKey className="w-5 h-5 text-accent-cyan mb-2" />
                  <p className="text-sm font-medium text-white">Настройки</p>
                  <p className="text-xs text-muted">Профиль →</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <IconActivity className="w-4 h-4 text-accent-purple" />
              <h3 className="font-medium text-white">Последняя активность</h3>
            </div>
            <div className="space-y-3">
              {[
                { time: "14:32", event: "Подключение к серверу", location: "🇱🇻 Рига", status: "success" },
                { time: "12:15", event: "Вход в аккаунт", location: "Новое устройство", status: "info" },
                { time: "10:00", event: "Подключение отключено", location: "🇩🇪 Франкфурт", status: "neutral" },
                { time: "Вчера", event: "Оплата подписки", location: "1 499₽", status: "success" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                    activity.status === "success" ? "bg-green-400" :
                    activity.status === "info" ? "bg-accent-blue" : "bg-gray-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.event}</p>
                    <p className="text-xs text-muted">{activity.location} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security tip */}
      <Card className="border-accent-purple/20">
        <CardContent className="p-4 flex items-start gap-3">
          <IconAlertTriangle className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-white font-medium mb-1">Совет по безопасности</p>
            <p className="text-muted">
              Используйте уникальный пароль для аккаунта и включите уведомления о входе в настройках.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
