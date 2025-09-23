import prisma from "../prisma.js";

// CRUD User
export const listUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// CRUD Motor
export const listMotors = async (req, res) => {
  const motors = await prisma.motor.findMany();
  res.json(motors);
};

export const verifyMotor = async (req, res) => {
  const { id } = req.params;
  const motor = await prisma.motor.update({ where: { id: Number(id) }, data: { verified: true } });
  res.json(motor);
};

// CRUD Tarif Rental
export const setTarif = async (req, res) => {
  const { motorId, harian, mingguan, bulanan } = req.body;
  const tarif = await prisma.tarifRental.upsert({
    where: { motorId },
    update: { harian, mingguan, bulanan },
    create: { motorId, harian, mingguan, bulanan }
  });
  res.json(tarif);
};

// Konfirmasi Penyewaan
export const confirmPenyewaan = async (req, res) => {
  const { id } = req.params;
  const penyewaan = await prisma.penyewaan.update({ where: { id: Number(id) }, data: { status: "confirmed" } });
  await prisma.motor.update({ where: { id: penyewaan.motorId }, data: { status: "disewa" } });
  res.json(penyewaan);
};

// Konfirmasi Pengembalian
export const selesaiPenyewaan = async (req, res) => {
  const { id } = req.params;
  const penyewaan = await prisma.penyewaan.update({ where: { id: Number(id) }, data: { status: "selesai" } });
  await prisma.motor.update({ where: { id: penyewaan.motorId }, data: { status: "tersedia" } });

  // Buat bagi hasil otomatis (misal owner 70%, admin 30%)
  const total = penyewaan.totalBiaya;
  const ownerShare = total * 0.7;
  const adminShare = total * 0.3;
  await prisma.bagiHasil.create({
    data: { motorId: penyewaan.motorId, penyewaId: penyewaan.penyewaId, adminId: req.user.id, total, ownerShare, adminShare }
  });

  res.json({ penyewaan, ownerShare, adminShare });
};

// Laporan Bagi Hasil Admin
export const laporanBagiHasilAdmin = async (req, res) => {
  const data = await prisma.bagiHasil.findMany({ include: { motor: true } });
  res.json(data);
};
