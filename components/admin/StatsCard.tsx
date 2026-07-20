import { ReactNode } from "react";
import { IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ icon, value, label, trend }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-[#1a1a2e] bg-[#0c0c16] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple">
            {icon}
          </div>
          <span className="text-sm text-gray-400">{label}</span>
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend.isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend.isPositive ? (
              <IconTrendingUp className="h-4 w-4" />
            ) : trend.value === 0 ? (
              <IconMinus className="h-4 w-4 text-gray-400" />
            ) : (
              <IconTrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
    </div>
  );
}
