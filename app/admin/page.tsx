"use client";

import { useEffect, useState } from "react";
import {
  IconUsers,
  IconCoin,
  IconServer,
  IconUserPlus,
} from "@tabler/icons-react";
import { StatsCard } from "@/components/admin/StatsCard";

interface Stats {
  totalUsers: number;
  monthRevenue: number;
  activeServers: number;
  recentRegistrations: number;
  usersTrend: number;
  revenueTrend: number;
}

interface RecentUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

interface RecentPayment {
  id: string;
  amount: number;
  currency: string;
  plan: string;
  status: string;
  date: string;
  user: { email: string };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setRecentUsers(data.recentUsers);
        setRecentPayments(data.recentPayments);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Дашборд</h2>
        <p className="text-gray-400">
          Обзор системы ASCEND.VPN
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<IconUsers className="h-5 w-5" />}
          value={stats?.totalUsers ?? 0}
          label="Всего пользователей"
          trend={
            stats?.usersTrend !== undefined
              ? { value: stats.usersTrend, isPositive: stats.usersTrend >= 0 }
              : undefined
          }
        />
        <StatsCard
          icon={<IconCoin className="h-5 w-5" />}
          value={formatCurrency(stats?.monthRevenue ?? 0)}
          label="Доход за месяц"
          trend={
            stats?.revenueTrend !== undefined
              ? { value: stats.revenueTrend, isPositive: stats.revenueTrend >= 0 }
              : undefined
          }
        />
        <StatsCard
          icon={<IconServer className="h-5 w-5" />}
          value={stats?.activeServers ?? 0}
          label="Активные серверы"
        />
        <StatsCard
          icon={<IconUserPlus className="h-5 w-5" />}
          value={stats?.recentRegistrations ?? 0}
          label="Регистрации за месяц"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Последние регистрации
          </h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg bg-[#14142a] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <p className="text-sm text-gray-500">Нет данных</p>
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Последние платежи
          </h3>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-lg bg-[#14142a] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {payment.user.email} · {payment.plan}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      payment.status === "completed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {payment.status === "completed" ? "Оплачен" : payment.status}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDate(payment.date)}
                  </p>
                </div>
              </div>
            ))}
            {recentPayments.length === 0 && (
              <p className="text-sm text-gray-500">Нет данных</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
