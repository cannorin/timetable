"use client";

import * as React from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { FaDiscord } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface LogInOutButtonProps
  extends Omit<
    React.HTMLAttributes<HTMLButtonElement>,
    "onClick" | "children"
  > {
  session?: Session | null;
}

function LogInOutButtonImpl({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick" | "children">) {
  const { data: session } = useSession();
  return (
    <Button
      variant={session ? "secondary" : "discord"}
      className={cn("flex max-w-28 flex-row gap-2", className)}
      onClick={() => (session ? signOut() : signIn("discord"))}
      {...props}>
      <FaDiscord />
      <span>{session ? "Sign Out" : "Sign In"}</span>
    </Button>
  );
}

export default function LogInOutButtonClient({
  session,
  ...props
}: LogInOutButtonProps) {
  return (
    <SessionProvider session={session ?? null}>
      <LogInOutButtonImpl {...props} />
    </SessionProvider>
  );
}
