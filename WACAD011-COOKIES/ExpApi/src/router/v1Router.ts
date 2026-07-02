import { Router } from "express";
import productRouter from "../resources/product/product.router.js";
import userTypeRouter from "../resources/user_type/user_type.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/user_types", userTypeRouter);

export default router;
