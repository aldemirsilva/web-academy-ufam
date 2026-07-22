import { useMutation } from "@tanstack/react-query";
import { removeFavoriteProduct } from "../services/favorite";

export function useRemoveFavorite(onSuccess: () => void, onError: () => void) {
  const { mutate } = useMutation({
    mutationFn: (id: string) => removeFavoriteProduct(id),
    onSuccess,
    onError,
  });

  return {
    removeFavoriteProduct: mutate,
  };
}
