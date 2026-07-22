"use client";

import { useState } from "react";
import { FavoriteList } from "./FavoriteList/FavoriteList";
import { ProductType } from "../types/product";
import { mockProducts } from "../mocks/products";

export default function Favorites() {
  const [favoritesItems, setFavoritesItems] =
    useState<ProductType[]>(mockProducts);

  function removeItemFromCart(id: string) {
    setFavoritesItems((currentFavoriteItems) => {
      const index = currentFavoriteItems.findIndex((item) => item.id === id);

      if (index === -1) return currentFavoriteItems;

      return [
        ...currentFavoriteItems.slice(0, index),
        ...currentFavoriteItems.slice(index + 1),
      ];
    });
  }

  return (
    <main>
      <div className="container p-5">
        <FavoriteList
          favoriteItems={favoritesItems}
          onRemoveItemFromFavorite={removeItemFromCart}
        />
      </div>
    </main>
  );
}
