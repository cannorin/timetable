import { auth } from "@/lib/discord";
import LogInOutButtonClient from "./client";
import type { LogInOutButtonProps } from "./client";

export default async function LogInOutButton(
  props: Omit<LogInOutButtonProps, "session">,
) {
  const session = await auth();
  return <LogInOutButtonClient session={session ?? null} {...props} />;
}
