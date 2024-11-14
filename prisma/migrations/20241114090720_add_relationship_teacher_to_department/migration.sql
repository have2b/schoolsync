/*
  Warnings:

  - Added the required column `MaKhoa` to the `GIANGVIEN` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GIANGVIEN" ADD COLUMN     "MaKhoa" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GIANGVIEN" ADD CONSTRAINT "GIANGVIEN_MaKhoa_fkey" FOREIGN KEY ("MaKhoa") REFERENCES "KHOA"("id") ON DELETE CASCADE ON UPDATE CASCADE;
