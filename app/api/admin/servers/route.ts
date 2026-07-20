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
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize")) || 10));
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const where: Record<string, any> = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { ip: { contains: search } },
    ];
  }

  if (status && (status === "online" || status === "offline")) {
    where.status = status;
  }

  const [servers, total] = await Promise.all([
    prisma.server.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.server.count({ where }),
  ]);

  return NextResponse.json({ servers, total });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name || !body.country || !body.city || !body.ip) {
    return NextResponse.json(
      { error: "Обязательные поля: name, country, city, ip" },
      { status: 400 }
    );
  }

  const server = await prisma.server.create({
    data: {
      name: body.name,
      country: body.country,
      city: body.city,
      ip: body.ip,
      maxUsers: body.maxUsers || 100,
      status: "online",
      load: 0,
      ping: 0,
    },
  });

  return NextResponse.json({ server }, { status: 201 });
}
