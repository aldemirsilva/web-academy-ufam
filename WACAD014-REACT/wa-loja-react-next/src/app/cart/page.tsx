"use client";

export default function Cart() {
  const getProductTotal = (price: number, quantity: number): number =>
    price * quantity;

  return (
    <>
      <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            WA Loja
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Abrir menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Início
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Carrinho
                </a>
              </li>
            </ul>

            <button className="btn btn-dark">Sair</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
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
                        <button className="btn btn-danger btn-sm">
                          Remover
                        </button>
                      </td>
                    </tr>

                    <tr key="prod-2">
                      <td>Teclado Mecânico RGB</td>
                      <td>R$ {(450).toFixed(2)}</td>
                      <td>2</td>

                      <td>R$ {getProductTotal(450, 2).toFixed(2)}</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          Remover
                        </button>
                      </td>
                    </tr>

                    <tr key="prod-3">
                      <td>Mouse Gamer Sem Fio</td>
                      <td>R$ {(350).toFixed(2)}</td>
                      <td>2</td>

                      <td>R$ {getProductTotal(350, 2).toFixed(2)}</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          Remover
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
              <p className="card-text fw-medium">Quantidade total: 5</p>
              <p className="card-text fw-medium">
                Valor total: R${(3800).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
