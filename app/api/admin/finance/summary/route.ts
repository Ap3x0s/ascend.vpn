import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

function getPeriodDate(period: string): Date {
  const now = new Date();
  switch (period) {
    case "day":
      now.setHours(0, 0, 0, 0);
      return now;
    case "week":
      now.setDate(now.getDate() - 7);
      return now;
    case "month":
      now.setMonth(now.getMonth() - 1);
      return now;
    case "year":
      now.setFullYear(now.getFullYear() - 1);
      return now;
    default:
      now.setMonth(now.getMonth() - 1);
      return now;
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "month";

  const dateFrom = getPeriodDate(period);

  const result = await prisma.payment.aggregate({
    where: {
      status: "completed",
      date: { gte: dateFrom },
    },
    _sum: { amount: true },
    _count: true,
  });

  const totalRevenue = result._sum.amount || 0;
  const paymentCount = result._count;
  const averageCheck = paymentCount > 0 ? Math.round(totalRevenue / paymentCount) : 0;

  return NextResponse.json({
    totalRevenue,
    paymentCount,
    averageCheck,
  });
}
