import prisma from "../prisma.js";

export const getAllPemilik = async (req, res) => {
  try {
    const data = await prisma.pemilik.findMany({ include: { user: true, motor: true, dokumen: true } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPemilikById = async (req, res) => {
  try {
    const data = await prisma.pemilik.findUnique({
      where: { id: Number(req.params.id) },
      include: { user: true, motor: true, dokumen: true },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPemilik = async (req, res) => {
  try {
    const { users_id, NIK, alamat } = req.body;
    const newData = await prisma.pemilik.create({ data: { users_id, NIK, alamat } });
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePemilik = async (req, res) => {
  try {
    const { NIK, alamat } = req.body;
    const updated = await prisma.pemilik.update({
      where: { id: Number(req.params.id) },
      data: { NIK, alamat },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePemilik = async (req, res) => {
  try {
    await prisma.pemilik.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Pemilik deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
