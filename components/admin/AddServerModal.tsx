"use client";

import { useState } from "react";
import { IconX } from "@tabler/icons-react";

interface AddServerModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function AddServerModal({ open, onClose, onCreated }: AddServerModalProps) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    ip: "",
    maxUsers: 100,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          maxUsers: Number(form.maxUsers),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка создания сервера");
      }

      setForm({ name: "", country: "", city: "", ip: "", maxUsers: 100 });
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Добавить сервер</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:text-white transition-colors"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-400">
              Название
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Moscow-01"
              className="h-10 w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">
                Страна
              </label>
              <input
                type="text"
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                placeholder="Россия"
                className="h-10 w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">
                Город
              </label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="Москва"
                className="h-10 w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">
                IP-адрес
              </label>
              <input
                type="text"
                name="ip"
                required
                value={form.ip}
                onChange={handleChange}
                placeholder="192.168.1.1"
                className="h-10 w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">
                Макс. пользователей
              </label>
              <input
                type="number"
                name="maxUsers"
                required
                min={1}
                value={form.maxUsers}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#1a1a2e] px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors disabled:opacity-50"
            >
              {loading ? "Создание..." : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
