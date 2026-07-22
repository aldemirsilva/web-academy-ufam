import { useMutation } from "@tanstack/react-query";
import { getFavoritesList } from "../services/favorite";

export function useFavoriteList(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: getFavoritesList,
    onSuccess,
    onError,
  });

  return {
    getFavorite: mutate,
    isPending,
  };
}
