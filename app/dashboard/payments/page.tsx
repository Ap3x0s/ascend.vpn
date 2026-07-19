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
} from "@tabler/icons-react";
import { getPlanName } from "@/lib/constants";

// Mock data - 25 платежей для тестирования пагинации
const allPayments = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  plan: ["30d", "90d", "180d", "365d"][i % 4],
  amount: [299, 799, 1499, 2499][i % 4],
  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 15 + Math.floor(Math.random() * 10))),
  status: i === 5 ? "failed" as const : "completed" as const,
  method: ["Банковская карта", "СБП", "Криптовалюта"][i % 3],
  receipt: `№${100000 + i}`,
}));

const ITEMS_PER_PAGE = 10;

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState(allPayments);

  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPayments = payments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  // Pagination range
  const getPaginationRange = () => {
    const range = [];
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">История платежей</h1>
          <p className="text-muted text-sm mt-1">
            {payments.length} платежей за всё время
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <IconClock className="w-4 h-4" />
          Стрелки ← → для навигации
        </div>
      </div>

      {/* Payments list */}
      <Card>
        <CardContent className="p-0">
          {currentPayments.length === 0 ? (
            <div className="text-center py-16">
              <IconReceipt className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-muted">Нет платежей</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {currentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:border-accent-purple/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>

          {/* Page numbers */}
          {getPaginationRange().map((page, i) =>
            page === "..." ? (
              <span key={`dots-${i}`} className="px-2 text-muted">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-accent-purple text-white"
                    : "border border-border hover:border-accent-purple/30 text-muted hover:text-white"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border hover:border-accent-purple/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Page info */}
      <div className="text-center text-sm text-muted">
        Страница {currentPage} из {totalPages}
      </div>

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
