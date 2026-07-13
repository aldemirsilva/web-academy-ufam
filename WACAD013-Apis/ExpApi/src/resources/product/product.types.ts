import { type Product } from "../../generated/prisma/client.js";

export type CreateProductDTO = Pick<Product, "name" | "price" | "stock">;
