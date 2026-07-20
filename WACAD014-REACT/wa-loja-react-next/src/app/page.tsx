"use client";
import { CartSummary } from "./components/Cart/Cart Summary/CartSummary";
import { ProductList } from "./components/Product/ProductList/ProductList";
import { mockProducts } from "./mocks/products";

export default function Products() {
  return (
    <main>
      <div className="container p-5">
        <CartSummary qtdTotalItems={3} totalPurcahse={500} />
        <ProductList products={mockProducts} />
      </div>
    </main>
  );
}
