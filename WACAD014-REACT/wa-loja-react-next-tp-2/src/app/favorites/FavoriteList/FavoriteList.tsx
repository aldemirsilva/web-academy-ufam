import { ProductType } from "@/app/types/product";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";

interface FavoriteListProps {
  favoriteItems: ProductType[];
  onRemoveItemFromFavorite: (id: string) => void;
}

export function FavoriteList({
  favoriteItems,
  onRemoveItemFromFavorite,
}: FavoriteListProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos favoritos</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoriteItems.map((item) => (
                <FavoriteItem
                  key={item.id}
                  favoriteItem={item}
                  onRemoveItemFromFavorite={() =>
                    onRemoveItemFromFavorite(item.id)
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
