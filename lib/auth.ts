import "server-only";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "./prisma";

const scopes = ["identify", "email"];

export const config = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: { params: { scope: scopes.join(" ") } },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.picture?.includes("discord") && token.sub) {
        const user = {
          ...session.user,
          id: token.sub,
        };
        return {
          ...session,
          user,
        };
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      const { id, name, email, image: avatar } = user;
      if (id && name && email && avatar) {
        await prisma.user.upsert({
          where: { id },
          update: { name, email, avatar },
          create: { name, id, email, avatar },
        });
      }
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
