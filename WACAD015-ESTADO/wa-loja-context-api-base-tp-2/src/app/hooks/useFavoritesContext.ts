import { FavoritesContext } from "@/app/contexts/FavoritesContext/FavoritesProvider";
import { useContext } from "react";

export function useFavoritesContext() {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext)
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider",
    );

  return favoritesContext;
}
