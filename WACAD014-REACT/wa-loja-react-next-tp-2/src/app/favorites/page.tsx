"use client";

import { FavoriteList } from "./FavoriteList/FavoriteList";
import { useFavoriteList } from "../hooks/useFavoriteList";

export default function Favorites() {
  const { favorites } = useFavoriteList();

  return (
    <main>
      <div className="container p-5">
        <FavoriteList favoriteItems={favorites ?? []} />
      </div>
    </main>
  );
}
