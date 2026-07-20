import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPlanName, PLAN_DEVICES, PLAN_LOCATIONS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconShieldCheck,
  IconDeviceMobile,
  IconWorld,
  IconUser,
  IconMail,
  IconKey,
  IconAlertTriangle,
  IconNews,
} from "@tabler/icons-react";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

async function fetchPublishedNews(): Promise<NewsItem[]> {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
    return news;
  } catch {
    return [];
  }
}

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
    ? Math.max(
        0,
        Math.ceil(
          (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        )
      )
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
    ? Math.floor(
        (now.getTime() - new Date(user.createdAt).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const news = await fetchPublishedNews();

  function formatDate(dateStr: string | Date) {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Обзор</h1>
        <p className="text-muted text-sm mt-1">
          Добро пожаловать{user?.name ? `, ${user.name}` : ""}!
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Profile */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-accent-purple/20 flex items-center justify-center">
                <IconUser className="h-6 w-6 text-accent-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {user?.name || "Пользователь"}
                </h3>
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
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("ru-RU")
                    : "—"}
                </span>
              </div>
            </div>

            {/* VPN Key */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <IconKey className="w-4 h-4 text-accent-purple" />
                <span className="text-xs text-muted">VPN ключ</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-border">
                <code className="flex-1 text-xs text-muted font-mono truncate">
                  asc_vpn_xxxx...xxxx
                </code>
                <button className="px-2 py-1 rounded bg-accent-purple/20 text-accent-purple text-xs hover:bg-accent-purple/30 transition-colors">
                  Копировать
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right - Subscription */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    subscription ? "bg-green-500/15" : "bg-gray-500/15"
                  }`}
                >
                  <IconShieldCheck
                    className={`h-5 w-5 ${
                      subscription ? "text-green-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {subscription
                      ? getPlanName(subscription.plan)
                      : "Нет подписки"}
                  </h3>
                  <p
                    className={`text-xs ${
                      subscription ? "text-green-400" : "text-gray-400"
                    }`}
                  >
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
                    <p className="text-xs text-muted mb-0.5">
                      Начало подписки
                    </p>
                    <p className="text-sm font-medium text-white">
                      {new Date(subscription.startDate).toLocaleDateString(
                        "ru-RU"
                      )}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <p className="text-xs text-muted mb-0.5">
                      Окончание подписки
                    </p>
                    <p className="text-sm font-medium text-white">
                      {endDate?.toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted">
                      Осталось {daysLeft} дн.
                    </span>
                    <span className="text-xs text-white">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
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
                    <p className="text-lg font-bold text-white">
                      {availableLocations}
                    </p>
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
      </div>

      {/* News / Updates */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <IconNews className="w-4 h-4 text-accent-purple" />
            <h3 className="font-medium text-white">Новости и обновления</h3>
          </div>
          {news.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              Пока нет новостей
            </p>
          ) : (
            <div className="space-y-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]"
                >
                  <div className="h-2 w-2 rounded-full bg-accent-purple mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white">{item.title}</p>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security tip */}
      <Card className="border-accent-purple/20">
        <CardContent className="p-4 flex items-start gap-3">
          <IconAlertTriangle className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-white font-medium mb-1">Совет по безопасности</p>
            <p className="text-muted">
              Используйте уникальный пароль для аккаунта и включите уведомления
              о входе в настройках.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
