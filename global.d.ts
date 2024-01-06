import type { DefaultSession } from "next-auth";
import type { Range as RangeType, Slot as SlotType } from "./lib/types";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined;
    } & DefaultSession["user"];
  }
}

declare global {
  namespace PrismaJson {
    type Range = RangeType;

    type Slot = SlotType;
  }
}
