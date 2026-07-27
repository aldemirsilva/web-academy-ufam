import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext/FavoritesProvider";

export function useFavoritesContext() {
  const favoritesContect = useContext(FavoritesContext);

  if (!favoritesContect)
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider",
    );

  return favoritesContect;
}
