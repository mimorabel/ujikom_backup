import express from "express";
import {
  getAllMotor,
  getMotorById,
  createMotor,
  updateMotor,
  deleteMotor,
} from "../controllers/motorController.js";

const router = express.Router();

router.get("/", getAllMotor);
router.get("/:id", getMotorById);
router.post("/", createMotor);
router.put("/:id", updateMotor);
router.delete("/:id", deleteMotor);

export default router;
