import prisma from "../prisma.js";

export const listAvailableMotors = async (req, res) => {
  const motors = await prisma.motor.findMany({ where: { status: "tersedia", verified: true }, include: { tarif: true } });
  res.json(motors);
};

export const createPenyewaan = async (req, res) => {
  const { motorId, durasiHari } = req.body;
  const motor = await prisma.motor.findUnique({ where: { id: motorId }, include: { tarif: true } });
  if (!motor) return res.status(404).json({ message: "Motor tidak ditemukan" });

  const tarif = motor.tarif[0]; // ambil tarif pertama
  let totalBiaya = 0;
  if (durasiHari >= 30) totalBiaya = tarif.bulanan * Math.floor(durasiHari / 30);
  else if (durasiHari >= 7) totalBiaya = tarif.mingguan * Math.floor(durasiHari / 7);
  else totalBiaya = tarif.harian * durasiHari;

  const tglMulai = new Date();
  const tglSelesai = new Date();
  tglSelesai.setDate(tglMulai.getDate() + durasiHari);

  const penyewaan = await prisma.penyewaan.create({
    data: { motorId, penyewaId: req.user.id, tglMulai, tglSelesai, durasiHari, totalBiaya }
  });
  res.json(penyewaan);
};

export const historyPenyewaan = async (req, res) => {
  const data = await prisma.penyewaan.findMany({ where: { penyewaId: req.user.id }, include: { motor: true, transaksi: true } });
  res.json(data);
};
