"use client";

import ProductList from "./components/ProductList/ProductList";
import { mockProducts } from "./mocks/products";
import { FavoritesProvider } from "./contexts/FavoritesContext/FavoritesProvider";

export default function HomePage() {
  const products = mockProducts;

  return (
    <main>
      <div className="container p-5">
        <FavoritesProvider>
          <ProductList products={products} />
        </FavoritesProvider>
      </div>
    </main>
  );
}
