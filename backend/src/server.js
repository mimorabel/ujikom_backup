import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import authRoutes from "./routes/authRoutes.js"

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { name, email, password, role} = req.body;
  const validRoles = ["Penyewa","Pemilik","Admin"]; // HARUS sesuai enum di Prisma

    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: "Role tidak valid" });
    }

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role : "Penyewa",
      },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      // Email sudah ada
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// GET semua motor
app.get("/api/motor", async (req, res) => {
  try {
    const motors = await prisma.motor.findMany();
    res.json(motors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data motor" });
  }
});

// POST tambah motor
app.post("/api/motor", async (req, res) => {
  const { merk, jenis, tipe, seri, nopol, status } = req.body;
  try {
    const motor = await prisma.motor.create({
      data: { merk, jenis, tipe, seri, nopol, status },
    });
    res.json({ message: "Motor berhasil ditambahkan", motor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan motor" });
  }
});

// PUT update motor by ID
app.put("/api/motor/:id", async (req, res) => {
  const { id } = req.params;
  const { merk, jenis, tipe, seri, nopol, status } = req.body;
  try {
    const motor = await prisma.motor.update({
      where: { id: parseInt(id) },
      data: { merk, jenis, tipe, seri, nopol, status },
    });
    res.json({ message: "Motor berhasil diupdate", motor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate motor" });
  }
});

// DELETE motor by ID
app.delete("/api/motor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.motor.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Motor berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus motor" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));

app.use("/api", authRoutes);