import { Router } from "express";
import comprasController from "./compra.controller.js";

const router = Router();

/**
 * @openapi
 * /compras:
 *   get:
 *     summary: Lista os itens do carrinho
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de itens do carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 *       401:
 *         description: Não autenticado
 */
router.get("/", comprasController.index);

/**
 * @openapi
 * /compras/add-to-cart:
 *   post:
 *     summary: Adiciona um item ao carrinho
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Item adicionado ao carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 *       401:
 *         description: Não autenticado
 */
router.post("/add-to-cart", comprasController.addToCart);

/**
 * @openapi
 * /compras/remove-from-cart:
 *   post:
 *     summary: Remove um item do carrinho
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Item removido do carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 *       400:
 *         description: Carrinho vazio
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Item não encontrado no carrinho
 */
router.post("/remove-from-cart", comprasController.removeFromCart);

/**
 * @openapi
 * /compras/update-quantity:
 *   post:
 *     summary: Atualiza a quantidade de um item do carrinho
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Quantidade atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 *       400:
 *         description: Carrinho vazio
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Item não encontrado no carrinho
 */
router.post("/update-quantity", comprasController.updateQuantity);

/**
 * @openapi
 * /compras/empty-cart:
 *   delete:
 *     summary: Limpa o carrinho
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Carrinho limpo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 *       401:
 *         description: Não autenticado
 */
router.delete("/empty-cart", comprasController.emptyCart);

/**
 * @openapi
 * /compras/place-order:
 *   post:
 *     summary: Finaliza a compra e persiste os itens
 *     tags: [Compras]
 *     responses:
 *       201:
 *         description: Compra criada com os itens persistidos
 *       400:
 *         description: Carrinho vazio
 *       401:
 *         description: Não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/place-order", comprasController.placeOrder);

export default router;
