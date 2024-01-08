"use server";

import { auth } from "./auth";

export async function getUser() {
  const session = await auth();
  if (!session) return {};
  const { name, id, image } = session.user;
  if (name && id && image) return { name, id, image };
  return {};
}

export async function getUserId() {
  const session = await auth();
  if (!session || !session.user.id) return null;
  return session.user.id;
}
