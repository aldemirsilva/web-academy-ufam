import { type produto } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import { type CreateProductDTO } from "./product.types.js";

async function createProduct(data: CreateProductDTO): Promise<produto> {
  return await prisma.produto.create({ data });
}

export default createProduct;
