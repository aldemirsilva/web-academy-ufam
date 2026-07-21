import { ProductType } from "@/app/types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import { useProdutList } from "@/app/hooks/useProductList";

interface ProductListProps {
  onAddToCart: (product: ProductType) => void;
}

export function ProductList({ onAddToCart }: ProductListProps) {
  const { products, isPending, isError } = useProdutList();

  if (isPending) return "Carregando dados...";

  if (isError) return "Ocorreu um erro! Tente novamente.";

  if (products.length === 0) return "Não há produtos disponíveis no momento.";

  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products.map((product: ProductType) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </>
  );
}
