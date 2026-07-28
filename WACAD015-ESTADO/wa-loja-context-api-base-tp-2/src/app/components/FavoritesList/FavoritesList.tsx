import { calculateDiscountedPrice } from "@/app/helpers";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { useFavoritesContext } from "@/app/components/hooks/useFavoritesContext";

export default function FavoritesList() {
  const { favorites } = useFavoritesContext();
  const totalFavoriteValue = favorites.reduce((acc, product) => {
    return (
      acc + calculateDiscountedPrice(Number(product.preco), product.desconto)
    );
  }, 0);

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>

        {favorites.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((item) => (
                  <FavoriteItem key={item.id} favoriteItem={item} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sua lista de favoritos está vazia.</p>
        )}
      </div>
      <div className="card-footer d-flex flex-column">
        <small className="text-muted">
          Quantidade de produtos: {favorites.length}
        </small>

        <small className="text-muted">
          Valor total: R$ {totalFavoriteValue.toFixed(2)}
        </small>
      </div>
    </div>
  );
}
