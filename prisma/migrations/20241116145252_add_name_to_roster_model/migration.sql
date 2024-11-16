/*
  Warnings:

  - Added the required column `TenLHP` to the `LOPHOCPHAN` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LOPHOCPHAN" ADD COLUMN     "TenLHP" TEXT NOT NULL;
