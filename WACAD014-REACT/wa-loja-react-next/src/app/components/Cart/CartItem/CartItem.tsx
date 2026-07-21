import { CartItemType } from "@/app/types/cartItem";

interface CartItemProps {
  cartItem: CartItemType;
  onRemoveItemFromCart: (id: string) => void;
}

export function CartItem({ cartItem, onRemoveItemFromCart }: CartItemProps) {
  const { id, nome, preco, quantidade } = cartItem;

  const getProductTotal = (price: number, quantity: number): number =>
    price * quantity;

  return (
    <tr key={id}>
      <td>{nome}</td>
      <td>R$ {preco.toFixed(2)}</td>
      <td>{quantidade}</td>

      <td>R$ {getProductTotal(preco, quantidade).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemoveItemFromCart(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
