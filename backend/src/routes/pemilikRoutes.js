import express from "express";
import {
  getAllPemilik,
  getPemilikById,
  createPemilik,
  updatePemilik,
  deletePemilik,
} from "../controllers/pemilikController.js";

const router = express.Router();

router.get("/", getAllPemilik);
router.get("/:id", getPemilikById);
router.post("/", createPemilik);
router.put("/:id", updatePemilik);
router.delete("/:id", deletePemilik);

export default router;
