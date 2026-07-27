"use client";
import { calculateDiscountedPrice } from "@/app/helpers";
import { Product } from "@/app/types/product";
import { createContext, useState } from "react";

type FavoritesContextType = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isInFavorites: (id: string) => boolean;
  removeProductFromFavorites: (id: string) => void;
  addToFavorites: (productToAdd: Product) => void;
  totalFavoriteValue: number;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
  isInFavorites: () => false,
  removeProductFromFavorites: () => false,
  addToFavorites: () => 0,
  totalFavoriteValue: 0,
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const isInFavorites = (id: string): boolean => {
    return favorites.some((item) => item.id === id);
  };

  const removeProductFromFavorites = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id),
    );
  };

  const addToFavorites = (productToAdd: Product) => {
    if (!isInFavorites)
      setFavorites((currentFavorites) => [...currentFavorites, productToAdd]);
  };

  const totalFavoriteValue = favorites.reduce((acc, product) => {
    return (
      acc + calculateDiscountedPrice(Number(product.preco), product.desconto)
    );
  }, 0);

  const values = {
    favorites,
    setFavorites,
    isInFavorites: isInFavorites,
    removeProductFromFavorites,
    addToFavorites,
    totalFavoriteValue,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default { FavoritesContext, FavoritesProvider };
