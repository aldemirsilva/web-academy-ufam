"use client";
import { useState } from "react";
import { CartSummary } from "./components/Cart/Cart Summary/CartSummary";
import { ProductList } from "./components/Product/ProductList/ProductList";
import { mockProducts } from "./mocks/products";
import { ProductType } from "./types/product";

export default function Products() {
  const [qtdTotalItems, setQtdTotalItems] = useState<number>(0);
  const [totalPurchase, setTotalPurchase] = useState<number>(0);

  const addToCart = (product: ProductType): void => {
    setQtdTotalItems((prev) => prev + 1);
    setTotalPurchase((prev) => prev + parseFloat(product.preco));
  };

  return (
    <main>
      <div className="container p-5">
        <CartSummary
          qtdTotalItems={qtdTotalItems}
          totalPurchase={totalPurchase}
        />
        <ProductList products={mockProducts} onAddToCart={addToCart} />
      </div>
    </main>
  );
}
