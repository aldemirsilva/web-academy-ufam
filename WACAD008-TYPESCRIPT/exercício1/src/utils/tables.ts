export type TodoTuple = [string, Date];

export function createRow(id: number, todo: TodoTuple): string {
  const [titulo, data] = todo;
  const dataFormatada = data.toLocaleString("pt-BR");

  return `
      <tr>
        <td>${id + 1}</td>
        <td>${titulo}</td>
        <td>${dataFormatada}</td>
        <td>
          <button type="button" class="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal" data-bs-target="#modalEditar"
            data-id="${id}" data-titulo="${titulo.replace(/"/g, '&quot;')}">Editar</button>
          <form method="post" action="/todo/${id}/delete" class="d-inline">
            <button type="submit" class="btn btn-sm btn-outline-danger">Excluir</button>
          </form>
        </td>
      </tr>`;
}

export default { createRow };
