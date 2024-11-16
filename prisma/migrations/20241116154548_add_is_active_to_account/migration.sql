/*
  Warnings:

  - You are about to drop the column `DangHoatDong` on the `GIANGVIEN` table. All the data in the column will be lost.
  - You are about to drop the column `DangHoatDong` on the `SINHVIEN` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GIANGVIEN" DROP COLUMN "DangHoatDong";

-- AlterTable
ALTER TABLE "SINHVIEN" DROP COLUMN "DangHoatDong";

-- AlterTable
ALTER TABLE "TAIKHOAN" ADD COLUMN     "DangHoatDong" BOOLEAN NOT NULL DEFAULT true;
