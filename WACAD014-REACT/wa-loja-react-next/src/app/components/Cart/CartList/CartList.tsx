import { CartItem } from "../CartItem/CartItem";
import getProductTotal from "../CartItem/CartItem";

export function CartList() {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr key="prod-1">
                <td>Monitor UltraWide 34&rdquo;</td>
                <td>R$ {(2200).toFixed(2)}</td>
                <td>1</td>

                <td>R$ {getProductTotal(2200, 1).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>

              <tr key="prod-2">
                <td>Teclado Mecânico RGB</td>
                <td>R$ {(450).toFixed(2)}</td>
                <td>2</td>

                <td>R$ {getProductTotal(450, 2).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>

              <tr key="prod-3">
                <td>Mouse Gamer Sem Fio</td>
                <td>R$ {(350).toFixed(2)}</td>
                <td>2</td>

                <td>R$ {getProductTotal(350, 2).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
