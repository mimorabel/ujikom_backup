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
        role,
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

app.listen(5000, () => console.log("Server running on port 5000"));

app.use("/api", authRoutes);