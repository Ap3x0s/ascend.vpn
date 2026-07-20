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

  const server = await prisma.server.findUnique({ where: { id } });

  if (!server) {
    return NextResponse.json({ error: "Сервер не найден" }, { status: 404 });
  }

  return NextResponse.json({ server });
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

  const server = await prisma.server.findUnique({ where: { id } });
  if (!server) {
    return NextResponse.json({ error: "Сервер не найден" }, { status: 404 });
  }

  const updated = await prisma.server.update({
    where: { id },
    data: {
      name: body.name !== undefined ? body.name : undefined,
      country: body.country !== undefined ? body.country : undefined,
      city: body.city !== undefined ? body.city : undefined,
      ip: body.ip !== undefined ? body.ip : undefined,
      maxUsers: body.maxUsers !== undefined ? body.maxUsers : undefined,
    },
  });

  await logAction(
    session.user.id,
    "server_updated",
    id,
    `Updated server ${updated.name}`
  );

  return NextResponse.json({ server: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

  const { id } = await params;

  const server = await prisma.server.findUnique({ where: { id } });
  if (!server) {
    return NextResponse.json({ error: "Сервер не найден" }, { status: 404 });
  }

  await prisma.server.delete({ where: { id } });

  await logAction(
    session.user.id,
    "server_deleted",
    id,
    `Deleted server ${server.name} (${server.ip})`
  );

  return NextResponse.json({ success: true });
}
