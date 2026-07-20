import { ProductType as Product } from "@/app/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.descricao}
          width={300}
          height={320}
          // style={{ width: "100%", height: "auto" }}
        />
        <div className="card-body bg-light">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text text-secondary">R$ {product.preco}</p>
          <button className="btn btn-dark d-block w-100" type="button">
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
