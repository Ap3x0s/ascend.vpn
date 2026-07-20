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
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only superadmin can create admins
  const role = (session.user as any)?.role;
  if (role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { email, password, role: newAdminRole } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email и пароль обязательны" },
      { status: 400 }
    );
  }

  // Validate role: only allow 'admin'
  if (newAdminRole && newAdminRole !== "admin") {
    return NextResponse.json(
      { error: "Допустимая роль: admin" },
      { status: 400 }
    );
  }

  // Password validation: min 12 chars, uppercase, lowercase, number
  if (password.length < 12) {
    return NextResponse.json(
      { error: "Пароль должен содержать минимум 12 символов" },
      { status: 400 }
    );
  }
  if (!/[A-Z]/.test(password)) {
    return NextResponse.json(
      { error: "Пароль должен содержать хотя бы одну заглавную букву" },
      { status: 400 }
    );
  }
  if (!/[a-z]/.test(password)) {
    return NextResponse.json(
      { error: "Пароль должен содержать хотя бы одну строчную букву" },
      { status: 400 }
    );
  }
  if (!/[0-9]/.test(password)) {
    return NextResponse.json(
      { error: "Пароль должен содержать хотя бы одну цифру" },
      { status: 400 }
    );
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    // Generic error to prevent email enumeration
    return NextResponse.json(
      { error: "Невозможно создать администратора" },
      { status: 409 }
    );
  }

  const passwordHash = await hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      passwordHash,
      role: "admin",
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
