import type { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  createPurchaseItem,
  deletePurchaseItem,
  getPurchaseItem,
  getPurchaseItems,
  updatePurchaseItem,
} from "./purchaseItem.service.js";
import type {
  CreatePurchaseItemDTO,
  UpdatePurchaseItemDTO,
} from "./purchaseItem.types.js";
import { purchaseItemErrors } from "./purchaseItem.errors.js";

const index = async (_req: Request, res: Response) => {
  try {
    const purchaseItems = await getPurchaseItems();
    return res.status(StatusCodes.OK).json(purchaseItems);
  } catch (error) {
    purchaseItemErrors(error, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const purchaseItem = req.body as CreatePurchaseItemDTO;
    const newPurchaseItem = await createPurchaseItem(purchaseItem);
    return res.status(StatusCodes.CREATED).json(newPurchaseItem);
  } catch (error) {
    purchaseItemErrors(error, res);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.purchaseId as string;
    const productId = req.params.productId as string;
    const purchaseItem = await getPurchaseItem(purchaseId, productId);

    if (!purchaseItem) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }

    return res.status(StatusCodes.OK).json(purchaseItem);
  } catch (error) {
    purchaseItemErrors(error, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.purchaseId as string;
    const productId = req.params.productId as string;
    const data: UpdatePurchaseItemDTO = {
      quantity: req.body.quantity,
    };
    const updatedPurchaseItem = await updatePurchaseItem(
      purchaseId,
      productId,
      data,
    );

    if (!updatedPurchaseItem) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }

    return res.status(StatusCodes.OK).json(updatedPurchaseItem);
  } catch (error) {
    purchaseItemErrors(error, res);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.purchaseId as string;
    const productId = req.params.productId as string;
    const deletedPurchaseItem = await deletePurchaseItem(purchaseId, productId);

    if (!deletedPurchaseItem) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }

    return res.status(StatusCodes.OK).json(deletedPurchaseItem);
  } catch (error) {
    purchaseItemErrors(error, res);
  }
};

export default { index, create, read, update, remove };
