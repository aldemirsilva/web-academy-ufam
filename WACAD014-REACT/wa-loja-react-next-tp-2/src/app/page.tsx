"use client";
import { useState } from "react";
import { CartSummary } from "./cart/Cart Summary/CartSummary";
import { ProductList } from "./product/ProductList/ProductList";
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
        <ProductList onAddToCart={addToCart} />
      </div>
    </main>
  );
}
