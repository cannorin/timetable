"use server";

import { Session } from "next-auth";
import { prisma } from "./prisma";

export async function upsertDiscordUser(user: Session["user"]) {
  const { id: discord_id, name, email, image: avatar } = user;
  if (discord_id && name && email && avatar) {
    await prisma.user.upsert({
      where: { discord_id },
      update: { name, email, avatar },
      create: { name, discord_id, email, avatar },
    });
  }
}
