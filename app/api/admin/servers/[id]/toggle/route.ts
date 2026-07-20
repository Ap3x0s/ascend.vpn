import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function POST(
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

  const newStatus = server.status === "online" ? "offline" : "online";

  const updated = await prisma.server.update({
    where: { id },
    data: { status: newStatus },
  });

  await logAction(
    session.user.id,
    "server_toggled",
    id,
    `Toggled server ${server.name} from ${server.status} to ${newStatus}`
  );

  return NextResponse.json({ server: updated });
}
