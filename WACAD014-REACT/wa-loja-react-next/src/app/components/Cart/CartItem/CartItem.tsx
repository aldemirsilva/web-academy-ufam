const getProductTotal = (price: number, quantity: number): number =>
  price * quantity;

export function CartItem() {
  return (
    <tr key="prod-3">
      <td>Mouse Gamer Sem Fio</td>
      <td>R$ {(350).toFixed(2)}</td>
      <td>2</td>

      <td>R$ {getProductTotal(350, 2).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">Remover</button>
      </td>
    </tr>
  );
}

export default getProductTotal;
