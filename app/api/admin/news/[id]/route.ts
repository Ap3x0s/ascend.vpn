import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await params;

  const news = await prisma.news.findUnique({
    where: { id },
    include: {
      author: {
        select: { email: true },
      },
    },
  });

  if (!news) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ news });
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
  const { title, content, published } = body;

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const news = await prisma.news.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(published !== undefined && { published }),
    },
  });

  await logAction(
    session.user.id,
    "news_updated",
    id,
    `Updated news: ${news.title}`
  );

  return NextResponse.json({ news });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

  const { id } = await params;

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await logAction(
    session.user.id,
    "news_deleted",
    id,
    `Deleted news: ${existing.title}`
  );

  await prisma.news.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
