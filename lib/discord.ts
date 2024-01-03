import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { upsertDiscordUser } from "./user";

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
        await upsertDiscordUser(user);
        return {
          ...session,
          user,
        };
      }
      return session;
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
