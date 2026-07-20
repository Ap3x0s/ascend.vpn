import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeAdmin, verify2FAToken } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        twoFactorToken: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await authorizeAdmin(
          credentials.email,
          credentials.password
        );

        if (!admin) {
          return null;
        }

        if (admin.twoFactorEnabled) {
          if (!credentials.twoFactorToken) {
            throw new Error("2FA_REQUIRED");
          }

          const adminRecord = await prisma.admin.findUnique({
            where: { id: admin.id },
            select: { twoFactorSecret: true },
          });

          if (!adminRecord?.twoFactorSecret) {
            return null;
          }

          const isValid = verify2FAToken(
            adminRecord.twoFactorSecret,
            credentials.twoFactorToken
          );

          if (!isValid) {
            return null;
          }
        }

        await prisma.admin.update({
          where: { id: admin.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: admin.id,
          email: admin.email,
          name: admin.email.split("@")[0],
          role: admin.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
