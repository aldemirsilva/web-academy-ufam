import type { Request, Response } from "express";
import type { CreatePurchaseItemDTO } from "../purchaseItem/purchaseItem.types.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createManyPurchaseItems } from "../purchaseItem/purchaseItem.service.js";
import { v4 as uuid } from "uuid";
import { createPurchase } from "../purchase/purchase.service.js";
import type { CreatePurchaseDTO } from "../purchase/purchase.types.js";

const index = (req: Request, res: Response) => {
  if (!req.session.uid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  req.session.cart ??= [];

  return res.status(StatusCodes.OK).json(req.session.cart);
};

const addToCart = (req: Request, res: Response) => {
  const { productId, quantity } = req.body as CreatePurchaseItemDTO;

  if (!req.session.uid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }

  req.session.cart ??= [];
  req.session.purchaseId ??= uuid();

  const index = req.session.cart.findIndex(
    (item) => item.productId === productId,
  );

  if (index !== -1) {
    return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
  }

  req.session.cart.push({
    purchaseId: req.session.purchaseId,
    productId,
    quantity,
  });

  return res.status(StatusCodes.OK).json(req.session.cart);
};

const removeFromCart = (req: Request, res: Response) => {
  if (!req.session.uid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  if (req.session.cart?.length === 0)
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

  const { productId } = req.body as { productId: string };

  req.session.cart ??= [];

  const index = req.session.cart.findIndex(
    (item) => item.productId === productId,
  );

  if (index === -1)
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

  req.session.cart.splice(index, 1);

  return res.status(StatusCodes.OK).json(req.session.cart);
};

const updateQuantity = (req: Request, res: Response) => {
  if (!req.session.uid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  if (req.session.cart?.length === 0)
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

  const { productId, quantity } = req.body as CreatePurchaseItemDTO;

  req.session.cart ??= [];

  const index = req.session.cart.findIndex(
    (item) =>
      item.purchaseId === req.session.purchaseId &&
      item.productId === productId,
  );

  if (index === -1)
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

  const item = req.session.cart[index];

  if (!item)
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

  item.quantity = quantity;

  return res.status(StatusCodes.OK).json(req.session.cart);
};

const emptyCart = (req: Request, res: Response) => {
  if (!req.session.uid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  if (req.session.cart?.length === 0)
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

  req.session.cart = [];

  return res.status(StatusCodes.OK).json(req.session.cart);
};

const placeOrder = async (req: Request, res: Response) => {
  if (!req.session.uid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  if (req.session.cart?.length === 0)
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

  try {
    const purchase: CreatePurchaseDTO = {
      id: req.session.purchaseId as string,
      userId: req.session.uid as string,
    };

    const newPurchase = await createPurchase(purchase);

    if (!newPurchase) return null;

    const data = req.session.cart as CreatePurchaseItemDTO[];
    const purchaseItems = await createManyPurchaseItems(data);
    req.session.cart = [];
    return res.status(StatusCodes.CREATED).json(purchaseItems);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default {
  index,
  addToCart,
  removeFromCart,
  updateQuantity,
  emptyCart,
  placeOrder,
};
