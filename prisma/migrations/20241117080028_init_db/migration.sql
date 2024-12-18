-- CreateEnum
CREATE TYPE "VAITRO" AS ENUM ('Sinh Vien', 'Giang Vien', 'Quan Tri');

-- CreateEnum
CREATE TYPE "GIOITINH" AS ENUM ('Nam', 'Nu', 'Khac');

-- CreateEnum
CREATE TYPE "HOCVI" AS ENUM ('Cu Nhan', 'Thac Si', 'Tien Si', 'Pho Giao Su', 'Giao Su');

-- CreateTable
CREATE TABLE "TAIKHOAN" (
    "id" SERIAL NOT NULL,
    "TenTK" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "MatKhau" TEXT NOT NULL,
    "VaiTro" "VAITRO" NOT NULL,
    "AnhDaiDien" TEXT,
    "LanDauDangNhap" BOOLEAN NOT NULL DEFAULT true,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TAIKHOAN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SINHVIEN" (
    "id" SERIAL NOT NULL,
    "MaSV" TEXT NOT NULL,
    "HoTen" TEXT NOT NULL,
    "NgaySinh" TIMESTAMP(3) NOT NULL,
    "GioiTinh" "GIOITINH" NOT NULL DEFAULT 'Nam',
    "DiaChi" TEXT NOT NULL,
    "SDT" TEXT NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "MaTK" INTEGER NOT NULL,
    "MaLopHC" INTEGER NOT NULL,

    CONSTRAINT "SINHVIEN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KHOA" (
    "id" SERIAL NOT NULL,
    "MaKhoa" TEXT NOT NULL,
    "TenKhoa" TEXT NOT NULL,
    "MoTa" TEXT,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "KHOA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LOPHC" (
    "id" SERIAL NOT NULL,
    "MaLopHC" TEXT NOT NULL,
    "TenLopHC" TEXT NOT NULL,
    "SoLuong" INTEGER NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,
    "MaKhoa" INTEGER NOT NULL,
    "MaGV" INTEGER NOT NULL,

    CONSTRAINT "LOPHC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HOCPHAN" (
    "id" SERIAL NOT NULL,
    "MaHP" TEXT NOT NULL,
    "TenHP" TEXT NOT NULL,
    "SoTC" INTEGER NOT NULL,
    "SoTiet" INTEGER NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "HOCPHAN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LOPHOCPHAN" (
    "id" SERIAL NOT NULL,
    "MaLHP" TEXT NOT NULL,
    "TenLHP" TEXT NOT NULL,
    "SoLuong" INTEGER NOT NULL,
    "HocKy" INTEGER NOT NULL,
    "NamHoc" INTEGER NOT NULL,
    "NgayBatDau" TIMESTAMP(3) NOT NULL,
    "NgayKetThuc" TIMESTAMP(3) NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,
    "MaHP" INTEGER NOT NULL,
    "MaGV" INTEGER NOT NULL,

    CONSTRAINT "LOPHOCPHAN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GIANGVIEN" (
    "id" SERIAL NOT NULL,
    "MaGV" TEXT NOT NULL,
    "HoTen" TEXT NOT NULL,
    "HocVi" "HOCVI" NOT NULL DEFAULT 'Cu Nhan',
    "ChuyenNganh" TEXT NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "MaTK" INTEGER NOT NULL,
    "MaKhoa" INTEGER NOT NULL,

    CONSTRAINT "GIANGVIEN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DIEM" (
    "DiemCC" DECIMAL(65,30) NOT NULL,
    "DiemKT1" DECIMAL(65,30) NOT NULL,
    "DiemKT2" DECIMAL(65,30) NOT NULL,
    "DiemTL" DECIMAL(65,30) NOT NULL,
    "DiemThi" DECIMAL(65,30) NOT NULL,
    "NgayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NgayCapNhat" TIMESTAMP(3) NOT NULL,
    "DangHoatDong" BOOLEAN NOT NULL DEFAULT true,
    "MaSV" INTEGER NOT NULL,
    "MaLHP" INTEGER NOT NULL,

    CONSTRAINT "DIEM_pkey" PRIMARY KEY ("MaSV","MaLHP")
);

-- CreateIndex
CREATE UNIQUE INDEX "TAIKHOAN_TenTK_key" ON "TAIKHOAN"("TenTK");

-- CreateIndex
CREATE UNIQUE INDEX "TAIKHOAN_Email_key" ON "TAIKHOAN"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "SINHVIEN_MaSV_key" ON "SINHVIEN"("MaSV");

-- CreateIndex
CREATE UNIQUE INDEX "SINHVIEN_SDT_key" ON "SINHVIEN"("SDT");

-- CreateIndex
CREATE UNIQUE INDEX "KHOA_MaKhoa_key" ON "KHOA"("MaKhoa");

-- CreateIndex
CREATE UNIQUE INDEX "KHOA_TenKhoa_key" ON "KHOA"("TenKhoa");

-- CreateIndex
CREATE UNIQUE INDEX "LOPHC_MaLopHC_key" ON "LOPHC"("MaLopHC");

-- CreateIndex
CREATE UNIQUE INDEX "LOPHC_TenLopHC_key" ON "LOPHC"("TenLopHC");

-- CreateIndex
CREATE UNIQUE INDEX "HOCPHAN_MaHP_key" ON "HOCPHAN"("MaHP");

-- CreateIndex
CREATE UNIQUE INDEX "HOCPHAN_TenHP_key" ON "HOCPHAN"("TenHP");

-- CreateIndex
CREATE UNIQUE INDEX "LOPHOCPHAN_MaLHP_key" ON "LOPHOCPHAN"("MaLHP");

-- CreateIndex
CREATE UNIQUE INDEX "GIANGVIEN_MaGV_key" ON "GIANGVIEN"("MaGV");

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
ALTER TABLE "DIEM" ADD CONSTRAINT "DIEM_MaSV_fkey" FOREIGN KEY ("MaSV") REFERENCES "SINHVIEN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DIEM" ADD CONSTRAINT "DIEM_MaLHP_fkey" FOREIGN KEY ("MaLHP") REFERENCES "LOPHOCPHAN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
