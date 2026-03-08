import express from "express";
import { registerUser } from "../controllers/registerController.ts";
import { registerLimiter } from "../middleware/registerLimiter.ts";

const router = express.Router();

router.post('/', registerLimiter, registerUser);

export default router;