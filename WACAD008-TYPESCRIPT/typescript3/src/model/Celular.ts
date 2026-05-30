import { IProduto } from "./IProduto";

export default class Celular implements IProduto {
  constructor(
    private _id: string,
    private _modelo: string,
    private _memoria: string,
    private _fabricante: string,
    private _valor: number,
  ) {}

  get tipo(): string {
    return "Celular";
  }

  get id(): string {
    return this._id;
  }

  get modelo(): string {
    return this._modelo;
  }

  get memoria(): string {
    return this._memoria;
  }

  get fabricante(): string {
    return this._fabricante;
  }

  get valor(): number {
    return this._valor;
  }

  getDetalhes(): string {
    return `Memória: ${this._memoria}`;
  }
}
