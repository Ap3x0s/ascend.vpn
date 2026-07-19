"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  IconWorld,
  IconDownload,
  IconUpload,
  IconClock,
  IconInfoCircle,
  IconWifi,
} from "@tabler/icons-react";
import { getPingColor, formatTraffic } from "@/lib/constants";

const locations = [
  {
    id: "lv-riga",
    country: "Латвия",
    flag: "🇱🇻",
    city: "Рига",
    ping: 12,
    status: "online" as const,
    myTraffic: { download: 89.5, upload: 24.1 },
    lastUsed: "Вчера",
  },
  {
    id: "de-frankfurt",
    country: "Германия",
    flag: "🇩🇪",
    city: "Франкфурт",
    ping: 18,
    status: "online" as const,
    myTraffic: { download: 45.2, upload: 12.3 },
    lastUsed: "2 часа назад",
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
  },
];

export default function LocationsPage() {
  const totalDownload = locations.reduce((sum, loc) => sum + loc.myTraffic.download, 0);
  const totalUpload = locations.reduce((sum, loc) => sum + loc.myTraffic.upload, 0);
  const totalTraffic = totalDownload + totalUpload;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Статистика по локациям</h1>
        <p className="text-muted text-sm mt-1">
          Данные об использовании серверов
        </p>
      </div>

      {/* Total stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted mb-1">Всего скачано</p>
            <p className="text-xl font-bold text-white flex items-center gap-2">
              <IconDownload className="w-4 h-4 text-accent-blue" />
              {formatTraffic(totalDownload)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted mb-1">Всего отправлено</p>
            <p className="text-xl font-bold text-white flex items-center gap-2">
              <IconUpload className="w-4 h-4 text-accent-violet" />
              {formatTraffic(totalUpload)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted mb-1">Общий трафик</p>
            <p className="text-xl font-bold gradient-text flex items-center gap-2">
              <IconWifi className="w-4 h-4" />
              {formatTraffic(totalTraffic)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted mb-1">Локаций</p>
            <p className="text-xl font-bold text-white flex items-center gap-2">
              <IconWorld className="w-4 h-4 text-accent-purple" />
              {locations.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Locations list */}
      <div className="space-y-3">
        {locations.map((location) => {
          const locTotal = location.myTraffic.download + location.myTraffic.upload;
          const downloadPercent = (location.myTraffic.download / locTotal) * 100;

          return (
            <Card key={location.id} className="hover:border-accent-purple/30 transition-colors">
              <CardContent className="p-5">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <h3 className="font-semibold text-white">{location.country}</h3>
                      <p className="text-xs text-muted">{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs text-muted">{location.lastUsed}</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted mb-1">Пинг</p>
                    <p className={`text-lg font-semibold ${getPingColor(location.ping)}`}>
                      {location.ping}ms
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Загрузка</p>
                    <p className="text-lg font-semibold text-white">
                      {location.myTraffic.download} ГБ
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Отдача</p>
                    <p className="text-lg font-semibold text-white">
                      {location.myTraffic.upload} ГБ
                    </p>
                  </div>
                </div>

                {/* Traffic bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-muted mb-1.5">
                    <span>Загрузка</span>
                    <span>{location.myTraffic.download} ГБ</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-accent-blue rounded-full"
                      style={{ width: `${downloadPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted mt-1.5">
                    <span>Отдача</span>
                    <span>{location.myTraffic.upload} ГБ</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-accent-violet rounded-full"
                      style={{ width: `${100 - downloadPercent}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info */}
      <Card className="border-accent-purple/20">
        <CardContent className="p-4 flex items-start gap-3">
          <IconInfoCircle className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" />
          <div className="text-sm text-muted">
            <p>
              Подключение к серверам осуществляется через приложения{" "}
              <span className="text-white">Hiddify</span>,{" "}
              <span className="text-white">Happy</span>,{" "}
              <span className="text-white">V2rayNG</span> и другие VPN-клиенты.
            </p>
            <p className="mt-1">
              Статистика обновляется каждые 5 минут.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
