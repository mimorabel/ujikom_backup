import midtransClient from "midtrans-client";
import prisma from "../prisma.js";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export const createPayment = async (req, res) => {
  const { penyewaanId, method } = req.body;
  const penyewaan = await prisma.penyewaan.findUnique({ where: { id: penyewaanId } });
  if (!penyewaan) return res.status(404).json({ message: "Penyewaan tidak ditemukan" });

  if (method === "tunai") {
    await prisma.transaksi.create({ data: { penyewaanId, amount: penyewaan.totalBiaya, method, status: "confirmed" } });
    await prisma.penyewaan.update({ where: { id: penyewaanId }, data: { status: "paid" } });
    return res.json({ message: "Pembayaran tunai berhasil" });
  }

  // Midtrans e-wallet/VA
  const parameter = {
    transaction_details: { order_id: `penyewaan-${penyewaan.id}`, gross_amount: penyewaan.totalBiaya },
    credit_card: { secure: true }
  };

  try {
    const paymentResponse = await snap.createTransaction(parameter);
    await prisma.transaksi.create({ data: { penyewaanId, amount: penyewaan.totalBiaya, method, status: "pending", transactionId: paymentResponse.transaction_id } });
    res.json({ redirect_url: paymentResponse.redirect_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
