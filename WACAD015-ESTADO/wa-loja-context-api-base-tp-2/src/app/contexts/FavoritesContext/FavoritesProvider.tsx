"use client";
import { calculateDiscountedPrice } from "@/app/helpers";
import { Product } from "@/app/types/product";
import { createContext, useEffect, useState } from "react";

type FavoritesContextType = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isInFavorites: (id: string) => boolean;
  removeProductFromFavorites: (id: string) => void;
  addToFavorites: (productToAdd: Product) => void;
  totalFavoriteValue: number;
  saveLocalStorage: (newFavorites: Product[]) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
  isInFavorites: () => false,
  removeProductFromFavorites: () => false,
  addToFavorites: () => 0,
  totalFavoriteValue: 0,
  saveLocalStorage: () => {},
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

  const addToFavorites = (productToAdd: Product) => {
    const newFavorites = [...favorites, productToAdd];
    setFavorites(newFavorites);
    saveLocalStorage(newFavorites);
  };

  const removeProductFromFavorites = (id: string) => {
    const newFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(newFavorites);
    saveLocalStorage(newFavorites);
  };

  const totalFavoriteValue = favorites.reduce((acc, product) => {
    return (
      acc + calculateDiscountedPrice(Number(product.preco), product.desconto)
    );
  }, 0);

  const saveLocalStorage = (newFavorites: Product[]) => {
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const favoritesLocalStorage = localStorage.getItem("favorites");
    if (favoritesLocalStorage) setFavorites(JSON.parse(favoritesLocalStorage));
  }, []);

  const values = {
    favorites,
    setFavorites,
    isInFavorites: isInFavorites,
    removeProductFromFavorites,
    addToFavorites,
    totalFavoriteValue,
    saveLocalStorage,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default { FavoritesContext, FavoritesProvider };
