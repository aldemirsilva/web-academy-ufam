import { useQuery } from "@tanstack/react-query";
import { getFavoritesList } from "../services/favorite";

export function useFavoriteList() {
  const { data } = useQuery({
    queryKey: ["favoriteList"],
    queryFn: getFavoritesList,
  });

  return { favorites: data };
}
