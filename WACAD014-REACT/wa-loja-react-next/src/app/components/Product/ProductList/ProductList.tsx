import Image from "next/image";

export function ProductList() {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>
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
    </>
  );
}
