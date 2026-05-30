import Aluno from "../model/Aluno";

export function createRow(aluno: Aluno): string {
  const nome = aluno.nomeCompleto.replace(/"/g, "&quot;");
  return `
      <tr>
        <td>${aluno.nomeCompleto}</td>
        <td>${aluno.idade} anos</td>
        <td>${aluno.altura.toFixed(2)} m</td>
        <td>${aluno.peso.toFixed(1)} kg</td>
        <td>
          <button type="button" class="btn btn-sm btn-outline-primary me-1"
            data-bs-toggle="modal" data-bs-target="#modalEditar"
            data-id="${aluno.id}"
            data-nome="${nome}"
            data-idade="${aluno.idade}"
            data-altura="${aluno.altura}"
            data-peso="${aluno.peso}">Editar</button>
          <form method="post" action="/aluno/${aluno.id}/delete" class="d-inline">
            <button type="submit" class="btn btn-sm btn-outline-danger">Remover</button>
          </form>
        </td>
      </tr>`;
}
