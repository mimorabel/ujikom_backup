import prisma from "../prisma.js";

export const getAllPenyewa = async (req, res) => {
  try {
    const data = await prisma.penyewa.findMany({ include: { user: true, penyewaan: true } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPenyewaById = async (req, res) => {
  try {
    const data = await prisma.penyewa.findUnique({
      where: { id: Number(req.params.id) },
      include: { user: true, penyewaan: true },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPenyewa = async (req, res) => {
  try {
    const { users_id, NIK, alamat } = req.body;
    const newData = await prisma.penyewa.create({ data: { users_id, NIK, alamat } });
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePenyewa = async (req, res) => {
  try {
    const { NIK, alamat } = req.body;
    const updated = await prisma.penyewa.update({
      where: { id: Number(req.params.id) },
      data: { NIK, alamat },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePenyewa = async (req, res) => {
  try {
    await prisma.penyewa.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Penyewa deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
