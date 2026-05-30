import { IProduto } from "./IProduto";

export default class TV implements IProduto {
  constructor(
    private _id: string,
    private _modelo: string,
    private _resolucao: string,
    private _tamanho: number,
    private _fabricante: string,
    private _valor: number,
  ) {}

  get tipo(): string {
    return "TV";
  }

  get id(): string {
    return this._id;
  }

  get modelo(): string {
    return this._modelo;
  }

  get resolucao(): string {
    return this._resolucao;
  }

  get tamanho(): number {
    return this._tamanho;
  }

  get fabricante(): string {
    return this._fabricante;
  }

  get valor(): number {
    return this._valor;
  }

  getDetalhes(): string {
    return `${this._resolucao} · ${this._tamanho}"`;
  }
}
