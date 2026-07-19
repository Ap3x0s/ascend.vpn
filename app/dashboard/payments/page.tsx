"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconReceipt,
  IconCheck,
  IconX,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconCreditCard,
  IconRefresh,
  IconDownload,
  IconWallet,
  IconCoin,
} from "@tabler/icons-react";
import { getPlanName } from "@/lib/constants";

// Mock data - 25 платежей
const allPayments = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  plan: ["30d", "90d", "180d", "365d"][i % 4],
  amount: [299, 799, 1499, 2499][i % 4],
  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 15 + Math.floor(Math.random() * 10))),
  status: i === 5 ? "failed" as const : "completed" as const,
  method: "card" as const,
  receipt: `#${100000 + i}`,
}));

const ITEMS_PER_PAGE = 10;

const paymentMethods = [
  {
    id: "card",
    name: "Российские карты",
    icon: IconCreditCard,
    description: "Visa, Мир, СБП",
    color: "text-accent-purple",
  },
  {
    id: "sbp",
    name: "СБП",
    icon: IconWallet,
    description: "Мгновенный перевод",
    color: "text-accent-blue",
  },
  {
    id: "crypto",
    name: "Криптовалюта",
    icon: IconCoin,
    description: "USDT, BTC, ETH",
    color: "text-accent-cyan",
  },
];

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const totalPages = Math.ceil(allPayments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPayments = allPayments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    } else if (e.key === "ArrowRight" && currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      }
    }

    return range;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">История платежей</h1>
        <p className="text-muted text-sm mt-1">
          Управляйте своими оплатами и подписками
        </p>
      </div>

      {/* Quick actions row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active subscription */}
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <IconRefresh className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted">Текущая подписка</p>
                <p className="font-semibold text-white">180 дней</p>
                <p className="text-xs text-green-400">Действует до 15.01.2027</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last payment */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-purple/10">
                <IconReceipt className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-xs text-muted">Последняя оплата</p>
                <p className="font-semibold text-white">1 499₽</p>
                <p className="text-xs text-muted">18.06.2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next renewal */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-blue/10">
                <IconClock className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <p className="text-xs text-muted">Следующее продление</p>
                <p className="font-semibold text-white">15.01.2027</p>
                <p className="text-xs text-muted">Через 180 дней</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment methods */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Способы оплаты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentMethods.map((method) => {
              const MethodIcon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    selectedMethod === method.id
                      ? "border-accent-purple bg-accent-purple/5"
                      : "border-border hover:border-accent-purple/30"
                  }`}
                >
                  <MethodIcon className={`w-5 h-5 ${method.color}`} />
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{method.name}</p>
                    <p className="text-xs text-muted">{method.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payments history */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Все платежи</CardTitle>
            <button className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors">
              <IconDownload className="w-3.5 h-3.5" />
              Скачать отчёт
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border text-xs text-muted">
            <div className="col-span-1"></div>
            <div className="col-span-3">План</div>
            <div className="col-span-2">Дата</div>
            <div className="col-span-2">Способ</div>
            <div className="col-span-2">Чек</div>
            <div className="col-span-2 text-right">Сумма</div>
          </div>

          {/* Table body */}
          {currentPayments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors items-center"
            >
              <div className="col-span-1">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                    payment.status === "completed"
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {payment.status === "completed" ? (
                    <IconCheck className="h-4 w-4 text-green-400" />
                  ) : (
                    <IconX className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
              <div className="col-span-3">
                <p className="text-sm font-medium text-white">
                  {getPlanName(payment.plan)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted">
                  {new Date(payment.date).toLocaleDateString("ru-RU")}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted">Карта</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-dim font-mono">{payment.receipt}</p>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-sm font-semibold text-white">{payment.amount}₽</p>
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

          {/* Empty state */}
          {currentPayments.length === 0 && (
            <div className="text-center py-16">
              <IconReceipt className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-muted">Нет платежей</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, allPayments.length)} из{" "}
            {allPayments.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>

            {getPaginationRange().map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} className="px-2 text-muted">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page
                      ? "bg-accent-purple text-white"
                      : "hover:bg-white/5 text-muted hover:text-white"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      <Card className="border-accent-purple/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted">
            <span className="text-accent-purple font-medium">Продление:</span>{" "}
            При продлении время автоматически добавляется к текущему периоду.
            Вы можете продлить заранее — дни прибавятся после окончания подписки.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
