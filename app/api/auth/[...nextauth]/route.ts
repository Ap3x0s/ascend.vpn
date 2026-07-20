import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

const handler = NextAuth(authOptions);

async function auth(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (request.method === "POST") {
    const rl = rateLimit(`login:${ip}`, 10, 60000);
    if (!rl.allowed) {
      return Response.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }
  }

  return (handler as any)(request);
}

export { auth as GET, auth as POST };
