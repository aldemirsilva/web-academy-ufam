import { type produto } from "../../generated/prisma/client.js";

export type CreateProductDTO = Pick<
  produto,
  "id_subcategoria" | "modelo" | "fabricante" | "qtd_disponivel" | "preco_base"
>;
