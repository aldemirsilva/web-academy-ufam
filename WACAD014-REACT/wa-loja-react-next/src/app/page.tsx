"use client";
import Image from "next/image";

export default function Products() {
  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
            <p className="card-text fw-medium">Quantidade total: 3</p>
            <p className="card-text fw-medium">
              Valor total: R${(1350).toFixed(2)}
            </p>
          </div>
        </div>

        <h5 className="mb-3">Produtos disponíveis:</h5>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          <div className="col">
            <div className="card shadow-sm h-100">
              <Image
                src="/placeholder.png"
                className="card-img-top"
                alt="imagem placeholder"
                width={300}
                height={320}
              />
              <div className="card-body bg-light">
                <h5 className="card-title">Notebook Pro</h5>
                <p className="card-text text-secondary">R$ 5499</p>
                <button className="btn btn-dark d-block w-100" type="button">
                  Adicionar no carrinho
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-sm h-100">
              <Image
                src="/placeholder.png"
                className="card-img-top"
                alt="imagem placeholder"
                width={300}
                height={320}
              />
              <div className="card-body bg-light">
                <h5 className="card-title">Smartphone Premium</h5>
                <p className="card-text text-secondary">R$ 4399</p>
                <button className="btn btn-dark d-block w-100" type="button">
                  Adicionar no carrinho
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-sm h-100">
              <Image
                src="/placeholder.png"
                className="card-img-top"
                alt="imagem placeholder"
                width={300}
                height={320}
              />
              <div className="card-body bg-light">
                <h5 className="card-title">Smartwatch Sport</h5>
                <p className="card-text text-secondary">R$ 1899</p>
                <button className="btn btn-dark d-block w-100" type="button">
                  Adicionar no carrinho
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-sm h-100">
              <Image
                src="/placeholder.png"
                className="card-img-top"
                alt="imagem placeholder"
                width={300}
                height={320}
              />
              <div className="card-body bg-light">
                <h5 className="card-title">Fone Bluetooth ANC</h5>
                <p className="card-text text-secondary">R$ 999</p>
                <button className="btn btn-dark d-block w-100" type="button">
                  Adicionar no carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
