"use client";

import { useState, useEffect } from "react";
import {
  IconNews,
  IconTrash,
  IconCheck,
  IconArrowLeft,
} from "@tabler/icons-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NewsEditorProps {
  news?: NewsItem | null;
  onSave: (data: { title: string; content: string; published: boolean }) => Promise<void>;
  onDelete?: () => Promise<void>;
  onCancel: () => void;
}

export function NewsEditor({ news, onSave, onDelete, onCancel }: NewsEditorProps) {
  const [title, setTitle] = useState(news?.title || "");
  const [content, setContent] = useState(news?.content || "");
  const [published, setPublished] = useState(news?.published || false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      await onSave({ title: title.trim(), content: content.trim(), published });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    if (!confirm("Удалить новость?")) return;
    setSaving(true);
    try {
      await onDelete();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-[#1a1a2e] bg-[#14142a] text-gray-400 hover:text-white transition-colors"
          >
            <IconArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {news ? "Редактирование новости" : "Новая новость"}
            </h2>
            <p className="text-gray-400">
              {news ? "Измените детали новости" : "Создайте новую публикацию"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {news && onDelete && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <IconTrash className="h-4 w-4" />
              Удалить
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Заголовок
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок новости..."
            className="w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-accent-purple transition-colors"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Содержание
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введите текст новости..."
            rows={10}
            className="w-full rounded-lg border border-[#1a1a2e] bg-[#14142a] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-accent-purple transition-colors resize-none"
          />
        </div>

        {/* Published checkbox */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`flex items-center justify-center h-6 w-6 rounded border transition-colors ${
              published
                ? "bg-accent-purple border-accent-purple"
                : "border-[#1a1a2e] bg-[#14142a]"
            }`}
          >
            {published && <IconCheck className="h-4 w-4 text-white" />}
          </button>
          <span className="text-sm text-gray-400">
            Опубликовать (отображается пользователям)
          </span>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-2 rounded-lg bg-accent-purple px-6 py-3 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors disabled:opacity-50"
          >
            <IconNews className="h-4 w-4" />
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
}
