import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

interface Session {
  id: string,
  username: string
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Usuário", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials.password) {
          return null;
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          username: credentials.name,
          password: credentials.password,
        })

        if (res.data.status !== 200) return null

        return {
          id: res.data.response.id,
          name: res.data.response.username,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          name: u.name,
          id: u.id,
        };
      }
      return token;
    }
  },
};
