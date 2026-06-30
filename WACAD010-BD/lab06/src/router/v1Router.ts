import { Router } from "express";
import productRouter from "../resources/product/product.router.js";
import clienteRouter from "../resources/cliente/cliente.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/clientes", clienteRouter);

export default router;
