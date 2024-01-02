"use client";

import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaDiscord } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LogInOutButton({
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
