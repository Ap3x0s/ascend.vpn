"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IconLock, IconKey, IconBell } from "@tabler/icons-react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityNotifications, setSecurityNotifications] = useState(true);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>

      <div className="max-w-2xl space-y-6">
        {/* Изменение пароля */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLock className="h-5 w-5 text-accent-purple" />
              Изменение пароля
            </CardTitle>
            <CardDescription>
              Обновите пароль для защиты вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Текущий пароль</label>
              <Input
                type="password"
                placeholder="Введите текущий пароль"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Новый пароль</label>
              <Input
                type="password"
                placeholder="Введите новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Подтвердите пароль</label>
              <Input
                type="password"
                placeholder="Повторите новый пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button className="w-full sm:w-auto">Сохранить пароль</Button>
          </CardContent>
        </Card>

        {/* Управление ключами */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconKey className="h-5 w-5 text-accent-purple" />
              Управление ключами
            </CardTitle>
            <CardDescription>
              API ключи для доступа к сервису
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <code className="text-sm text-muted break-all">
                asc_vpn_xxxxxxxxxxxxxxxxxxxx
              </code>
            </div>
            <Button variant="outline">Сгенерировать новый ключ</Button>
          </CardContent>
        </Card>

        {/* Уведомления */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBell className="h-5 w-5 text-accent-purple" />
              Уведомления
            </CardTitle>
            <CardDescription>
              Настройте получение уведомлений
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Email уведомления</p>
                <p className="text-xs text-gray-400">Получайте уведомления на электронную почту</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? "bg-accent-purple" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Уведомления о безопасности</p>
                <p className="text-xs text-gray-400">Оповещения о входах и подозрительной активности</p>
              </div>
              <button
                onClick={() => setSecurityNotifications(!securityNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securityNotifications ? "bg-accent-purple" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securityNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
