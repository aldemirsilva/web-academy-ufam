"use client";

import React, { createContext, useState } from "react";
import ProductList from "./components/ProductList/ProductList";
import { mockProducts } from "./mocks/products";
import type { Product } from "./types/product";

export type FavoritesContextType = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
});

export default function HomePage() {
  const products = mockProducts;
  const [favorites, setFavorites] = useState<Product[]>([]);

  const values = { favorites, setFavorites };

  return (
    <main>
      <div className="container p-5">
        <FavoritesContext.Provider value={values}>
          <ProductList products={products} />
        </FavoritesContext.Provider>
      </div>
    </main>
  );
}
