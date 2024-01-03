import { prisma } from "./prisma";
import { getCurrentUserId } from "./user";

export async function deleteApplication(rowId: number) {
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

export async function deleteRow(id: number) {
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

export async function deleteTable(id: number) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  await prisma.timetable.delete({
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
}
