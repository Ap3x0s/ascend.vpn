"use client";

import { useState, useEffect } from "react";
import { IconCoin, IconReceipt, IconCoinOff } from "@tabler/icons-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { FinanceTable } from "@/components/admin/FinanceTable";

type Period = "day" | "week" | "month" | "year";

interface Summary {
  totalRevenue: number;
  paymentCount: number;
  averageCheck: number;
}

const periods: { value: Period; label: string }[] = [
  { value: "day", label: "День" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "year", label: "Год" },
];

export default function AdminFinancePage() {
  const [period, setPeriod] = useState<Period>("month");
  const [summary, setSummary] = useState<Summary>({
    totalRevenue: 0,
    paymentCount: 0,
    averageCheck: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/finance/summary?period=${period}`)
      .then((res) => res.json())
      .then((data: Summary) => setSummary(data))
      .finally(() => setLoading(false));
  }, [period, refreshTrigger]);

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Финансы</h2>
          <p className="text-gray-400">Статистика платежей и доходов</p>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex items-center gap-2">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              period === p.value
                ? "bg-accent-purple text-white"
                : "border border-[#1a1a2e] bg-[#0c0c16] text-gray-400 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          icon={<IconCoin className="h-5 w-5" />}
          value={loading ? "—" : formatCurrency(summary.totalRevenue)}
          label="Общий доход"
        />
        <StatsCard
          icon={<IconReceipt className="h-5 w-5" />}
          value={loading ? "—" : summary.paymentCount}
          label="Количество платежей"
        />
        <StatsCard
          icon={<IconCoinOff className="h-5 w-5" />}
          value={loading ? "—" : formatCurrency(summary.averageCheck)}
          label="Средний чек"
        />
      </div>

      {/* Payments table */}
      <FinanceTable refreshTrigger={refreshTrigger} />
    </div>
  );
}
