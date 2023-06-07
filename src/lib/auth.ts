import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

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

        if (res.data.status !== 200) throw new Error("Usuário ou senha incorretos");

        return {
          session: {
            user: {
              id: res.data.response.id,
              name: res.data.response.username,
              token: res.data.response.api_token
            }
          }
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      return { ...token, ...user }
    },
    session: ({ session, token }) => {
      return { ...session, ...token }
    }
  },
};
