import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize")) || 10));
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const where: Record<string, any> = {};

  if (search) {
    where.email = { contains: search };
  }

  if (status && (status === "active" || status === "blocked")) {
    where.status = status;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
        subscriptions: {
          select: {
            plan: true,
            status: true,
            endDate: true,
          },
        },
        devices: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ users, total });
}
