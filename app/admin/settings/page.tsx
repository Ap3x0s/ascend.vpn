"use client";

import { useEffect, useState } from "react";
import {
  IconSettings,
  IconPlus,
  IconTrash,
  IconEdit,
  IconX,
} from "@tabler/icons-react";

interface Admin {
  id: string;
  email: string;
  role: string;
  lastLogin: string | null;
  createdAt: string;
  twoFactorEnabled: boolean;
}

const roleLabels: Record<string, string> = {
  superadmin: "Суперадмин",
  admin: "Админ",
  moderator: "Модератор",
};

const roleOptions = ["superadmin", "admin", "moderator"];

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Никогда";
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminSettingsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState("admin");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function fetchAdmins() {
    setLoading(true);
    fetch("/api/admin/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(data.admins || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  function openCreateModal() {
    setEditingAdmin(null);
    setFormEmail("");
    setFormPassword("");
    setFormRole("admin");
    setError("");
    setShowModal(true);
  }

  function openEditModal(admin: Admin) {
    setEditingAdmin(admin);
    setFormEmail(admin.email);
    setFormPassword("");
    setFormRole(admin.role);
    setError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingAdmin(null);
    setError("");
  }

  async function handleSave() {
    setError("");

    if (!formEmail) {
      setError("Email обязателен");
      return;
    }

    if (!editingAdmin && !formPassword) {
      setError("Пароль обязателен для нового админа");
      return;
    }

    setSaving(true);

    try {
      if (editingAdmin) {
        const body: Record<string, string> = { role: formRole };
        if (formPassword) body.password = formPassword;

        const res = await fetch(`/api/admin/admins/${editingAdmin.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Ошибка обновления");
          return;
        }
      } else {
        const res = await fetch("/api/admin/admins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formEmail,
            password: formPassword,
            role: formRole,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Ошибка создания");
          return;
        }
      }

      closeModal();
      fetchAdmins();
    } catch {
      setError("Ошибка сети");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(admin: Admin) {
    if (!confirm(`Удалить админа ${admin.email}?`)) return;

    try {
      await fetch(`/api/admin/admins/${admin.id}`, { method: "DELETE" });
      fetchAdmins();
    } catch {
      alert("Ошибка удаления");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Настройки</h2>
        <p className="text-gray-400">Управление панелью администратора</p>
      </div>

      {/* Section: Управление админами */}
      <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Управление админами</h3>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors"
          >
            <IconPlus className="h-4 w-4" />
            Добавить админа
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#1a1a2e]">
                <th className="px-4 py-3 font-medium text-gray-400">Email</th>
                <th className="px-4 py-3 font-medium text-gray-400">Роль</th>
                <th className="px-4 py-3 font-medium text-gray-400">2FA</th>
                <th className="px-4 py-3 font-medium text-gray-400">Последний вход</th>
                <th className="px-4 py-3 font-medium text-gray-400">Создан</th>
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
              ) : admins.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    Админы не найдены
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b border-[#1a1a2e] last:border-0 hover:bg-[#14142a]/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {admin.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          admin.role === "superadmin"
                            ? "bg-purple-500/10 text-purple-400"
                            : admin.role === "admin"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {roleLabels[admin.role] || admin.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs ${
                          admin.twoFactorEnabled
                            ? "text-green-400"
                            : "text-gray-500"
                        }`}
                      >
                        {admin.twoFactorEnabled ? "Включена" : "Выключена"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {formatDate(admin.lastLogin)}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {formatDate(admin.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(admin)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-accent-purple transition-colors"
                          title="Редактировать"
                        >
                          <IconEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(admin)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1a1a2e] hover:text-red-400 transition-colors"
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
      </div>

      {/* Section: Общие настройки */}
      <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Общие настройки</h3>
        <div className="flex items-center gap-3 rounded-lg bg-[#14142a] px-4 py-8 text-center">
          <IconSettings className="h-8 w-8 text-gray-600 mx-auto" />
        </div>
        <p className="mt-3 text-sm text-gray-500 text-center">
          Здесь появятся общие настройки системы в будущем
        </p>
      </div>

      {/* Modal: Create/Edit Admin */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {editingAdmin ? "Редактировать админа" : "Добавить админа"}
              </h3>
              <button
                onClick={closeModal}
                className="rounded-lg p-1 text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  disabled={!!editingAdmin}
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {editingAdmin ? "Новый пароль (оставьте пустым)" : "Пароль"}
                </label>
                <input
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder={editingAdmin ? "••••••••" : "Введите пароль"}
                  className="w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Роль
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 py-2 text-sm text-white outline-none focus:border-accent-purple"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role]}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={closeModal}
                  className="rounded-lg border border-[#1a1a2e] px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#14142a] transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors disabled:opacity-50"
                >
                  {saving ? "Сохранение..." : editingAdmin ? "Сохранить" : "Создать"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
