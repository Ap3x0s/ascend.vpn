"use client";

import { useState, useEffect } from "react";
import {
  IconNews,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import { NewsEditor } from "@/components/admin/NewsEditor";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  async function fetchNews() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      setNews(data.news || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  async function handleCreate() {
    setEditingNews(null);
    setShowEditor(true);
  }

  async function handleEdit(newsItem: NewsItem) {
    setEditingNews(newsItem);
    setShowEditor(true);
  }

  async function handleSave(data: {
    title: string;
    content: string;
    published: boolean;
  }) {
    if (editingNews) {
      await fetch(`/api/admin/news/${editingNews.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setShowEditor(false);
    setEditingNews(null);
    fetchNews();
  }

  async function handleDelete() {
    if (!editingNews) return;
    await fetch(`/api/admin/news/${editingNews.id}`, { method: "DELETE" });
    setShowEditor(false);
    setEditingNews(null);
    fetchNews();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (showEditor) {
    return (
      <NewsEditor
        news={editingNews}
        onSave={handleSave}
        onDelete={editingNews ? handleDelete : undefined}
        onCancel={() => {
          setShowEditor(false);
          setEditingNews(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Новости</h2>
          <p className="text-gray-400">Управление публикациями и обновлениями</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchNews}
            className="flex items-center gap-2 rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <IconRefresh className="h-4 w-4" />
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors"
          >
            <IconPlus className="h-4 w-4" />
            Создать новость
          </button>
        </div>
      </div>

      {/* News list */}
      <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1a1a2e]">
              <th className="px-4 py-3 font-medium text-gray-400">Заголовок</th>
              <th className="px-4 py-3 font-medium text-gray-400">Статус</th>
              <th className="px-4 py-3 font-medium text-gray-400">Дата</th>
              <th className="px-4 py-3 font-medium text-gray-400">Обновлено</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
                </td>
              </tr>
            ) : news.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  Новостей пока нет. Нажмите "Создать новость" для добавления.
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleEdit(item)}
                  className="border-b border-[#1a1a2e] last:border-0 hover:bg-[#14142a]/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <IconNews className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {item.published ? "Опубликовано" : "Черновик"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-gray-400">
                    {formatDate(item.updatedAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
