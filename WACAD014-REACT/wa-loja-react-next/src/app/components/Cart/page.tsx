"use client";
import { useState } from "react";
import { CartList } from "./CartList/CartList";
import { CartSummary } from "./Cart Summary/CartSummary";
import { mockCartItems } from "@/app/mocks/cartItems";
import { CartItemType } from "@/app/types/cartItem";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems);

  const qtdTotalItems = cartItems.reduce((acc, item) => {
    return acc + item.quantidade;
  }, 0);

  const totalPurchase = cartItems.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  function removeItemFromCart(id: string) {
    setCartItems((currentCartItems) => {
      const index = currentCartItems.findIndex((item) => item.id === id);

      if (index === -1) return currentCartItems;

      return [
        ...currentCartItems.slice(0, index),
        ...currentCartItems.slice(index + 1),
      ];
    });
  }

  return (
    <main>
      <div className="container p-5">
        <CartList
          cartItems={cartItems}
          onRemoveItemFromCart={removeItemFromCart}
        />
        <CartSummary
          qtdTotalItems={qtdTotalItems}
          totalPurchase={totalPurchase}
        />
      </div>
    </main>
  );
}
