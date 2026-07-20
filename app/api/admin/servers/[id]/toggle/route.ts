import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function POST(
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

  const newStatus = server.status === "online" ? "offline" : "online";

  const updated = await prisma.server.update({
    where: { id },
    data: { status: newStatus },
  });

  return NextResponse.json({ server: updated });
}
