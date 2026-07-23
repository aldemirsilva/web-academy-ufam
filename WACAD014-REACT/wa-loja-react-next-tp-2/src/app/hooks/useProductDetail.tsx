import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../services/products";

export function useProductDetail(product: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["productDetail"],
    queryFn: () => getProductDetail(product),
  });

  return {
    product: data,
    isPending,
    isError,
  };
}
