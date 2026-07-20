import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const actionFilter = searchParams.get("action") || "";
  const adminFilter = searchParams.get("adminId") || "";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";

  const where: Record<string, any> = {};

  if (actionFilter) {
    where.action = actionFilter;
  }

  if (adminFilter) {
    where.adminId = adminFilter;
  }

  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) where.createdAt.gte = new Date(dateFrom);
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      where.createdAt.lte = to;
    }
  }

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      action: true,
      targetId: true,
      details: true,
      ip: true,
      createdAt: true,
      admin: {
        select: { email: true },
      },
    },
  });

  const escapeCsv = (val: string) =>
    val.includes(",") || val.includes('"') || val.includes("\n")
      ? `"${val.replace(/"/g, '""')}"`
      : val;

  const header = "Дата,Админ,Действие,Объект,IP\n";
  const rows = logs
    .map((log) => {
      const date = new Date(log.createdAt).toLocaleString("ru-RU");
      const admin = log.admin.email;
      const action = log.action;
      const target = log.targetId || "";
      const ip = log.ip || "";
      return [date, admin, action, target, ip].map(escapeCsv).join(",");
    })
    .join("\n");

  const bom = "\uFEFF";
  return new NextResponse(bom + header + rows, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="audit_logs.csv"',
    },
  });
}
