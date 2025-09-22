// controllers/transaksiController.js
import prisma from "../prisma.js";
import { v4 as uuidv4 } from "uuid";

export const createTransaksi = async (req, res) => {
  try {
    const { motorId, penyewaId, tanggalMulai, tanggalSelesai, totalHarga } = req.body;

    // Bagi hasil
    const pemilikShare = Math.floor(totalHarga * 0.8);
    const adminShare = totalHarga - pemilikShare;

    const transaksi = await prisma.transaksi.create({
      data: {
        motorId,
        penyewaId,
        tanggalMulai: new Date(tanggalMulai),
        tanggalSelesai: new Date(tanggalSelesai),
        totalHarga,
        status: "pending",
        invoice: {
          create: {
            nomorInvoice: "INV-" + uuidv4().split("-")[0],
            totalHarga,
            pemilikShare,
            adminShare,
          },
        },
      },
      include: { invoice: true, motor: true, penyewa: true },
    });

    // Update status motor
    await prisma.motor.update({
      where: { id: motorId },
      data: { status: "disewa" },
    });

    res.json(transaksi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat transaksi" });
  }
};
