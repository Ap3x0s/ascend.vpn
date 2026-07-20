"use client";

import { useEffect, useState } from "react";
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";

interface LogEntry {
  id: string;
  action: string;
  targetId: string | null;
  details: string | null;
  ip: string | null;
  createdAt: string;
  admin: { id: string; email: string };
}

interface LogsResponse {
  logs: LogEntry[];
  total: number;
}

const PAGE_SIZE = 20;

const ACTION_LABELS: Record<string, string> = {
  login: "Вход",
  create_user: "Создание пользователя",
  block_user: "Блокировка пользователя",
  delete_user: "Удаление пользователя",
  create_server: "Создание сервера",
  edit_server: "Редактирование сервера",
  delete_server: "Удаление сервера",
  create_news: "Создание новости",
  edit_news: "Редактирование новости",
  delete_news: "Удаление новости",
  edit_settings: "Настройки",
  export_data: "Экспорт данных",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LogsTable() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function fetchLogs() {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (actionFilter) params.set("action", actionFilter);
    if (adminFilter) params.set("adminId", adminFilter);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);

    fetch(`/api/admin/logs?${params}`)
      .then((res) => res.json())
      .then((data: LogsResponse) => {
        setLogs(data.logs);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter, adminFilter, dateFrom, dateTo]);

  function handleExport() {
    const params = new URLSearchParams();
    if (actionFilter) params.set("action", actionFilter);
    if (adminFilter) params.set("adminId", adminFilter);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    window.open(`/api/admin/logs/export?${params}`, "_blank");
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white outline-none focus:border-accent-purple"
          >
            <option value="">Все действия</option>
            {Object.entries(ACTION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="ID админа..."
              value={adminFilter}
              onChange={(e) => {
                setAdminFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 w-48 rounded-lg border border-[#1a1a2e] bg-[#14142a] pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
            />
          </div>

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-3 text-sm text-white outline-none focus:border-accent-purple"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-3 text-sm text-white outline-none focus:border-accent-purple"
          />
        </div>

        <button
          onClick={handleExport}
          className="flex h-10 items-center gap-2 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <IconDownload className="h-4 w-4" />
          Экспорт CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1a1a2e] bg-[#0c0c16]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1a1a2e]">
              <th className="px-4 py-3 font-medium text-gray-400">Дата</th>
              <th className="px-4 py-3 font-medium text-gray-400">Админ</th>
              <th className="px-4 py-3 font-medium text-gray-400">Действие</th>
              <th className="px-4 py-3 font-medium text-gray-400">Объект</th>
              <th className="px-4 py-3 font-medium text-gray-400">IP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  Логи не найдены
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-[#1a1a2e] last:border-0 hover:bg-[#14142a]/50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-white">{log.admin.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-accent-purple/10 px-2 py-0.5 text-xs font-medium text-accent-purple">
                      {ACTION_LABELS[log.action] || log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {log.targetId || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{log.ip || "—"}</td>
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

export { LogsTable };
