import { Router } from "express";
import authController from "./auth.controller.js";

const router = Router();

router.post("/", authController.signup);
router.post("/", authController.login);
router.post("/", authController.logout);

export default router;
