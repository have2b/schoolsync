/*
  Warnings:

  - The primary key for the `GIANGVIEN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GIANGVIEN` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `HOCPHAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HOCPHAN` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `KHOA` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `KHOA` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LOPHC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LOPHC` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LOPHOCPHAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LOPHOCPHAN` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SINHVIEN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SINHVIEN` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TAIKHOAN` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TAIKHOAN` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `MaTK` on the `GIANGVIEN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaKhoa` on the `GIANGVIEN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaKhoa` on the `LOPHC` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaGV` on the `LOPHC` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaHP` on the `LOPHOCPHAN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaGV` on the `LOPHOCPHAN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaTK` on the `SINHVIEN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MaLopHC` on the `SINHVIEN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_MaKhoa_fkey";

-- DropForeignKey
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_MaTK_fkey";

-- DropForeignKey
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_MaGV_fkey";

-- DropForeignKey
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_MaKhoa_fkey";

-- DropForeignKey
ALTER TABLE "LOPHOCPHAN" DROP CONSTRAINT "LOPHOCPHAN_MaGV_fkey";

-- DropForeignKey
ALTER TABLE "LOPHOCPHAN" DROP CONSTRAINT "LOPHOCPHAN_MaHP_fkey";

-- DropForeignKey
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_MaLopHC_fkey";

-- DropForeignKey
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_MaTK_fkey";

-- AlterTable
ALTER TABLE "GIANGVIEN" DROP CONSTRAINT "GIANGVIEN_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "MaTK",
ADD COLUMN     "MaTK" INTEGER NOT NULL,
DROP COLUMN "MaKhoa",
ADD COLUMN     "MaKhoa" INTEGER NOT NULL,
ADD CONSTRAINT "GIANGVIEN_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HOCPHAN" DROP CONSTRAINT "HOCPHAN_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HOCPHAN_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KHOA" DROP CONSTRAINT "KHOA_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "KHOA_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LOPHC" DROP CONSTRAINT "LOPHC_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "MaKhoa",
ADD COLUMN     "MaKhoa" INTEGER NOT NULL,
DROP COLUMN "MaGV",
ADD COLUMN     "MaGV" INTEGER NOT NULL,
ADD CONSTRAINT "LOPHC_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LOPHOCPHAN" DROP CONSTRAINT "LOPHOCPHAN_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "MaHP",
ADD COLUMN     "MaHP" INTEGER NOT NULL,
DROP COLUMN "MaGV",
ADD COLUMN     "MaGV" INTEGER NOT NULL,
ADD CONSTRAINT "LOPHOCPHAN_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SINHVIEN" DROP CONSTRAINT "SINHVIEN_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "MaTK",
ADD COLUMN     "MaTK" INTEGER NOT NULL,
DROP COLUMN "MaLopHC",
ADD COLUMN     "MaLopHC" INTEGER NOT NULL,
ADD CONSTRAINT "SINHVIEN_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TAIKHOAN" DROP CONSTRAINT "TAIKHOAN_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TAIKHOAN_pkey" PRIMARY KEY ("id");

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
