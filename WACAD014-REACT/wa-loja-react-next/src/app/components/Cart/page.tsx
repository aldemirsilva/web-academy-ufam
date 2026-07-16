"use client";
import { CartSummary } from "./Cart Summary/CartSummary";
import { CartList } from "./CartList/CartList";

export default function Cart() {
  return (
    <main>
      <div className="container p-5">
        <CartList />
        <CartSummary />
      </div>
    </main>
  );
}
