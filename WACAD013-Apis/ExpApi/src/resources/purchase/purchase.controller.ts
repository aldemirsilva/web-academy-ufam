import type { Request, Response } from "express";
import {
  createPurchase,
  getPurchase,
  getPurchases,
  updatePurchase,
} from "./purchase.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { CreatePurchaseDTO } from "./purchase.types.js";
import { purchaseErrors } from "./purchase.errors.js";
import { prisma } from "../../utils/prismaClient.js";

const index = async (_req: Request, res: Response) => {
  try {
    const purchases = await getPurchases();
    res.status(StatusCodes.OK).json(purchases);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const purchase = req.body as CreatePurchaseDTO;
  try {
    const newPurchase = await createPurchase(purchase);
    if (!newPurchase) return null;
    res.status(StatusCodes.CREATED).json(newPurchase);
  } catch (error) {
    purchaseErrors(error, res);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const purchase = await getPurchase(id);
    if (!purchase) return null;
    res.status(StatusCodes.OK).json(purchase);
  } catch (error) {
    purchaseErrors(error, res);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data: CreatePurchaseDTO = {
    id: req.session.purchaseId as string,
    userId: req.body.userId as string,
  };
  try {
    const updatedPurchase = await updatePurchase(id, data);
    if (!updatedPurchase)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    return res.status(StatusCodes.OK).json(updatedPurchase);
  } catch (error) {
    purchaseErrors(error, res);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const deletedPurchase = await prisma.purchase.delete({ where: { id } });
    if (!deletedPurchase) return null;
    res.status(StatusCodes.OK).json(deletedPurchase);
  } catch (error) {
    purchaseErrors(error, res);
  }
};

export default { index, create, read, update, remove };
