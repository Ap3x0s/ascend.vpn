"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  IconLock,
  IconKey,
  IconBell,
  IconUser,
  IconMail,
  IconTrash,
  IconCopy,
  IconCheck,
  IconRefresh,
} from "@tabler/icons-react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    security: true,
    marketing: false,
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText("asc_vpn_xxxxxxxxxxxxxxxxxxxx");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Настройки</h1>
        <p className="text-muted text-sm mt-1">Управление аккаунтом и безопасностью</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <IconLock className="w-5 h-5 text-accent-purple" />
                Изменение пароля
              </CardTitle>
              <CardDescription>
                Рекомендуем менять пароль каждые 3 месяца
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted">Текущий пароль</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-border text-white placeholder:text-dim focus:border-accent-purple focus:outline-none transition-colors"
                  placeholder="Введите текущий пароль"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted">Новый пароль</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-border text-white placeholder:text-dim focus:border-accent-purple focus:outline-none transition-colors"
                  placeholder="Минимум 8 символов"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted">Подтвердите пароль</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-border text-white placeholder:text-dim focus:border-accent-purple focus:outline-none transition-colors"
                  placeholder="Повторите новый пароль"
                />
              </div>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-violet text-white text-sm font-medium hover:scale-105 transition-transform">
                Сохранить пароль
              </button>
            </CardContent>
          </Card>

          {/* API Key */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <IconKey className="w-5 h-5 text-accent-cyan" />
                API ключ
              </CardTitle>
              <CardDescription>
                Используйте для подключения через Hiddify, Happy и другие клиенты
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-border">
                <code className="flex-1 text-sm text-muted font-mono break-all">
                  asc_vpn_xxxxxxxxxxxxxxxxxxxx
                </code>
                <button
                  onClick={handleCopyKey}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors shrink-0"
                >
                  {copied ? (
                    <IconCheck className="w-4 h-4 text-green-400" />
                  ) : (
                    <IconCopy className="w-4 h-4 text-muted" />
                  )}
                </button>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-white hover:border-accent-purple/30 transition-colors flex items-center gap-2">
                  <IconRefresh className="w-4 h-4" />
                  Сгенерировать новый
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <IconBell className="w-5 h-5 text-accent-violet" />
                Уведомления
              </CardTitle>
              <CardDescription>
                Настройте получение уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email" as const, title: "Email уведомления", desc: "Платежи, продление, обновления" },
                { key: "security" as const, title: "Безопасность", desc: "Входы в аккаунт, смена пароля" },
                { key: "marketing" as const, title: "Новости и акции", desc: "Скидки, новые функции" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      notifications[item.key] ? "bg-accent-purple" : "bg-border"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        notifications[item.key] ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right - Profile summary */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-accent-purple/20 flex items-center justify-center mb-4">
                  <IconUser className="h-10 w-10 text-accent-purple" />
                </div>
                <h3 className="font-semibold text-white">Пользователь</h3>
                <p className="text-sm text-muted flex items-center gap-1 mt-1">
                  <IconMail className="w-3 h-3" />
                  demo@ascendvpn.com
                </p>
                <p className="text-xs text-dim mt-2">Участник с 18.07.2026</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="text-base text-red-400 flex items-center gap-2">
                <IconTrash className="w-4 h-4" />
                Опасная зона
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted mb-4">
                Удаление аккаунта необратимо. Все данные будут удалены.
              </p>
              <button className="w-full py-2 rounded-lg border border-red-500/50 text-red-400 text-sm hover:bg-red-500/10 transition-colors">
                Удалить аккаунт
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
