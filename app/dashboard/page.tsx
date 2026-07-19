import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCreditCard, IconDeviceMobile } from "@tabler/icons-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
      devices: true,
      payments: { orderBy: { date: "desc" }, take: 5 },
    },
  });

  const activeSubscription = user?.subscriptions.find((s) => s.status === "active");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Обзор</h1>

      <StatsOverview
        subscription={activeSubscription
          ? {
              plan: activeSubscription.plan,
              startDate: activeSubscription.startDate,
              endDate: activeSubscription.endDate,
              status: activeSubscription.status,
            }
          : null}
        devicesCount={user?.devices.length || 0}
        activeDevices={user?.devices.filter((d) => d.isActive).length || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconCreditCard className="w-5 h-5 text-accent-purple" />
              Последние платежи
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user?.payments.length === 0 ? (
              <p className="text-muted text-sm">Нет платежей</p>
            ) : (
              <div className="space-y-3">
                {user?.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {payment.plan === "30d"
                          ? "30 дней"
                          : payment.plan === "90d"
                          ? "90 дней"
                          : payment.plan === "180d"
                          ? "180 дней"
                          : "365 дней"}
                      </p>
                      <p className="text-xs text-dim">
                        {new Date(payment.date).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{payment.amount}₽</p>
                      <p className="text-xs text-accent-purple">{payment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active devices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconDeviceMobile className="w-5 h-5 text-accent-purple" />
              Активные устройства
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user?.devices.length === 0 ? (
              <p className="text-muted text-sm">Нет устройств</p>
            ) : (
              <div className="space-y-3">
                {user?.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{device.name}</p>
                      <p className="text-xs text-dim">{device.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          device.isActive ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      <span className="text-xs text-muted">
                        {device.isActive ? "Онлайн" : "Офлайн"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
