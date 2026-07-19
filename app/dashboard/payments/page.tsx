"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconReceipt,
  IconCheck,
  IconX,
  IconClock,
  IconCalendar,
  IconRefresh,
} from "@tabler/icons-react";
import { getPlanName } from "@/lib/constants";

const mockPayments = [
  {
    id: "1",
    plan: "180d",
    amount: 1499,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    status: "completed" as const,
    method: "Банковская карта",
    receipt: "№284719",
  },
  {
    id: "2",
    plan: "90d",
    amount: 799,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
    status: "completed" as const,
    method: "СБП",
    receipt: "№198234",
  },
  {
    id: "3",
    plan: "30d",
    amount: 299,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 155),
    status: "completed" as const,
    method: "Банковская карта",
    receipt: "№156782",
  },
];

export default function PaymentsPage() {
  const successfulPayments = mockPayments.filter((p) => p.status === "completed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">История платежей</h1>
        <p className="text-muted text-sm mt-1">
          Ваши оплаты и подписки
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconCheck className="w-4 h-4 text-green-400" />
              <span className="text-xs text-muted">Успешных</span>
            </div>
            <p className="text-2xl font-bold text-white">{successfulPayments}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconReceipt className="w-4 h-4 text-accent-purple" />
              <span className="text-xs text-muted">Последняя оплата</span>
            </div>
            <p className="text-lg font-bold text-white">
              {mockPayments[0]
                ? new Date(mockPayments[0].date).toLocaleDateString("ru-RU")
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconRefresh className="w-4 h-4 text-accent-blue" />
              <span className="text-xs text-muted">Продление</span>
            </div>
            <p className="text-lg font-bold text-white">
              {mockPayments[0]
                ? (() => {
                    const nextDate = new Date(mockPayments[0].date);
                    nextDate.setDate(nextDate.getDate() + 180);
                    return nextDate.toLocaleDateString("ru-RU");
                  })()
                : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payments list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Все платежи</CardTitle>
        </CardHeader>
        <CardContent>
          {mockPayments.length === 0 ? (
            <div className="text-center py-12">
              <IconReceipt className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-muted">Нет платежей</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        payment.status === "completed"
                          ? "bg-green-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {payment.status === "completed" ? (
                        <IconCheck className="h-5 w-5 text-green-400" />
                      ) : (
                        <IconX className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {getPlanName(payment.plan)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <IconCalendar className="w-3 h-3" />
                          {new Date(payment.date).toLocaleDateString("ru-RU")}
                        </span>
                        <span>{payment.method}</span>
                        <span className="text-dim">{payment.receipt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-white">{payment.amount}₽</p>
                    <p
                      className={`text-xs ${
                        payment.status === "completed"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {payment.status === "completed" ? "Оплачено" : "Ошибка"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Renewal info */}
      <Card className="border-accent-purple/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted">
            <span className="text-accent-purple font-medium">Продление:</span>{" "}
            При продлении подписки время автоматически добавляется к текущему периоду.
            Вы можете продлить заранее — дни прибавятся после окончания текущей подписки.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
