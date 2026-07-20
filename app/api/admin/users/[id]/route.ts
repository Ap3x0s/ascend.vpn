import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      subscriptions: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          plan: true,
          startDate: true,
          endDate: true,
          status: true,
        },
      },
      devices: {
        orderBy: { lastActive: "desc" },
        select: {
          id: true,
          name: true,
          type: true,
          lastActive: true,
          isActive: true,
        },
      },
      payments: {
        orderBy: { date: "desc" },
        take: 10,
        select: {
          id: true,
          amount: true,
          currency: true,
          plan: true,
          status: true,
          date: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

  const { id } = await params;
  const body = await request.json();

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      name: body.name !== undefined ? body.name : undefined,
      status: body.status !== undefined ? body.status : undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      createdAt: true,
    },
  });

  await logAction(
    (session.user as any).id,
    "user.update",
    id,
    JSON.stringify({ email: user.email, changes: body })
  );

  return NextResponse.json({ user: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await logAction(
    (session.user as any).id,
    "user.delete",
    id,
    JSON.stringify({ email: user.email })
  );

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
