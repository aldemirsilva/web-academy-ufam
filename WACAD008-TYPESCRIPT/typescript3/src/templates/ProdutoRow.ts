import { IProduto } from "../model/IProduto";

const BADGE_COLORS: Record<string, string> = {
  TV: "bg-primary",
  Celular: "bg-success",
  Bicicleta: "bg-warning text-dark",
};

export function createRow(produto: IProduto): string {
  const badgeClass = BADGE_COLORS[produto.tipo] ?? "bg-secondary";
  const valorFormatado = produto.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return `
    <tr>
      <td><span class="badge ${badgeClass}">${produto.tipo}</span></td>
      <td>${produto.fabricante}</td>
      <td>${produto.modelo}</td>
      <td class="text-muted small">${produto.getDetalhes()}</td>
      <td class="fw-bold">${valorFormatado}</td>
      <td>
        <form method="post" action="/produto/${produto.id}/delete" class="d-inline">
          <button type="submit" class="btn btn-sm btn-outline-danger">Remover</button>
        </form>
      </td>
    </tr>`;
}
