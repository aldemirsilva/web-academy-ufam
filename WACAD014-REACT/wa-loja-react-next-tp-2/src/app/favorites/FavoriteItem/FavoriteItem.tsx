import { ProductType } from "@/app/types/product";

interface FavoriteItemProps {
  favoriteItem: ProductType;
  onRemoveItemFromFavorite: (id: string) => void;
}

export function FavoriteItem({
  favoriteItem,
  onRemoveItemFromFavorite,
}: FavoriteItemProps) {
  const { id, nome, preco } = favoriteItem;
  return (
    <tr key={id}>
      <td>{nome}</td>
      <td>R$ {parseFloat(preco).toFixed(2)}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemoveItemFromFavorite(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
