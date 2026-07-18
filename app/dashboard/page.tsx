import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PLAN_NAMES: Record<string, string> = {
  "30d": "30 дней",
  "90d": "90 дней",
  "180d": "180 дней",
  "365d": "365 дней",
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  completed: "bg-green-500",
  pending: "bg-yellow-500",
  failed: "bg-red-500",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
      devices: true,
      payments: { orderBy: { date: "desc" }, take: 5 },
    },
  });

  if (!user) redirect("/login");

  const activeSubscription =
    user.subscriptions.find((s) => s.status === "active") ?? user.subscriptions[0] ?? null;

  const devicesCount = user.devices.length;
  const activeDevices = user.devices.filter((d) => d.isActive).length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Обзор</h1>

      <StatsOverview
        subscription={
          activeSubscription
            ? {
                plan: activeSubscription.plan,
                startDate: activeSubscription.startDate,
                endDate: activeSubscription.endDate,
                status: activeSubscription.status,
              }
            : null
        }
        devicesCount={devicesCount}
        activeDevices={activeDevices}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Последние платежи</CardTitle>
          </CardHeader>
          <CardContent>
            {user.payments.length === 0 ? (
              <p className="text-gray-500 text-sm">Нет платежей</p>
            ) : (
              <div className="space-y-3">
                {user.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {PLAN_NAMES[payment.plan] ?? payment.plan}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.date).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {payment.amount.toLocaleString("ru-RU")} ₽
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${PAYMENT_STATUS_COLORS[payment.status] ?? "bg-gray-500"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Активные устройства</CardTitle>
          </CardHeader>
          <CardContent>
            {user.devices.length === 0 ? (
              <p className="text-gray-500 text-sm">Нет устройств</p>
            ) : (
              <div className="space-y-3">
                {user.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-xs text-gray-500">{device.type}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        device.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {device.isActive ? "Онлайн" : "Офлайн"}
                    </span>
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
