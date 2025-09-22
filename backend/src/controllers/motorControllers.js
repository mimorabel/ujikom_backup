import prisma from "../prisma.js";

// GET all motor
export const getAllMotor = async (req, res) => {
  try {
    const data = await prisma.motor.findMany({
      include: { pemilik: true, merk: true, jenis: true },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET motor by id
export const getMotorById = async (req, res) => {
  try {
    const data = await prisma.motor.findUnique({
      where: { id: Number(req.params.id) },
      include: { pemilik: true, merk: true, jenis: true },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE motor
export const createMotor = async (req, res) => {
  try {
    const { kode_motor, pemilik_id, merk_motor, jenis_motor, no_plat, photo } = req.body;
    const newData = await prisma.motor.create({
      data: { kode_motor, pemilik_id, merk_motor, jenis_motor, no_plat, photo },
    });
    res.json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE motor
export const updateMotor = async (req, res) => {
  try {
    const { kode_motor, pemilik_id, merk_motor, jenis_motor, no_plat, status, photo } = req.body;
    const updated = await prisma.motor.update({
      where: { id: Number(req.params.id) },
      data: { kode_motor, pemilik_id, merk_motor, jenis_motor, no_plat, status, photo },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE motor
export const deleteMotor = async (req, res) => {
  try {
    await prisma.motor.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Motor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
