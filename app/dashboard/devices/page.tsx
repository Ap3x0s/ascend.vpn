"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconTrash,
  IconPlus,
  IconClock,
  IconWifi,
} from "@tabler/icons-react";

const mockDevices = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    type: "iOS",
    icon: IconDeviceMobile,
    isActive: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 мин назад
    ip: "192.168.1.***",
  },
  {
    id: "2",
    name: "MacBook Pro",
    type: "macOS",
    icon: IconDeviceDesktop,
    isActive: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
    ip: "192.168.1.***",
  },
  {
    id: "3",
    name: "iPad Air",
    type: "iPadOS",
    icon: IconDeviceTablet,
    isActive: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 дня назад
    ip: "192.168.1.***",
  },
  {
    id: "4",
    name: "Windows PC",
    type: "Windows",
    icon: IconDeviceDesktop,
    isActive: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 дней назад
    ip: "192.168.1.***",
  },
];

const MAX_DEVICES = 5;

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} ч. назад`;
  return `${days} дн. назад`;
}

export default function DevicesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [devices, setDevices] = useState(mockDevices);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-[50vh]"><p className="text-muted">Загрузка...</p></div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const activeDevices = devices.filter((d) => d.isActive).length;

  const handleRemove = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Устройства</h1>
          <p className="text-muted text-sm mt-1">
            {activeDevices} из {devices.length} активных
          </p>
        </div>
        <button
          disabled={devices.length >= MAX_DEVICES}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-violet text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconPlus className="w-4 h-4" />
          Добавить
        </button>
      </div>

      {/* Usage bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Использование устройств</span>
            <span className="text-sm text-white">
              {devices.length} / {MAX_DEVICES}
            </span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet transition-all"
              style={{ width: `${(devices.length / MAX_DEVICES) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Devices list */}
      <div className="space-y-3">
        {devices.map((device) => {
          const DeviceIcon = device.icon;
          return (
            <Card
              key={device.id}
              className={device.isActive ? "border-green-500/30" : ""}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        device.isActive
                          ? "bg-green-500/10"
                          : "bg-white/[0.03]"
                      }`}
                    >
                      <DeviceIcon
                        className={`h-6 w-6 ${
                          device.isActive ? "text-green-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{device.name}</h3>
                        {device.isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                            Онлайн
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted">{device.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Connection info */}
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 justify-end">
                        <IconClock className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">{getTimeAgo(device.lastActive)}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <IconWifi className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted font-mono">{device.ip}</span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(device.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                    >
                      <IconTrash className="h-4 w-4 text-gray-400 group-hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info */}
      <Card className="border-accent-purple/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted">
            <span className="text-accent-purple font-medium">Примечание:</span>{" "}
            Для добавления устройства установите VPN-клиент (Hiddify, Happy) и подключитесь к серверу.
            Устройство автоматически появится в списке.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
