import NextAuth from "next-auth";
import { config } from "@/lib/discord";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
