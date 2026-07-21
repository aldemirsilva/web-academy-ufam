import { productsApi } from "./api";

export async function getProductList() {
  return await productsApi.get("/produto").then((response) => response.data);
}
