import type { Request, Response } from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { CreateProductDTO } from "./product.types.js";
import { productErrors } from "./product.errors.js";

const index = async (req: Request, res: Response) => {
  const products = await getProducts();
  try {
    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    productErrors(err, res);
  }
};

const create = async (req: Request, res: Response) => {
  const product = req.body as CreateProductDTO;
  try {
    const newProduct = await createProduct(product);
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (err) {
    productErrors(err, res);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const product = await getProduct(id);
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    productErrors(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = req.body as CreateProductDTO;
  try {
    const updatedProduct = await updateProduct(id, product);

    if (!updatedProduct)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);

    return res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    productErrors(err, res);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);

    return res.status(StatusCodes.OK).json(deletedProduct);
  } catch (err) {
    productErrors(err, res);
  }
};

export default { index, create, read, update, remove };
