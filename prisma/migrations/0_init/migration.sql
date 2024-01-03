-- CreateEnum
CREATE TYPE "TimetableState" AS ENUM ('DRAFT', 'APPLY', 'ASSIGN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableApplication" (
    "rowId" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "range" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimetableApplication_pkey" PRIMARY KEY ("rowId","userId")
);

-- CreateTable
CREATE TABLE "TimetableRow" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "slots" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimetableRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timetable" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "TimetableState" NOT NULL,
    "applyLimit" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "TimetableApplication_tableId_rowId_userId_idx" ON "TimetableApplication"("tableId", "rowId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "TimetableRow_id_key" ON "TimetableRow"("id");

-- CreateIndex
CREATE INDEX "TimetableRow_tableId_idx" ON "TimetableRow"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "TimetableRow_id_tableId_key" ON "TimetableRow"("id", "tableId");

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_id_key" ON "Timetable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_id_userId_key" ON "Timetable"("id", "userId");

-- AddForeignKey
ALTER TABLE "TimetableApplication" ADD CONSTRAINT "TimetableApplication_rowId_tableId_fkey" FOREIGN KEY ("rowId", "tableId") REFERENCES "TimetableRow"("id", "tableId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableApplication" ADD CONSTRAINT "TimetableApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableRow" ADD CONSTRAINT "TimetableRow_tableId_userId_fkey" FOREIGN KEY ("tableId", "userId") REFERENCES "Timetable"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
