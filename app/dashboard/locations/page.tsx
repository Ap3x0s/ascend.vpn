"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  IconWorld,
  IconDownload,
  IconUpload,
  IconClock,
  IconServer,
  IconCalendar,
  IconWifi,
} from "@tabler/icons-react";

const userLocations = [
  {
    id: "de-frankfurt",
    country: "Германия",
    flag: "🇩🇪",
    city: "Франкфурт",
    ping: 18,
    status: "online" as const,
    myTraffic: { download: 45.2, upload: 12.3 },
    lastUsed: "2 часа назад",
    totalDays: 45,
  },
  {
    id: "us-newyork",
    country: "США",
    flag: "🇺🇸",
    city: "Нью-Йорк",
    ping: 45,
    status: "online" as const,
    myTraffic: { download: 12.8, upload: 3.2 },
    lastUsed: "3 дня назад",
    totalDays: 12,
  },
  {
    id: "lv-riga",
    country: "Латвия",
    flag: "🇱🇻",
    city: "Рига",
    ping: 12,
    status: "online" as const,
    myTraffic: { download: 89.5, upload: 24.1 },
    lastUsed: "Вчера",
    totalDays: 67,
  },
  {
    id: "fi-helsinki",
    country: "Финляндия",
    flag: "🇫🇮",
    city: "Хельсинки",
    ping: 22,
    status: "online" as const,
    myTraffic: { download: 23.1, upload: 8.7 },
    lastUsed: "5 дней назад",
    totalDays: 23,
  },
];

export default function LocationsPage() {
  const totalDownload = userLocations.reduce((sum, loc) => sum + loc.myTraffic.download, 0);
  const totalUpload = userLocations.reduce((sum, loc) => sum + loc.myTraffic.upload, 0);
  const totalDays = userLocations.reduce((sum, loc) => sum + loc.totalDays, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Статистика по локациям</h1>
        <p className="text-muted text-sm mt-1">
          Данные об использовании серверов через Hiddify, Happy и другие клиенты
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-purple/15">
              <IconWorld className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{userLocations.length}</p>
              <p className="text-xs text-muted">Локаций использовано</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/15">
              <IconDownload className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalDownload.toFixed(1)} ГБ</p>
              <p className="text-xs text-muted">Всего скачано</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-violet/15">
              <IconUpload className="w-5 h-5 text-accent-violet" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalUpload.toFixed(1)} ГБ</p>
              <p className="text-xs text-muted">Всего отправлено</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations list */}
      <div className="space-y-3">
        {userLocations.map((location) => {
          const totalTraffic = location.myTraffic.download + location.myTraffic.upload;

          return (
            <Card key={location.id}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Location info */}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{location.flag}</span>
                    <div>
                      <h3 className="font-semibold text-white">{location.country}</h3>
                      <p className="text-sm text-muted">{location.city}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                    {/* Ping */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center gap-1 justify-center sm:justify-end">
                        <IconClock className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">Пинг</span>
                      </div>
                      <p className={cn(
                        "font-semibold",
                        location.ping < 20 ? "text-green-400" : location.ping < 50 ? "text-yellow-400" : "text-red-400"
                      )}>
                        {location.ping}ms
                      </p>
                    </div>

                    {/* Download */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center gap-1 justify-center sm:justify-end">
                        <IconDownload className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">Загрузка</span>
                      </div>
                      <p className="font-semibold text-white">{location.myTraffic.download} ГБ</p>
                    </div>

                    {/* Upload */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center gap-1 justify-center sm:justify-end">
                        <IconUpload className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">Отдача</span>
                      </div>
                      <p className="font-semibold text-white">{location.myTraffic.upload} ГБ</p>
                    </div>

                    {/* Total traffic */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center gap-1 justify-center sm:justify-end">
                        <IconWifi className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">Всего</span>
                      </div>
                      <p className="font-semibold text-accent-purple">{totalTraffic.toFixed(1)} ГБ</p>
                    </div>
                  </div>

                  {/* Last used */}
                  <div className="hidden lg:block text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <IconCalendar className="w-3 h-3 text-muted" />
                      <span className="text-xs text-muted">Последний раз</span>
                    </div>
                    <p className="text-sm text-white">{location.lastUsed}</p>
                  </div>
                </div>

                {/* Traffic bar */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted mb-1">
                    <span>Загрузка: {location.myTraffic.download} ГБ</span>
                    <span>Отдача: {location.myTraffic.upload} ГБ</span>
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full flex">
                      <div
                        className="bg-accent-blue"
                        style={{ width: `${(location.myTraffic.download / totalTraffic) * 100}%` }}
                      />
                      <div
                        className="bg-accent-violet"
                        style={{ width: `${(location.myTraffic.upload / totalTraffic) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info note */}
      <Card className="border-accent-purple/20 bg-accent-purple/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted">
            <span className="text-accent-purple font-medium">Примечание:</span>{" "}
            Статистика обновляется каждые 5 минут. Подключение к серверам осуществляется через
            приложения Hiddify, Happy, V2rayNG и другие VPN-клиенты.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
