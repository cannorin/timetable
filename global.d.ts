import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined;
    } & DefaultSession["user"];
  }
}

type Branded<K, T> = K & { __brand: T };

type Minute = Branded<number, "Minute">;

declare global {
  namespace PrismaJson {
    type Range = {
      offset: Minute;
      length: Minute;
    };

    type Slot = Range & {
      name?: string | null;
      discord_id?: string | null;
    };
  }
}
