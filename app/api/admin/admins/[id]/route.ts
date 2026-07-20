import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const admin = await prisma.admin.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      lastLogin: true,
      createdAt: true,
      twoFactorEnabled: true,
    },
  });

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json({ admin });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.admin.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {};

  if (body.role !== undefined) {
    updateData.role = body.role;
  }

  if (body.password) {
    updateData.passwordHash = await hash(body.password, 12);
  }

  const updated = await prisma.admin.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      role: true,
      lastLogin: true,
      createdAt: true,
      twoFactorEnabled: true,
    },
  });

  await logAction(
    session.user.id,
    "admin_updated",
    id,
    `Updated admin ${updated.email}: role=${updated.role}`
  );

  return NextResponse.json({ admin: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const admin = await prisma.admin.findUnique({ where: { id } });
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  if (admin.email === "admin@ascendvpn.com") {
    return NextResponse.json(
      { error: "Нельзя удалить главного администратора" },
      { status: 403 }
    );
  }

  await logAction(
    session.user.id,
    "admin_deleted",
    id,
    `Deleted admin ${admin.email}`
  );

  await prisma.admin.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
