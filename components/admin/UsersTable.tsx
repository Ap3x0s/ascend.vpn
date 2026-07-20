"use client";

import { useEffect, useState } from "react";
import {
  IconSearch,
  IconEye,
  IconBan,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface User {
  id: string;
  email: string;
  name: string | null;
  status: string;
  createdAt: string;
  subscriptions: { plan: string; status: string; endDate: string }[];
  devices: { id: string; name: string; isActive: boolean }[];
}

interface UsersResponse {
  users: User[];
  total: number;
}

const PAGE_SIZE = 10;

const planLabels: Record<string, string> = {
  "30d": "1 месяц",
  "90d": "3 месяца",
  "180d": "6 месяцев",
  "365d": "1 год",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface UsersTableProps {
  onViewUser?: (user: User) => void;
}

export function UsersTable({ onViewUser }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function fetchUsers() {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);

    fetch(`/api/admin/users?${params}`)
      .then((res) => res.json())
      .then((data: UsersResponse) => {
        setUsers(data.users);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchUsers();
  }, [page, statusFilter]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  }

  async function handleBlock(userId: string) {
    setActionLoading(userId);
    try {
      await fetch(`/api/admin/users/${userId}/block`, { method: "POST" });
      fetchUsers();
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm("Удалить пользователя?")) return;
    setActionLoading(userId);
    try {
      await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      fetchUsers();
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск по email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-64 rounded-lg border border-[#1a1a2e] bg-[#14142a] pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
            />
          </div>
          <button
            type="submit"
            className="h-10 rounded-lg bg-accent-purple px-4 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors"
          >
            Найти
          </button>
        </form>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white outline-none focus:border-accent-purple"
        >
          <option value="">Все статусы</option>
          <option value="active">Активные</option>
          <option value="blocked">Заблокированные</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1a1a2e] bg-[#0c0c16]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1a1a2e]">
              <th className="px-4 py-3 font-medium text-gray-400">Email</th>
              <th className="px-4 py-3 font-medium text-gray-400">Подписка</th>
              <th className="px-4 py-3 font-medium text-gray-400">Статус</th>
              <th className="px-4 py-3 font-medium text-gray-400">
                Дата регистрации
              </th>
              <th className="px-4 py-3 font-medium text-gray-400">Устройства</th>
              <th className="px-4 py-3 font-medium text-gray-400">Действия</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  Пользователи не найдены
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const activeSub = user.subscriptions.find(
                  (s) => s.status === "active" && new Date(s.endDate) > new Date()
                );
                const activeDevices = user.devices.filter((d) => d.isActive);

                return (
                  <tr
                    key={user.id}
                    className="border-b border-[#1a1a2e] last:border-0 hover:bg-[#14142a]/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white">
                          {user.name || user.email}
                        </p>
                        {user.name && (
                          <p className="text-xs text-gray-500">{user.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {activeSub ? (
                        <span className="text-sm text-white">
                          {planLabels[activeSub.plan] || activeSub.plan}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Нет</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {user.status === "active" ? "Активен" : "Заблокирован"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-400">
                        {activeDevices.length} / {user.devices.length}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onViewUser?.(user)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-accent-purple transition-colors"
                          title="Просмотр"
                        >
                          <IconEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleBlock(user.id)}
                          disabled={actionLoading === user.id}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-yellow-400 transition-colors disabled:opacity-50"
                          title={
                            user.status === "active"
                              ? "Заблокировать"
                              : "Разблокировать"
                          }
                        >
                          <IconBan className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={actionLoading === user.id}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-red-400 transition-colors disabled:opacity-50"
                          title="Удалить"
                        >
                          <IconTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
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
