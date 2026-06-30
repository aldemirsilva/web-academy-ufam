import type { Request, Response } from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.service.js";
import { StatusCodes } from "http-status-codes";
import type { CreateProductDTO } from "./product.types.js";

const index = async (req: Request, res: Response) => {
  const products = await getProducts();
  try {
    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const product = req.body as CreateProductDTO;
  try {
    const newProduct = await createProduct(product);
    res.status(StatusCodes.OK).json(newProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const product = await getProduct(id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = req.body as CreateProductDTO;
  try {
    const updatedProduct = await updateProduct(id, product);

    if (!updatedProduct)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });

    return res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Not found!" });

    return res.status(StatusCodes.OK).json(deletedProduct);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default { index, create, read, update, remove };
