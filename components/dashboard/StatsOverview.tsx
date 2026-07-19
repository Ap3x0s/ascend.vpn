"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  IconShieldCheck,
  IconClock,
  IconDeviceDesktop,
  IconWorld,
} from "@tabler/icons-react";
import { getPlanName } from "@/lib/constants";

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
  const endDate = subscription ? new Date(subscription.endDate) : null;
  const daysLeft = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const totalDays = subscription
    ? Math.ceil(
        (new Date(subscription.endDate).getTime() -
          new Date(subscription.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 30;

  const progressWidth = Math.min(100, (daysLeft / (totalDays || 1)) * 100);
  const planName = subscription ? getPlanName(subscription.plan) : "—";
  const isActive = subscription?.status === "active";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${isActive ? "bg-green-500/15" : "bg-gray-500/15"}`}>
              <IconShieldCheck className={`w-5 h-5 ${isActive ? "text-green-400" : "text-gray-400"}`} />
            </div>
            <span className="text-sm text-muted">Статус</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {isActive ? "Активна" : "Неактивна"}
          </p>
          <p className="text-xs text-dim mt-1">{planName}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent-purple/15">
              <IconClock className="w-5 h-5 text-accent-purple" />
            </div>
            <span className="text-sm text-muted">Осталось дней</span>
          </div>
          <p className="text-lg font-semibold text-white">{daysLeft}</p>
          <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-violet"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent-blue/15">
              <IconDeviceDesktop className="w-5 h-5 text-accent-blue" />
            </div>
            <span className="text-sm text-muted">Устройства</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {activeDevices} / {devicesCount}
          </p>
          <p className="text-xs text-dim mt-1">активных</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent-violet/15">
              <IconWorld className="w-5 h-5 text-accent-violet" />
            </div>
            <span className="text-sm text-muted">Локации</span>
          </div>
          <p className="text-lg font-semibold text-white">4</p>
          <p className="text-xs text-dim mt-1">доступно</p>
        </CardContent>
      </Card>
    </div>
  );
}
