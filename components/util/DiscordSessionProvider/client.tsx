"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export default function DiscordSessionProviderClient({
  session,
  children,
}: React.PropsWithChildren<{ session?: Session | null | undefined }>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
