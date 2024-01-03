"use server";

import { auth } from "./auth";

export async function getCurrentUserId() {
  const session = await auth();
  if (!session || !session.user.id) return null;
  return session.user.id;
}
