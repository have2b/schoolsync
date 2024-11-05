/*
  Warnings:

  - The primary key for the `DIEM` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GIANGVIEN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HOCPHAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KHOA` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LOPHC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SINHVIEN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TAIKHOAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `MaTK` on the `TAIKHOAN` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[MaGV]` on the table `GIANGVIEN` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[MaHP]` on the table `HOCPHAN` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[TenHP]` on the table `HOCPHAN` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[MaKhoa]` on the table `KHOA` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[TenKhoa]` on the table `KHOA` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[MaLopHC]` on the table `LOPHC` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[TenLopHC]` on the table `LOPHC` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[MaSV]` on the table `SINHVIEN` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DIEM" DROP CONSTRAINT "DIEM_MaHP_fkey";

-- DropForeignKey
ALTER TABLE "DIEM" DROP CONSTRAINT "DIEM_MaSV_fkey";

-- DropForeignKey
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_MaTK_fkey";

-- DropForeignKey
ALTER TABLE "HOCPHAN" DROP CONSTRAINT "HOCPHAN_MaGV_fkey";

-- DropForeignKey
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_MaGV_fkey";

-- DropForeignKey
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_MaKhoa_fkey";

-- DropForeignKey
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_MaKhoa_fkey";

-- DropForeignKey
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_MaLopHC_fkey";

-- DropForeignKey
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_MaTK_fkey";

-- AlterTable
ALTER TABLE "DIEM" DROP CONSTRAINT "DIEM_pkey",
ALTER COLUMN "MaSV" SET DATA TYPE TEXT,
ALTER COLUMN "MaHP" SET DATA TYPE TEXT,
ADD CONSTRAINT "DIEM_pkey" PRIMARY KEY ("MaSV", "MaHP");

-- AlterTable
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "MaGV" DROP DEFAULT,
ALTER COLUMN "MaGV" SET DATA TYPE TEXT,
ADD CONSTRAINT "GIANGVIEN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GIANGVIEN_MaGV_seq";

-- AlterTable
ALTER TABLE "HOCPHAN" DROP CONSTRAINT "HOCPHAN_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "MaHP" DROP DEFAULT,
ALTER COLUMN "MaHP" SET DATA TYPE TEXT,
ADD CONSTRAINT "HOCPHAN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HOCPHAN_MaHP_seq";

-- AlterTable
ALTER TABLE "KHOA" DROP CONSTRAINT "KHOA_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "MaKhoa" DROP DEFAULT,
ALTER COLUMN "MaKhoa" SET DATA TYPE TEXT,
ADD CONSTRAINT "KHOA_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "KHOA_MaKhoa_seq";

-- AlterTable
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "MaLopHC" DROP DEFAULT,
ALTER COLUMN "MaLopHC" SET DATA TYPE TEXT,
ADD CONSTRAINT "LOPHC_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LOPHC_MaLopHC_seq";

-- AlterTable
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "MaSV" DROP DEFAULT,
ALTER COLUMN "MaSV" SET DATA TYPE TEXT,
ADD CONSTRAINT "SINHVIEN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SINHVIEN_MaSV_seq";

-- AlterTable
ALTER TABLE "TAIKHOAN" DROP CONSTRAINT "TAIKHOAN_pkey",
DROP COLUMN "MaTK",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TAIKHOAN_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "GIANGVIEN_MaGV_key" ON "GIANGVIEN"("MaGV");

-- CreateIndex
CREATE UNIQUE INDEX "HOCPHAN_MaHP_key" ON "HOCPHAN"("MaHP");

-- CreateIndex
CREATE UNIQUE INDEX "HOCPHAN_TenHP_key" ON "HOCPHAN"("TenHP");

-- CreateIndex
CREATE UNIQUE INDEX "KHOA_MaKhoa_key" ON "KHOA"("MaKhoa");

-- CreateIndex
CREATE UNIQUE INDEX "KHOA_TenKhoa_key" ON "KHOA"("TenKhoa");

-- CreateIndex
CREATE UNIQUE INDEX "LOPHC_MaLopHC_key" ON "LOPHC"("MaLopHC");

-- CreateIndex
CREATE UNIQUE INDEX "LOPHC_TenLopHC_key" ON "LOPHC"("TenLopHC");

-- CreateIndex
CREATE UNIQUE INDEX "SINHVIEN_MaSV_key" ON "SINHVIEN"("MaSV");

-- AddForeignKey
ALTER TABLE "SINHVIEN" ADD CONSTRAINT "SINHVIEN_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "TAIKHOAN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SINHVIEN" ADD CONSTRAINT "SINHVIEN_MaKhoa_fkey" FOREIGN KEY ("MaKhoa") REFERENCES "KHOA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SINHVIEN" ADD CONSTRAINT "SINHVIEN_MaLopHC_fkey" FOREIGN KEY ("MaLopHC") REFERENCES "LOPHC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOPHC" ADD CONSTRAINT "LOPHC_MaKhoa_fkey" FOREIGN KEY ("MaKhoa") REFERENCES "KHOA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOPHC" ADD CONSTRAINT "LOPHC_MaGV_fkey" FOREIGN KEY ("MaGV") REFERENCES "GIANGVIEN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HOCPHAN" ADD CONSTRAINT "HOCPHAN_MaGV_fkey" FOREIGN KEY ("MaGV") REFERENCES "GIANGVIEN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GIANGVIEN" ADD CONSTRAINT "GIANGVIEN_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "TAIKHOAN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DIEM" ADD CONSTRAINT "DIEM_MaSV_fkey" FOREIGN KEY ("MaSV") REFERENCES "SINHVIEN"("MaSV") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DIEM" ADD CONSTRAINT "DIEM_MaHP_fkey" FOREIGN KEY ("MaHP") REFERENCES "HOCPHAN"("MaHP") ON DELETE RESTRICT ON UPDATE CASCADE;
