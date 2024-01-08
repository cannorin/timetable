"use client";

import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LogInOutButton({
  className,
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick">) {
  const { data: session } = useSession();
  return (
    <Button
      variant={session ? "ghost" : "discord"}
      className={cn("flex flex-row justify-center gap-2", className)}
      onClick={() => (session ? signOut() : signIn("discord"))}
      {...props}>
      {children ?? (
        <>
          <FaDiscord className="h-4 w-4 shrink-0" />
          <span>{session ? "Sign out" : "Sign in"}</span>
        </>
      )}
    </Button>
  );
}
