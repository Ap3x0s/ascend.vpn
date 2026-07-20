"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconWorld,
  IconDownload,
  IconUpload,
  IconClock,
  IconInfoCircle,
  IconServer,
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
    lastConnection: {
      date: "18.07.2026",
      time: "14:32",
      duration: "3ч 24мин",
      device: "iPhone 15 Pro",
    },
  },
  {
    id: "de-frankfurt",
    country: "Германия",
    flag: "🇩🇪",
    city: "Франкфурт",
    ping: 18,
    status: "online" as const,
    myTraffic: { download: 45.2, upload: 12.3 },
    lastConnection: {
      date: "17.07.2026",
      time: "09:15",
      duration: "1ч 45мин",
      device: "MacBook Pro",
    },
  },
  {
    id: "fi-helsinki",
    country: "Финляндия",
    flag: "🇫🇮",
    city: "Хельсинки",
    ping: 22,
    status: "online" as const,
    myTraffic: { download: 23.1, upload: 8.7 },
    lastConnection: {
      date: "13.07.2026",
      time: "18:45",
      duration: "52мин",
      device: "iPhone 15 Pro",
    },
  },
  {
    id: "us-newyork",
    country: "США",
    flag: "🇺🇸",
    city: "Нью-Йорк",
    ping: 45,
    status: "online" as const,
    myTraffic: { download: 12.8, upload: 3.2 },
    lastConnection: {
      date: "15.07.2026",
      time: "21:10",
      duration: "28мин",
      device: "MacBook Pro",
    },
  },
];

export default function LocationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
      <div className="space-y-4">
        {locations.map((location) => {
          const locTotal = location.myTraffic.download + location.myTraffic.upload;
          const downloadPercent = Math.round((location.myTraffic.download / locTotal) * 100);

          return (
            <Card key={location.id} className="hover:border-accent-purple/30 transition-colors">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{location.flag}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{location.country}</h3>
                      <p className="text-sm text-muted">{location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="text-sm text-muted">Онлайн</span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconClock className="w-3.5 h-3.5 text-muted" />
                      <span className="text-xs text-muted">Пинг</span>
                    </div>
                    <p className={`text-xl font-bold ${getPingColor(location.ping)}`}>
                      {location.ping}ms
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconDownload className="w-3.5 h-3.5 text-accent-blue" />
                      <span className="text-xs text-muted">Загрузка</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {location.myTraffic.download} <span className="text-sm font-normal text-muted">ГБ</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconUpload className="w-3.5 h-3.5 text-accent-violet" />
                      <span className="text-xs text-muted">Отдача</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {location.myTraffic.upload} <span className="text-sm font-normal text-muted">ГБ</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconServer className="w-3.5 h-3.5 text-accent-purple" />
                      <span className="text-xs text-muted">Всего</span>
                    </div>
                    <p className="text-xl font-bold gradient-text">
                      {locTotal.toFixed(1)} <span className="text-sm font-normal text-muted">ГБ</span>
                    </p>
                  </div>
                </div>

                {/* Traffic ratio */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span>Соотношение трафика</span>
                    <span>{downloadPercent}% загрузка / {100 - downloadPercent}% отдача</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-border overflow-hidden flex">
                    <div
                      className="bg-accent-blue transition-all"
                      style={{ width: `${downloadPercent}%` }}
                    />
                    <div
                      className="bg-accent-violet transition-all"
                      style={{ width: `${100 - downloadPercent}%` }}
                    />
                  </div>
                </div>

                {/* Last connection */}
                <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/10">
                  <div className="flex items-center gap-2 mb-2">
                    <IconClock className="w-4 h-4 text-accent-purple" />
                    <span className="text-sm font-medium text-white">Последнее подключение</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted">Дата</p>
                      <p className="text-white">{location.lastConnection.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Время</p>
                      <p className="text-white">{location.lastConnection.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Длительность</p>
                      <p className="text-white">{location.lastConnection.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Устройство</p>
                      <p className="text-white">{location.lastConnection.device}</p>
                    </div>
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
              Подключение через приложения{" "}
              <span className="text-white">Hiddify</span>,{" "}
              <span className="text-white">Happy</span>,{" "}
              <span className="text-white">V2rayNG</span> и другие VPN-клиенты.
            </p>
            <p className="mt-1">Статистика обновляется каждые 5 минут.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
