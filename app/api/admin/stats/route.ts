import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalUsers,
    usersThisMonth,
    usersLastMonth,
    monthRevenue,
    lastMonthRevenue,
    activeServers,
    recentUsers,
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.user.count({
      where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { date: { gte: startOfMonth }, status: "completed" },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: startOfLastMonth, lte: endOfLastMonth },
        status: "completed",
      },
    }),
    prisma.server.count({ where: { status: "online" } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    }),
    prisma.payment.findMany({
      orderBy: { date: "desc" },
      take: 5,
      select: {
        id: true,
        amount: true,
        currency: true,
        plan: true,
        status: true,
        date: true,
        user: { select: { email: true } },
      },
    }),
  ]);

  const currentRevenue = monthRevenue._sum.amount ?? 0;
  const prevRevenue = lastMonthRevenue._sum.amount ?? 0;
  const revenueTrend =
    prevRevenue > 0
      ? Math.round(((currentRevenue - prevRevenue) / prevRevenue) * 100)
      : 0;

  const usersTrend =
    usersLastMonth > 0
      ? Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100)
      : 0;

  return NextResponse.json({
    stats: {
      totalUsers,
      monthRevenue: currentRevenue,
      activeServers,
      recentRegistrations: usersThisMonth,
      usersTrend,
      revenueTrend,
    },
    recentUsers,
    recentPayments,
  });
}
