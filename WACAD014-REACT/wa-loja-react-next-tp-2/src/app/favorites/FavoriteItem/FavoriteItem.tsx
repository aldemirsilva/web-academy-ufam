import { useRemoveFavorite } from "@/app/hooks/useRemoveFavorite";
import { ProductType } from "@/app/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface FavoriteItemProps {
  favoriteItem: ProductType;
}

export function FavoriteItem({ favoriteItem }: FavoriteItemProps) {
  const queryClient = useQueryClient();
  const { id, nome, preco } = favoriteItem;

  const handleSuccess = () => {
    toast.success("Produto favorito removido!");
    queryClient.invalidateQueries({ queryKey: ["favoriteList"] });
  };

  const handleError = () => {
    toast.error("Erro ao remover produto favorito. Tente novamente.");
  };

  const { removeFavoriteProduct } = useRemoveFavorite(
    handleSuccess,
    handleError,
  );

  return (
    <tr key={id}>
      <td>{nome}</td>
      <td>R$ {parseFloat(preco).toFixed(2)}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeFavoriteProduct(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
