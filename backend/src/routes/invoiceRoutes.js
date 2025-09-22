// routes/invoiceRoutes.js
import express from "express";
import { getInvoicePDF } from "../controllers/invoiceController.js";

const router = express.Router();

// Download invoice PDF
router.get("/:id/pdf", getInvoicePDF);

export default router;
