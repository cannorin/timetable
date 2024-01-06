/*
  Warnings:

  - The primary key for the `Timetable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TimetableApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TimetableRow` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TimetableApplication" DROP CONSTRAINT "TimetableApplication_rowId_tableId_fkey";

-- DropForeignKey
ALTER TABLE "TimetableRow" DROP CONSTRAINT "TimetableRow_tableId_userId_fkey";

-- AlterTable
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Timetable_id_seq";

-- AlterTable
ALTER TABLE "TimetableApplication" DROP CONSTRAINT "TimetableApplication_pkey",
ALTER COLUMN "rowId" SET DATA TYPE TEXT,
ALTER COLUMN "tableId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TimetableApplication_pkey" PRIMARY KEY ("rowId", "userId");

-- AlterTable
ALTER TABLE "TimetableRow" DROP CONSTRAINT "TimetableRow_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tableId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TimetableRow_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TimetableRow_id_seq";

-- AddForeignKey
ALTER TABLE "TimetableApplication" ADD CONSTRAINT "TimetableApplication_rowId_tableId_fkey" FOREIGN KEY ("rowId", "tableId") REFERENCES "TimetableRow"("id", "tableId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableRow" ADD CONSTRAINT "TimetableRow_tableId_userId_fkey" FOREIGN KEY ("tableId", "userId") REFERENCES "Timetable"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
