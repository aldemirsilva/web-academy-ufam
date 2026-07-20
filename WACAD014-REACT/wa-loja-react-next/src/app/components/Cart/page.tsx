"use client";
import { CartList } from "./CartList/CartList";
import { CartSummary } from "./Cart Summary/CartSummary";
import { mockCartItems } from "@/app/mocks/cartItems";

export default function Cart() {
  const qtdTotalItems = mockCartItems.reduce((acc, item) => {
    return acc + item.quantidade;
  }, 0);

  const totalPurchase = mockCartItems.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  return (
    <main>
      <div className="container p-5">
        <CartList cartItems={mockCartItems} />
        <CartSummary
          qtdTotalItems={qtdTotalItems}
          totalPurcahse={totalPurchase}
        />
      </div>
    </main>
  );
}
