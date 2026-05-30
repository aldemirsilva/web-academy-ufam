export interface IProduto {
  id: string;
  tipo: string;
  modelo: string;
  fabricante: string;
  valor: number;
  getDetalhes(): string;
}
