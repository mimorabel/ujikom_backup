import express from "express";
import prisma from "../prismaClient.js"; // prisma client

const router = express.Router();

// GET all motor
router.get("/", async (req, res) => {
  const motors = await prisma.motor.findMany();
  res.json(motors);
});

// GET motor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const motor = await prisma.motor.findUnique({ where: { id: parseInt(id) } });
  res.json(motor);
});

// CREATE motor
router.post("/", async (req, res) => {
  const motor = await prisma.motor.create({ data: req.body });
  res.json(motor);
});

// UPDATE motor
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedMotor = await prisma.motor.update({
    where: { id: parseInt(id) },
    data: req.body,
  });
  res.json(updatedMotor);
});

// DELETE motor
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.motor.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Motor deleted" });
});

export default router;
