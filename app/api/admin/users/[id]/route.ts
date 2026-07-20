import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

// Helper to check admin role
async function requireAdmin() {
  const session = await getServerSession(adminAuthOptions);
  if (!session) return { error: "Unauthorized", status: 401 };
  const role = (session.user as any)?.role;
  if (role !== "admin" && role !== "superadmin") {
    return { error: "Forbidden", status: 403 };
  }
  return { session };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

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
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

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

  // Log the action
  await logAction(
    (auth.session.user as any).id,
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
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Log before deletion
  await logAction(
    (auth.session.user as any).id,
    "user.delete",
    id,
    JSON.stringify({ email: user.email })
  );

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
