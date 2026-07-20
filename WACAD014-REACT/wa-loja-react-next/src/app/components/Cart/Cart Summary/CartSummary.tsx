interface CartSummaryProps {
  qtdTotalItems: number;
  totalPurcahse: number;
}

export function CartSummary({
  qtdTotalItems,
  totalPurcahse,
}: CartSummaryProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">Quantidade total: {qtdTotalItems}</p>
        <p className="card-text fw-medium">
          Valor total: R$ {totalPurcahse.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
