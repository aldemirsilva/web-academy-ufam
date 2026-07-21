import { ProductType } from "@/app/types/product";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductListProps {
  products: ProductType[];
  onAddToCart: (product: ProductType) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products.map((product) => (
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
