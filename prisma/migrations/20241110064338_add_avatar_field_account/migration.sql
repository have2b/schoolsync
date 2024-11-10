/*
  Warnings:

  - Added the required column `AnhDaiDien` to the `TAIKHOAN` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TAIKHOAN" ADD COLUMN     "AnhDaiDien" TEXT NOT NULL;
