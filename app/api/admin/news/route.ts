import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  return NextResponse.json({ news }, { status: 201 });
}
