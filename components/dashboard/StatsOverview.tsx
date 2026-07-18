"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Smartphone, Wifi } from "lucide-react";

const PLAN_NAMES: Record<string, string> = {
  "30d": "30 дней",
  "90d": "90 дней",
  "180d": "180 дней",
  "365d": "365 дней",
};

interface StatsOverviewProps {
  subscription: {
    plan: string;
    startDate: Date;
    endDate: Date;
    status: string | null;
  } | null;
  devicesCount: number;
  activeDevices: number;
}

export function StatsOverview({
  subscription,
  devicesCount,
  activeDevices,
}: StatsOverviewProps) {
  const now = new Date();
  const daysLeft = subscription
    ? Math.max(
        0,
        Math.ceil(
          (new Date(subscription.endDate).getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const totalDays = subscription
    ? Math.ceil(
        (new Date(subscription.endDate).getTime() -
          new Date(subscription.startDate ?? subscription.endDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 30;

  const progressWidth = Math.min(100, (daysLeft / (totalDays || 1)) * 100);
  const planName =
    subscription?.plan ? PLAN_NAMES[subscription.plan] ?? subscription.plan : "—";
  const isActive = subscription?.status === "active";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-purple/20">
            <Shield className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Статус</p>
            <p className="text-lg font-semibold">
              {isActive ? "Активна" : "Неактивна"}
            </p>
            <p className="text-xs text-gray-500">{planName}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-cyan/20">
            <Clock className="w-6 h-6 text-accent-cyan" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400">Осталось дней</p>
            <p className="text-lg font-semibold">{daysLeft}</p>
            <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progressWidth}%`,
                  background: "linear-gradient(to right, #6c5ce7, #00cec9)",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-purple/20">
            <Smartphone className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Устройства</p>
            <p className="text-lg font-semibold">
              {activeDevices} / {devicesCount}
            </p>
            <p className="text-xs text-gray-500">активных</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-cyan/20">
            <Wifi className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Сервер</p>
            <p className="text-lg font-semibold">Россия</p>
            <p className="text-xs text-gray-500">Москва • 12ms</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
