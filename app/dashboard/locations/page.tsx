"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconWorld,
  IconWifi,
  IconDownload,
  IconUpload,
  IconClock,
  IconCheck,
  IconServer,
} from "@tabler/icons-react";

// Mock data для пользователя (в реальном проекте — из API)
const userLocations = [
  {
    id: "de-frankfurt",
    country: "Германия",
    flag: "🇩🇪",
    city: "Франкфурт",
    ping: 18,
    status: "online" as const,
    myTraffic: 45.2,
    mySpeed: { download: 450, upload: 200 },
    connected: true,
    lastUsed: "2 часа назад",
  },
  {
    id: "us-newyork",
    country: "США",
    flag: "🇺🇸",
    city: "Нью-Йорк",
    ping: 45,
    status: "online" as const,
    myTraffic: 12.8,
    mySpeed: { download: 320, upload: 150 },
    connected: false,
    lastUsed: "3 дня назад",
  },
  {
    id: "lv-riga",
    country: "Латвия",
    flag: "🇱🇻",
    city: "Рига",
    ping: 12,
    status: "online" as const,
    myTraffic: 89.5,
    mySpeed: { download: 500, upload: 250 },
    connected: false,
    lastUsed: "Вчера",
  },
  {
    id: "fi-helsinki",
    country: "Финляндия",
    flag: "🇫🇮",
    city: "Хельсинки",
    ping: 22,
    status: "online" as const,
    myTraffic: 23.1,
    mySpeed: { download: 480, upload: 220 },
    connected: false,
    lastUsed: "5 дней назад",
  },
];

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const totalTraffic = userLocations.reduce((sum, loc) => sum + loc.myTraffic, 0);
  const currentLocation = userLocations.find((l) => l.connected);

  const getPingColor = (ping: number) => {
    if (ping < 20) return "text-green-400";
    if (ping < 50) return "text-yellow-400";
    return "text-red-400";
  };

  const handleConnect = (locationId: string) => {
    setIsConnecting(true);
    // Имитация подключения
    setTimeout(() => {
      setIsConnecting(false);
      // В реальном проекте — API вызов
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Мои локации</h1>
        <p className="text-muted text-sm mt-1">
          Выберите сервер для подключения
        </p>
      </div>

      {/* Current connection status */}
      <Card className="border-accent-purple/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent-purple/15">
                <IconWorld className="w-8 h-8 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm text-muted">Текущее подключение</p>
                <p className="text-xl font-bold text-white">
                  {currentLocation
                    ? `${currentLocation.flag} ${currentLocation.country}, ${currentLocation.city}`
                    : "Нет подключения"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${currentLocation ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-sm text-muted">
                  {currentLocation ? "Подключено" : "Отключено"}
                </span>
              </div>
              {currentLocation && (
                <p className={`text-lg font-semibold ${getPingColor(currentLocation.ping)}`}>
                  {currentLocation.ping}ms
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-purple/15">
              <IconWorld className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{userLocations.length}</p>
              <p className="text-xs text-muted">Доступных локаций</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/15">
              <IconDownload className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalTraffic.toFixed(1)} ГБ</p>
              <p className="text-xs text-muted">Весь трафик</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-violet/15">
              <IconServer className="w-5 h-5 text-accent-violet" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4/4</p>
              <p className="text-xs text-muted">Серверов онлайн</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations list */}
      <div className="space-y-3">
        {userLocations.map((location) => (
          <Card
            key={location.id}
            className={`transition-all ${
              location.connected
                ? "border-green-500/50 bg-green-500/5"
                : selectedLocation === location.id
                ? "border-accent-purple/50"
                : "hover:border-accent-purple/30"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{location.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{location.country}</h3>
                      {location.connected && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                          Подключено
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted">{location.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* My traffic */}
                  <div className="text-right">
                    <p className="text-sm text-muted">Мой трафик</p>
                    <p className="font-semibold text-white">{location.myTraffic} ГБ</p>
                  </div>

                  {/* Speed */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-muted">Скорость</p>
                    <p className="text-sm text-white">
                      ↓{location.mySpeed.download} / ↑{location.mySpeed.upload}
                    </p>
                  </div>

                  {/* Ping */}
                  <div className="text-right">
                    <p className="text-sm text-muted">Пинг</p>
                    <p className={`font-semibold ${getPingColor(location.ping)}`}>
                      {location.ping}ms
                    </p>
                  </div>

                  {/* Last used */}
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-muted">Последний раз</p>
                    <p className="text-sm text-white">{location.lastUsed}</p>
                  </div>

                  {/* Connect button */}
                  <Button
                    onClick={() => handleConnect(location.id)}
                    disabled={isConnecting || location.connected}
                    variant={location.connected ? "secondary" : "default"}
                    size="sm"
                  >
                    {location.connected ? (
                      <>
                        <IconCheck className="w-4 h-4 mr-1" />
                        Активно
                      </>
                    ) : isConnecting ? (
                      "Подключение..."
                    ) : (
                      "Подключить"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Simple Button component
function Button({
  children,
  onClick,
  disabled,
  variant = "default",
  size = "default",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "secondary";
  size?: "default" | "sm";
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all ${
        variant === "default"
          ? "bg-gradient-to-r from-accent-purple to-accent-violet text-white hover:scale-105"
          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
      } ${size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2"} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
