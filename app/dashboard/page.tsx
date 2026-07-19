import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPlanName, PLAN_DEVICES, PLAN_LOCATIONS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconShieldCheck,
  IconClock,
  IconDeviceMobile,
  IconWorld,
  IconCreditCard,
  IconArrowRight,
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
      payments: { orderBy: { date: "desc" }, take: 3 },
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

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Обзор</h1>
        <p className="text-muted text-sm mt-1">
          Добро пожаловать{user?.name ? `, ${user.name}` : ""}!
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Subscription status */}
        <Card className={subscription ? "border-green-500/30" : ""}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${subscription ? "bg-green-500/15" : "bg-gray-500/15"}`}>
                <IconShieldCheck className={`w-5 h-5 ${subscription ? "text-green-400" : "text-gray-400"}`} />
              </div>
              <span className="text-sm text-muted">Подписка</span>
            </div>
            <p className="text-xl font-bold text-white">
              {subscription ? getPlanName(subscription.plan) : "Не активна"}
            </p>
            {subscription && (
              <p className="text-xs text-muted mt-1">
                {new Date(subscription.startDate).toLocaleDateString("ru-RU")} —{" "}
                {endDate?.toLocaleDateString("ru-RU")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Days left */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent-purple/15">
                <IconClock className="w-5 h-5 text-accent-purple" />
              </div>
              <span className="text-sm text-muted">Осталось</span>
            </div>
            <p className="text-xl font-bold text-white">{daysLeft} дн.</p>
            <div className="mt-3 h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted mt-2">{Math.round(progress)}% использовано</p>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent-blue/15">
                <IconDeviceMobile className="w-5 h-5 text-accent-blue" />
              </div>
              <span className="text-sm text-muted">Устройства</span>
            </div>
            <p className="text-xl font-bold text-white">
              {user?.devices.length || 0} / {maxDevices}
            </p>
            <p className="text-xs text-muted mt-1">
              {user?.devices.filter((d) => d.isActive).length || 0} активных
            </p>
          </CardContent>
        </Card>

        {/* Locations */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent-violet/15">
                <IconWorld className="w-5 h-5 text-accent-violet" />
              </div>
              <span className="text-sm text-muted">Локации</span>
            </div>
            <p className="text-xl font-bold text-white">{availableLocations}</p>
            <Link
              href="/dashboard/locations"
              className="text-xs text-accent-purple hover:underline mt-1 inline-flex items-center gap-1"
            >
              Подробнее <IconArrowRight className="w-3 h-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent payments */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <IconCreditCard className="w-4 h-4 text-accent-purple" />
                Последние платежи
              </CardTitle>
              <Link href="/dashboard/payments" className="text-xs text-accent-purple hover:underline">
                Все →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {user?.payments && user.payments.length > 0 ? (
              <div className="space-y-2">
                {user.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm text-white">{getPlanName(payment.plan)}</p>
                      <p className="text-xs text-dim">
                        {new Date(payment.date).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{payment.amount}₽</p>
                      <p className="text-xs text-green-400">Оплачено</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted py-4 text-center">Нет платежей</p>
            )}
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <IconDeviceMobile className="w-4 h-4 text-accent-purple" />
                Устройства
              </CardTitle>
              <Link href="/dashboard/devices" className="text-xs text-accent-purple hover:underline">
                Все →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {user?.devices && user.devices.length > 0 ? (
              <div className="space-y-2">
                {user.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          device.isActive ? "bg-green-400" : "bg-gray-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm text-white">{device.name}</p>
                        <p className="text-xs text-dim">{device.type}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted">
                      {device.isActive ? "Онлайн" : "Офлайн"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted py-4 text-center">Нет устройств</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
