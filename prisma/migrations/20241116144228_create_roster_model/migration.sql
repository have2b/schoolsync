/*
  Warnings:

  - The primary key for the `DIEM` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `MaHP` on the `DIEM` table. All the data in the column will be lost.
  - The primary key for the `GIANGVIEN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HOCPHAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `HocKy` on the `HOCPHAN` table. All the data in the column will be lost.
  - You are about to drop the column `MaGV` on the `HOCPHAN` table. All the data in the column will be lost.
  - You are about to drop the column `NamHoc` on the `HOCPHAN` table. All the data in the column will be lost.
  - You are about to drop the column `NgayBatDau` on the `HOCPHAN` table. All the data in the column will be lost.
  - You are about to drop the column `NgayKetThuc` on the `HOCPHAN` table. All the data in the column will be lost.
  - The primary key for the `KHOA` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LOPHC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SINHVIEN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `MaKhoa` on the `SINHVIEN` table. All the data in the column will be lost.
  - The primary key for the `TAIKHOAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `MaLHP` to the `DIEM` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DIEM" DROP CONSTRAINT "DIEM_MaHP_fkey";

-- DropForeignKey
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_MaKhoa_fkey";

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

-- DropIndex
DROP INDEX "DIEM_MaHP_idx";

-- DropIndex
DROP INDEX "DIEM_MaSV_idx";

-- DropIndex
DROP INDEX "GIANGVIEN_HoTen_idx";

-- DropIndex
DROP INDEX "GIANGVIEN_MaTK_idx";

-- DropIndex
DROP INDEX "HOCPHAN_MaGV_idx";

-- DropIndex
DROP INDEX "LOPHC_MaGV_idx";

-- DropIndex
DROP INDEX "LOPHC_MaKhoa_idx";

-- DropIndex
DROP INDEX "SINHVIEN_HoTen_idx";

-- DropIndex
DROP INDEX "SINHVIEN_MaKhoa_idx";

-- DropIndex
DROP INDEX "SINHVIEN_MaLopHC_idx";

-- DropIndex
DROP INDEX "SINHVIEN_MaTK_idx";

-- AlterTable
ALTER TABLE "DIEM" DROP CONSTRAINT "DIEM_pkey",
DROP COLUMN "MaHP",
ADD COLUMN     "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "MaLHP" TEXT NOT NULL,
ADD CONSTRAINT "DIEM_pkey" PRIMARY KEY ("MaSV", "MaLHP");

-- AlterTable
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "MaTK" SET DATA TYPE TEXT,
ALTER COLUMN "MaKhoa" SET DATA TYPE TEXT,
ADD CONSTRAINT "GIANGVIEN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GIANGVIEN_id_seq";

-- AlterTable
ALTER TABLE "HOCPHAN" DROP CONSTRAINT "HOCPHAN_pkey",
DROP COLUMN "HocKy",
DROP COLUMN "MaGV",
DROP COLUMN "NamHoc",
DROP COLUMN "NgayBatDau",
DROP COLUMN "NgayKetThuc",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HOCPHAN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HOCPHAN_id_seq";

-- AlterTable
ALTER TABLE "KHOA" DROP CONSTRAINT "KHOA_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "KHOA_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "KHOA_id_seq";

-- AlterTable
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "MaKhoa" SET DATA TYPE TEXT,
ALTER COLUMN "MaGV" SET DATA TYPE TEXT,
ADD CONSTRAINT "LOPHC_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LOPHC_id_seq";

-- AlterTable
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_pkey",
DROP COLUMN "MaKhoa",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "MaTK" SET DATA TYPE TEXT,
ALTER COLUMN "MaLopHC" SET DATA TYPE TEXT,
ADD CONSTRAINT "SINHVIEN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SINHVIEN_id_seq";

-- AlterTable
ALTER TABLE "TAIKHOAN" DROP CONSTRAINT "TAIKHOAN_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TAIKHOAN_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TAIKHOAN_id_seq";

-- CreateTable
CREATE TABLE "LOPHOCPHAN" (
    "id" TEXT NOT NULL,
    "MaLHP" TEXT NOT NULL,
    "SoLuong" INTEGER NOT NULL,
    "HocKy" INTEGER NOT NULL,
    "NamHoc" INTEGER NOT NULL,
    "NgayBatDau" TIMESTAMP(3) NOT NULL,
    "NgayKetThuc" TIMESTAMP(3) NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,
    "MaHP" TEXT NOT NULL,
    "MaGV" TEXT NOT NULL,

    CONSTRAINT "LOPHOCPHAN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LOPHOCPHAN_MaLHP_key" ON "LOPHOCPHAN"("MaLHP");

-- AddForeignKey
ALTER TABLE "SINHVIEN" ADD CONSTRAINT "SINHVIEN_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "TAIKHOAN"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SINHVIEN" ADD CONSTRAINT "SINHVIEN_MaLopHC_fkey" FOREIGN KEY ("MaLopHC") REFERENCES "LOPHC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOPHC" ADD CONSTRAINT "LOPHC_MaKhoa_fkey" FOREIGN KEY ("MaKhoa") REFERENCES "KHOA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOPHC" ADD CONSTRAINT "LOPHC_MaGV_fkey" FOREIGN KEY ("MaGV") REFERENCES "GIANGVIEN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOPHOCPHAN" ADD CONSTRAINT "LOPHOCPHAN_MaHP_fkey" FOREIGN KEY ("MaHP") REFERENCES "HOCPHAN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOPHOCPHAN" ADD CONSTRAINT "LOPHOCPHAN_MaGV_fkey" FOREIGN KEY ("MaGV") REFERENCES "GIANGVIEN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GIANGVIEN" ADD CONSTRAINT "GIANGVIEN_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "TAIKHOAN"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GIANGVIEN" ADD CONSTRAINT "GIANGVIEN_MaKhoa_fkey" FOREIGN KEY ("MaKhoa") REFERENCES "KHOA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DIEM" ADD CONSTRAINT "DIEM_MaLHP_fkey" FOREIGN KEY ("MaLHP") REFERENCES "LOPHOCPHAN"("MaLHP") ON DELETE RESTRICT ON UPDATE CASCADE;
