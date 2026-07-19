"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconWorld,
  IconWifi,
  IconDownload,
  IconUpload,
  IconDeviceDesktop,
  IconClock,
  IconActivity,
} from "@tabler/icons-react";

const locations = [
  {
    id: "de-frankfurt",
    country: "Германия",
    flag: "🇩🇪",
    city: "Франкфурт",
    ping: 18,
    status: "online",
    speed: { download: 450, upload: 200 },
    traffic: { used: 12.5, total: "∞" },
    activeDevices: 2,
    load: 35,
  },
  {
    id: "us-newyork",
    country: "США",
    flag: "🇺🇸",
    city: "Нью-Йорк",
    ping: 45,
    status: "online",
    speed: { download: 320, upload: 150 },
    traffic: { used: 8.3, total: "∞" },
    activeDevices: 1,
    load: 28,
  },
  {
    id: "lv-riga",
    country: "Латвия",
    flag: "🇱🇻",
    city: "Рига",
    ping: 12,
    status: "online",
    speed: { download: 500, upload: 250 },
    traffic: { used: 24.1, total: "∞" },
    activeDevices: 3,
    load: 42,
  },
  {
    id: "fi-helsinki",
    country: "Финляндия",
    flag: "🇫🇮",
    city: "Хельсинки",
    ping: 22,
    status: "online",
    speed: { download: 480, upload: 220 },
    traffic: { used: 5.7, total: "∞" },
    activeDevices: 0,
    load: 15,
  },
];

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-gray-500";
  };

  const getPingColor = (ping: number) => {
    if (ping < 20) return "text-green-400";
    if (ping < 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getLoadColor = (load: number) => {
    if (load < 30) return "bg-green-500";
    if (load < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Локации серверов</h1>
          <p className="text-muted text-sm mt-1">
            Доступно 4 из 4 локаций в вашем тарифе
          </p>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-purple/15">
              <IconWorld className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-xs text-muted">Локации</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/15">
              <IconActivity className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4/4</p>
              <p className="text-xs text-muted">Онлайн</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/15">
              <IconDeviceDesktop className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-xs text-muted">Устройств</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-violet/15">
              <IconWifi className="w-5 h-5 text-accent-violet" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">~24ms</p>
              <p className="text-xs text-muted">Средний пинг</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all ${
              selectedLocation === location.id
                ? "border-accent-purple/50 shadow-glow-sm"
                : "hover:border-accent-purple/30"
            }`}
            onClick={() => setSelectedLocation(location.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{location.flag}</span>
                  <div>
                    <h3 className="font-semibold text-white">{location.country}</h3>
                    <p className="text-sm text-muted">{location.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(location.status)}`} />
                  <span className="text-xs text-muted">{location.status === "online" ? "Онлайн" : "Офлайн"}</span>
                </div>
              </div>

              {/* Ping */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconClock className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">Пинг</span>
                </div>
                <span className={`font-semibold ${getPingColor(location.ping)}`}>
                  {location.ping}ms
                </span>
              </div>

              {/* Speed */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconDownload className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">Скорость</span>
                </div>
                <span className="text-sm text-white">
                  ↓ {location.speed.download} / ↑ {location.speed.upload} Мбит/с
                </span>
              </div>

              {/* Traffic */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconUpload className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">Трафик</span>
                </div>
                <span className="text-sm text-white">
                  {location.traffic.used} ГБ / {location.traffic.total}
                </span>
              </div>

              {/* Load bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted">Нагрузка</span>
                  <span className="text-xs text-white">{location.load}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getLoadColor(location.load)}`}
                    style={{ width: `${location.load}%` }}
                  />
                </div>
              </div>

              {/* Active devices */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <IconDeviceDesktop className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">Активных устройств</span>
                </div>
                <span className="text-sm font-medium text-white">
                  {location.activeDevices}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick connect */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Быстрое подключение</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted mb-4">
            Выберите локацию для подключения или оставьте автоматический выбор (рекомендуется)
          </p>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <button
                key={location.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  selectedLocation === location.id
                    ? "border-accent-purple bg-accent-purple/10 text-accent-purple"
                    : "border-border hover:border-accent-purple/30 text-muted hover:text-white"
                }`}
              >
                <span>{location.flag}</span>
                <span className="text-sm">{location.country}</span>
                <span className={`text-xs ${getPingColor(location.ping)}`}>
                  {location.ping}ms
                </span>
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-purple bg-accent-purple/10 text-accent-purple">
              <IconWorld className="w-4 h-4" />
              <span className="text-sm">Авто</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
