import { prisma } from "./prisma";
import { getCurrentUserId } from "./user";
import { Prisma } from "@prisma/client";

export async function deleteApplication(rowId: string) {
  const userId = await getCurrentUserId();
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
  const userId = await getCurrentUserId();
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

export async function createTable(
  input: Omit<Prisma.TimetableUncheckedCreateInput, "userId">,
) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const resp = await prisma.timetable.create({
    data: {
      ...input,
      userId,
    },
  });

  return resp;
}

export async function updateTable(
  id: string,
  input: Omit<Prisma.TimetableUncheckedUpdateInput, "id" | "userId">,
) {
  const userId = await getCurrentUserId();
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

  return resp;
}

export async function deleteTable(id: string) {
  const userId = await getCurrentUserId();
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

  return resp;
}
