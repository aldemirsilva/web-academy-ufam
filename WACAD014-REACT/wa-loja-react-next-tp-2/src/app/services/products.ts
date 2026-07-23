import { productsApi } from "./api";

export async function getProductList() {
  return await productsApi.get("/produto").then((response) => response.data);
}

export async function getProductDetail(product: string) {
  return await productsApi
    .get(`/produto/${product}`)
    .then((response) => response.data);
}
