import { Router } from "express";
import purchaseController from "./purchase.controller.js";
import validate from "../../middlewares/validate.js";
import {
  createPurchaseSchema,
  updatePurchaseSchema,
} from "./purchase.schema.js";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

/**
 * @openapi
 * /purchases:
 *   get:
 *     summary: Lista todas as compras
 *     tags: [Purchases]
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 */
router.get("/", purchaseController.index);

/**
 * @openapi
 * /purchases:
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePurchase'
 *     responses:
 *       201:
 *         description: Compra criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       403:
 *         description: Usuário não é administrador
 */
router.post(
  "/",
  isAdmin,
  validate(createPurchaseSchema),
  purchaseController.create,
);

/**
 * @openapi
 * /purchases/{id}:
 *   get:
 *     summary: Busca uma compra pelo id
 *     tags: [Purchases]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       404:
 *         description: Compra não encontrada
 */
router.get("/:id", purchaseController.read);

/**
 * @openapi
 * /purchases/{id}:
 *   put:
 *     summary: Atualiza uma compra
 *     tags: [Purchases]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePurchase'
 *     responses:
 *       200:
 *         description: Compra atualizada
 *       403:
 *         description: Usuário não é administrador
 */
router.put(
  "/:id",
  isAdmin,
  validate(updatePurchaseSchema),
  purchaseController.update,
);

/**
 * @openapi
 * /purchases/{id}:
 *   delete:
 *     summary: Remove uma compra
 *     tags: [Purchases]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Compra removida
 *       403:
 *         description: Usuário não é administrador
 */
router.delete("/:id", purchaseController.remove);

export default router;
