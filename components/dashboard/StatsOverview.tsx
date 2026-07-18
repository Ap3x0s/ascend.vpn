"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IconShieldCheck, IconClock, IconDeviceDesktop, IconServer } from "@tabler/icons-react";

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
          <div className="p-3 rounded-xl bg-accent-purple/15">
            <IconShieldCheck className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <p className="text-sm text-muted">Статус</p>
            <p className="text-lg font-semibold text-white">
              {isActive ? "Активна" : "Неактивна"}
            </p>
            <p className="text-xs text-dim">{planName}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-violet/15">
            <IconClock className="w-6 h-6 text-accent-violet" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted">Осталось дней</p>
            <p className="text-lg font-semibold text-white">{daysLeft}</p>
            <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-blue/15">
            <IconDeviceDesktop className="w-6 h-6 text-accent-blue" />
          </div>
          <div>
            <p className="text-sm text-muted">Устройства</p>
            <p className="text-lg font-semibold text-white">
              {activeDevices} / {devicesCount}
            </p>
            <p className="text-xs text-dim">активных</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-purple/15">
            <IconServer className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <p className="text-sm text-muted">Сервер</p>
            <p className="text-lg font-semibold text-white">Россия</p>
            <p className="text-xs text-dim">Москва • 12ms</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
