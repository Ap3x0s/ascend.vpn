import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

const PLAN_NAMES: Record<string, string> = {
  "30d": "30 дней",
  "90d": "90 дней",
  "180d": "180 дней",
  "365d": "365 дней",
};

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  completed: { icon: CheckCircle, color: "text-cyan-500", label: "Завершён" },
  pending: { icon: Clock, color: "text-yellow-500", label: "Ожидание" },
  failed: { icon: XCircle, color: "text-red-500", label: "Ошибка" },
};

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });

  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const lastPaymentDate = payments.length > 0 ? payments[0].date : null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">История оплат</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Всего потрачено</p>
                <p className="text-lg font-bold">{totalSpent.toLocaleString("ru-RU")} ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Платежей</p>
                <p className="text-lg font-bold">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Последний платёж</p>
                <p className="text-lg font-bold">
                  {lastPaymentDate
                    ? new Date(lastPaymentDate).toLocaleDateString("ru-RU")
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Нет истории платежей</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Все платежи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Дата</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">План</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Сумма</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => {
                    const status = STATUS_CONFIG[payment.status] ?? STATUS_CONFIG.completed;
                    const StatusIcon = status.icon;
                    return (
                      <tr key={payment.id} className="border-b border-border last:border-0">
                        <td className="py-3 text-sm">
                          {new Date(payment.date).toLocaleDateString("ru-RU")}
                        </td>
                        <td className="py-3 text-sm">
                          {PLAN_NAMES[payment.plan] ?? payment.plan}
                        </td>
                        <td className="py-3 text-sm font-medium">
                          {payment.amount.toLocaleString("ru-RU")} ₽
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-4 w-4 ${status.color}`} />
                            <span className="text-sm">{status.label}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
