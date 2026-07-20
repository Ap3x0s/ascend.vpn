"use client";

import { useEffect, useState } from "react";
import {
  IconSearch,
  IconPencil,
  IconTrash,
  IconPower,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface Server {
  id: string;
  name: string;
  country: string;
  city: string;
  ip: string;
  status: string;
  load: number;
  ping: number;
  maxUsers: number;
  createdAt: string;
}

interface ServersResponse {
  servers: Server[];
  total: number;
}

const PAGE_SIZE = 10;

interface ServersTableProps {
  onEdit?: (server: Server) => void;
  refreshTrigger?: number;
}

export function ServersTable({ onEdit, refreshTrigger }: ServersTableProps) {
  const [servers, setServers] = useState<Server[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function fetchServers() {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);

    fetch(`/api/admin/servers?${params}`)
      .then((res) => res.json())
      .then((data: ServersResponse) => {
        setServers(data.servers);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchServers();
  }, [page, statusFilter, refreshTrigger]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchServers();
  }

  async function handleToggle(id: string) {
    setActionLoading(id);
    try {
      await fetch(`/api/admin/servers/${id}/toggle`, { method: "POST" });
      fetchServers();
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить сервер?")) return;
    setActionLoading(id);
    try {
      await fetch(`/api/admin/servers/${id}`, { method: "DELETE" });
      fetchServers();
    } finally {
      setActionLoading(null);
    }
  }

  function getLoadColor(load: number) {
    if (load < 50) return "text-green-400";
    if (load < 80) return "text-yellow-400";
    return "text-red-400";
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
              placeholder="Поиск по названию или IP..."
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
          <option value="online">Онлайн</option>
          <option value="offline">Оффлайн</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1a1a2e] bg-[#0c0c16]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1a1a2e]">
              <th className="px-4 py-3 font-medium text-gray-400">Название</th>
              <th className="px-4 py-3 font-medium text-gray-400">Страна</th>
              <th className="px-4 py-3 font-medium text-gray-400">IP</th>
              <th className="px-4 py-3 font-medium text-gray-400">Статус</th>
              <th className="px-4 py-3 font-medium text-gray-400">Нагрузка</th>
              <th className="px-4 py-3 font-medium text-gray-400">Пинг</th>
              <th className="px-4 py-3 font-medium text-gray-400">Действия</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
                </td>
              </tr>
            ) : servers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  Серверы не найдены
                </td>
              </tr>
            ) : (
              servers.map((server) => (
                <tr
                  key={server.id}
                  className="border-b border-[#1a1a2e] last:border-0 hover:bg-[#14142a]/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{server.name}</p>
                    <p className="text-xs text-gray-500">{server.city}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{server.country}</td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-300">
                    {server.ip}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          server.status === "online"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          server.status === "online"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {server.status === "online" ? "Онлайн" : "Оффлайн"}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${getLoadColor(server.load)}`}>
                      {server.load}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {server.ping}ms
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggle(server.id)}
                        disabled={actionLoading === server.id}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-yellow-400 transition-colors disabled:opacity-50"
                        title={
                          server.status === "online"
                            ? "Выключить"
                            : "Включить"
                        }
                      >
                        <IconPower className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit?.(server)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-accent-purple transition-colors"
                        title="Редактировать"
                      >
                        <IconPencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(server.id)}
                        disabled={actionLoading === server.id}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Удалить"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
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
