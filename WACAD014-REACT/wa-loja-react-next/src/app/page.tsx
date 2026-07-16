"use client";
import { CartSummary } from "./components/Cart/Cart Summary/CartSummary";
import { ProductCard } from "./components/Product/ProductCard/ProductCard";

export default function Products() {
  return (
    <main>
      <div className="container p-5">
        <CartSummary />
        <h5 className="mb-3">Produtos disponíveis:</h5>
        <ProductCard />
      </div>
    </main>
  );
}
