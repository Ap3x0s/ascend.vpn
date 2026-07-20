import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { email: true },
      },
    },
  });

  return NextResponse.json({ news });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

  const adminId = (session.user as any).id;

  const body = await request.json();
  const { title, content, published } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const news = await prisma.news.create({
    data: {
      title,
      content,
      published: published ?? false,
      authorId: adminId,
    },
  });

  await logAction(
    adminId,
    "news_created",
    news.id,
    `Created news: ${news.title}`
  );

  return NextResponse.json({ news }, { status: 201 });
}
