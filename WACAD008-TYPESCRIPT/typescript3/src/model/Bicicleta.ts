import { IProduto } from "./IProduto";

export default class Bicicleta implements IProduto {
  constructor(
    private _id: string,
    private _modelo: string,
    private _aro: number,
    private _fabricante: string,
    private _valor: number,
  ) {}

  get tipo(): string {
    return "Bicicleta";
  }

  get id(): string {
    return this._id;
  }

  get modelo(): string {
    return this._modelo;
  }

  get aro(): number {
    return this._aro;
  }

  get fabricante(): string {
    return this._fabricante;
  }

  get valor(): number {
    return this._valor;
  }

  getDetalhes(): string {
    return `Aro ${this._aro}`;
  }
}
