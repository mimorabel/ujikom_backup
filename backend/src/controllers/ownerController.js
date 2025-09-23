import prisma from "../prisma.js";

export const createMotor = async (req, res) => {
  const { merk, jenis, nopol, foto } = req.body;
  const motor = await prisma.motor.create({
    data: { merk, jenis, nopol, foto, ownerId: req.user.id }
  });
  res.json(motor);
};

export const listMotors = async (req, res) => {
  const motors = await prisma.motor.findMany({ where: { ownerId: req.user.id } });
  res.json(motors);
};

export const motorDisewa = async (req, res) => {
  const motors = await prisma.motor.findMany({
    where: { ownerId: req.user.id, status: "disewa" },
    include: { penyewaan: true }
  });
  res.json(motors);
};

export const totalPendapatan = async (req, res) => {
  const bagiHasil = await prisma.bagiHasil.aggregate({
    where: { motor: { ownerId: req.user.id } },
    _sum: { ownerShare: true }
  });
  res.json({ totalPendapatan: bagiHasil._sum.ownerShare || 0 });
};

export const laporanBagiHasil = async (req, res) => {
  const data = await prisma.bagiHasil.findMany({ where: { motor: { ownerId: req.user.id } } });
  res.json(data);
};
