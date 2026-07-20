import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function GET() {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      role: true,
      lastLogin: true,
      createdAt: true,
      twoFactorEnabled: true,
    },
  });

  return NextResponse.json({ admins });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { email, password, role } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email и пароль обязательны" },
      { status: 400 }
    );
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Админ с таким email уже существует" },
      { status: 409 }
    );
  }

  const passwordHash = await hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      passwordHash,
      role: role || "admin",
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  await logAction(
    session.user.id,
    "admin_created",
    admin.id,
    `Created admin ${admin.email} with role ${admin.role}`
  );

  return NextResponse.json({ admin }, { status: 201 });
}
