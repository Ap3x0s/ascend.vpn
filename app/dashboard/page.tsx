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
  IconCalendar,
  IconKey,
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

  // Days since registration
  const memberSince = user?.createdAt
    ? Math.floor((now.getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-6">
      {/* Profile & Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-accent-purple/20 flex items-center justify-center">
                <IconUser className="h-8 w-8 text-accent-purple" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{user?.name || "Пользователь"}</h2>
                <p className="text-sm text-muted flex items-center gap-1">
                  <IconMail className="w-3 h-3" />
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted">Участник</span>
                <span className="text-white">{memberSince} дн.</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted">Регистрация</span>
                <span className="text-white">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("ru-RU")
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted">ID</span>
                <span className="text-white font-mono text-xs">
                  {user?.id?.slice(0, 8)}...
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${subscription ? "bg-green-500/15" : "bg-gray-500/15"}`}>
                  <IconShieldCheck className={`h-6 w-6 ${subscription ? "text-green-400" : "text-gray-400"}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {subscription ? getPlanName(subscription.plan) : "Нет подписки"}
                  </h3>
                  <p className={`text-sm ${subscription ? "text-green-400" : "text-gray-400"}`}>
                    {subscription ? "Активна" : "Не активна"}
                  </p>
                </div>
              </div>
              {!subscription && (
                <Link
                  href="/#pricing"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-violet text-white text-sm font-medium hover:scale-105 transition-transform"
                >
                  Купить подписку
                </Link>
              )}
            </div>

            {subscription && (
              <>
                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <p className="text-xs text-muted mb-1">Начало</p>
                    <p className="text-sm font-medium text-white">
                      {new Date(subscription.startDate).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <p className="text-xs text-muted mb-1">Окончание</p>
                    <p className="text-sm font-medium text-white">
                      {endDate?.toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted">Осталось {daysLeft} дн.</span>
                    <span className="text-sm text-white">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <IconDeviceMobile className="w-5 h-5 text-accent-blue mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">
                      {user?.devices.length || 0}/{maxDevices}
                    </p>
                    <p className="text-xs text-muted">Устройства</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <IconWorld className="w-5 h-5 text-accent-purple mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{availableLocations}</p>
                    <p className="text-xs text-muted">Локации</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <IconKey className="w-5 h-5 text-accent-violet mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">AES-256</p>
                    <p className="text-xs text-muted">Шифрование</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/locations">
          <Card className="hover:border-accent-purple/30 transition-colors cursor-pointer h-full">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-purple/15">
                  <IconWorld className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <p className="font-medium text-white">Статистика локаций</p>
                  <p className="text-xs text-muted">Трафик по серверам →</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/devices">
          <Card className="hover:border-accent-purple/30 transition-colors cursor-pointer h-full">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-blue/15">
                  <IconDeviceMobile className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="font-medium text-white">Мои устройства</p>
                  <p className="text-xs text-muted">Управление устройствами →</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings">
          <Card className="hover:border-accent-purple/30 transition-colors cursor-pointer h-full">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-violet/15">
                  <IconKey className="w-5 h-5 text-accent-violet" />
                </div>
                <div>
                  <p className="font-medium text-white">Настройки</p>
                  <p className="text-xs text-muted">Профиль и безопасность →</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
