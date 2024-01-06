"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { memoize } from "lodash";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { getUserId } from "./user";
import { appTag, rowTag, tableTag } from "./cache";

export async function deleteApplication(rowId: string) {
  const userId = await getUserId();
  if (!userId) return;

  await prisma.timetableApplication.delete({
    where: {
      id: {
        rowId,
        userId: userId,
      },
    },
  });
}

export async function deleteRow(id: string) {
  const userId = await getUserId();
  if (!userId) return;

  await prisma.timetableRow.delete({
    where: {
      id,
      userId,
    },
    include: {
      apps: {
        where: { tableId: id },
      },
    },
  });
}

const getTableImpl = memoize((id: string) =>
  unstable_cache(
    async () => {
      return await prisma.timetable.findUnique({
        where: { id },
      });
    },
    ["getTable"],
    {
      tags: [tableTag(id)],
    },
  ),
);

export const getTable = (id: string) => getTableImpl(id)();

export async function createTable(
  input: Omit<Prisma.TimetableUncheckedCreateInput, "userId">,
) {
  const userId = await getUserId();
  if (!userId) return;

  const resp = await prisma.timetable.create({
    data: {
      ...input,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  revalidateTag(tableTag());
  revalidateTag(tableTag(resp.id));

  return resp;
}

export async function updateTable(
  id: string,
  input: Omit<Prisma.TimetableUncheckedUpdateInput, "id" | "userId">,
) {
  const userId = await getUserId();
  if (!userId) return;

  const resp = await prisma.timetable.update({
    where: {
      id,
      userId,
    },
    data: {
      ...input,
    },
  });

  revalidateTag(tableTag());
  revalidateTag(tableTag(resp.id));

  return resp;
}

export async function deleteTable(id: string) {
  const userId = await getUserId();
  if (!userId) return;

  const resp = await prisma.timetable.delete({
    where: {
      id,
      userId,
    },
    include: {
      rows: {
        where: { tableId: id },
        include: {
          apps: {
            where: { tableId: id },
          },
        },
      },
    },
  });

  revalidateTag(tableTag());
  revalidateTag(tableTag(resp.id));
  revalidateTag(rowTag());
  revalidateTag(rowTag(resp.id));
  revalidateTag(appTag());
  revalidateTag(appTag(resp.id));

  return resp;
}
