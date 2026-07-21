import { ProductType } from "../types/product";
import { favoriteApi } from "./api";

export async function addFavoriteProduct(product: ProductType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return favoriteApi
    .post<ProductType>("/favoritos", product)
    .then((response) => response.data);
}
