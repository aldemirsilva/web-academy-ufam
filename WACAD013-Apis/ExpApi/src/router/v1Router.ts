import { Router } from "express";
import productRouter from "../resources/product/product.router.js";
import userRouter from "../resources/user/user.router.js";
import languageRouter from "../resources/language/language.router.js";
import authRouter from "../resources/auth/auth.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/languages", languageRouter);
router.use("/auth", authRouter);

export default router;
