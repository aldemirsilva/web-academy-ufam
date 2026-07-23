"use client";
import { useFavoriteProduct } from "@/app/hooks/useFavoriteProduct";
import { ProductType } from "@/app/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addFavorite, isPending } = useFavoriteProduct(
    () => toast.success("Favoritado com sucesso!"),
    () => toast.error("Ocorreu um erro! Tente novamente."),
  );

  const router = useRouter();

  function viewProductDetails(product: ProductType) {
    router.push(`/product/${product.id}`);
  }

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.descricao}
          width={300}
          height={320}
          onClick={() => viewProductDetails(product)}
          style={{ cursor: "pointer" }}
        />
        <div className="card-body bg-light">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text text-secondary">R$ {product.preco}</p>
          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => onAddToCart(product)}
          >
            Adicionar no carrinho
          </button>

          <button
            className="btn btn-light d-block w-100 mt-2"
            type="button"
            onClick={() => addFavorite(product)}
          >
            {isPending ? "Favoritando..." : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
