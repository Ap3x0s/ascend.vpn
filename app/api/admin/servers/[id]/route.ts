import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  return NextResponse.json({ server: updated });
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

  const server = await prisma.server.findUnique({ where: { id } });
  if (!server) {
    return NextResponse.json({ error: "Сервер не найден" }, { status: 404 });
  }

  await prisma.server.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
