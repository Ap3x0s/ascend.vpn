"use client";

import { useEffect, useState } from "react";
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";
import { getPlanName } from "@/lib/constants";

interface Payment {
  id: string;
  amount: number;
  plan: string;
  date: string;
  status: string;
  user: { email: string; name: string | null };
}

interface FinanceResponse {
  payments: Payment[];
  total: number;
}

const PAGE_SIZE = 10;

interface FinanceTableProps {
  refreshTrigger?: number;
}

export function FinanceTable({ refreshTrigger }: FinanceTableProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function fetchPayments() {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);

    fetch(`/api/admin/finance?${params}`)
      .then((res) => res.json())
      .then((data: FinanceResponse) => {
        setPayments(data.payments);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchPayments();
  }, [page, statusFilter, dateFrom, dateTo, refreshTrigger]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchPayments();
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "completed":
        return (
          <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
            Завершён
          </span>
        );
      case "pending":
        return (
          <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-400">
            Ожидание
          </span>
        );
      case "failed":
        return (
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">
            Ошибка
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-gray-500/10 px-2 py-0.5 text-xs font-medium text-gray-400">
            {status}
          </span>
        );
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск по email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-56 rounded-lg border border-[#1a1a2e] bg-[#14142a] pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
            />
          </div>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
            className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-3 text-sm text-white outline-none focus:border-accent-purple"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
            className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-3 text-sm text-white outline-none focus:border-accent-purple"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white outline-none focus:border-accent-purple"
          >
            <option value="">Все статусы</option>
            <option value="completed">Завершён</option>
            <option value="pending">Ожидание</option>
            <option value="failed">Ошибка</option>
          </select>
          <button
            type="submit"
            className="h-10 rounded-lg bg-accent-purple px-4 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors"
          >
            Найти
          </button>
        </form>

        <button
          className="flex h-10 items-center gap-2 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-gray-400 hover:text-white transition-colors"
          onClick={() => alert("Экспорт в разработке")}
        >
          <IconDownload className="h-4 w-4" />
          Экспорт
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1a1a2e] bg-[#0c0c16]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1a1a2e]">
              <th className="px-4 py-3 font-medium text-gray-400">Пользователь</th>
              <th className="px-4 py-3 font-medium text-gray-400">Сумма</th>
              <th className="px-4 py-3 font-medium text-gray-400">План</th>
              <th className="px-4 py-3 font-medium text-gray-400">Дата</th>
              <th className="px-4 py-3 font-medium text-gray-400">Статус</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  Платежи не найдены
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[#1a1a2e] last:border-0 hover:bg-[#14142a]/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">
                      {payment.user.name || payment.user.email}
                    </p>
                    {payment.user.name && (
                      <p className="text-xs text-gray-500">{payment.user.email}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-white">
                      {payment.amount} ₽
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {getPlanName(payment.plan)}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(payment.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Показано {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, total)} из {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-[#1a1a2e] p-2 text-gray-400 hover:bg-[#14142a] hover:text-white transition-colors disabled:opacity-30"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-400">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-[#1a1a2e] p-2 text-gray-400 hover:bg-[#14142a] hover:text-white transition-colors disabled:opacity-30"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
