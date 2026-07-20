import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ news });
}
