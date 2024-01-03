import * as React from "react";
import DiscordSessionProviderClient from "./client";
import { auth } from "@/lib/auth";

export default async function DiscordSessionProvider({
  children,
}: React.PropsWithChildren) {
  const session = await auth();
  return (
    <DiscordSessionProviderClient session={session}>
      {children}
    </DiscordSessionProviderClient>
  );
}
