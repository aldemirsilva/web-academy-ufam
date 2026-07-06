import { Router } from "express";
import productRouter from "../resources/product/product.router.js";
import userRouter from "../resources/user/user.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
