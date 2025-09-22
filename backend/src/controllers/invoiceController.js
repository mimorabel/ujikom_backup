// src/controllers/invoiceController.js
import prisma from "../prisma.js";
import PDFDocument from "pdfkit";

export const getInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data transaksi + relasi
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: Number(id) },
      include: {
        penyewaan: {
          include: {
            motor: { include: { merk: true, jenis: true } },
            penyewa: { include: { user: true } },
            tarif: true,
          },
        },
      },
    });

    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan" });
    }

    // Buat PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=invoice-${id}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text("INVOICE PENYEWAAN MOTOR", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`ID Transaksi: ${transaksi.id}`);
    doc.text(`Tanggal: ${transaksi.tanggal_transaksi}`);
    doc.text(`Penyewa: ${transaksi.penyewaan.penyewa.user.username}`);
    doc.text(`Motor: ${transaksi.penyewaan.motor.merk.nama} - ${transaksi.penyewaan.motor.no_plat}`);
    doc.text(`Total: Rp${transaksi.total}`);
    doc.text(`Metode Bayar: ${transaksi.metode_bayar}`);
    doc.text(`Status: ${transaksi.status}`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal membuat invoice" });
  }
};
