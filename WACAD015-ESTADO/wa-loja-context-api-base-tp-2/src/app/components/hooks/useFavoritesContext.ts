import { useContext } from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext/FavoritesProvider";

export function useFavoritesContext() {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext)
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider",
    );

  return favoritesContext;
}
