import { Router } from "express";
import productRouter from "../resources/product/product.router.js";
import userRouter from "../resources/user/user.router.js";
import languageRouter from "../resources/language/language.router.js";
import authRouter from "../resources/auth/auth.router.js";
import purchaseRouter from "../resources/purchase/purchase.router.js";
import purchaseItemRouter from "../resources/purchaseItem/purchaseItem.router.js";
import compraRouter from "../resources/compra/compra.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/languages", languageRouter);
router.use("/auth", authRouter);
router.use("/purchases", purchaseRouter);
router.use("/purchase-items", purchaseItemRouter);
router.use("/compras", compraRouter);

export default router;
