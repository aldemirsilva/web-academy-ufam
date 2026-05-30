import { IProduto } from "./IProduto";

export interface ICarrinho<T extends IProduto> {
  readonly itens: T[];
  addProduto(produto: T): void;
  removeProduto(id: string): void;
  getProduto(id: string): T | undefined;
  getNumItens(): number;
  getTotal(): number;
}

export default class Carrinho<T extends IProduto> implements ICarrinho<T> {
  constructor(private _itens: T[] = []) {}

  get itens(): T[] {
    return this._itens;
  }

  addProduto(produto: T): void {
    this._itens.push(produto);
  }

  removeProduto(id: string): void {
    this._itens = this._itens.filter((p) => p.id !== id);
  }

  getProduto(id: string): T | undefined {
    return this._itens.find((p) => p.id === id);
  }

  getNumItens(): number {
    return this._itens.length;
  }

  getTotal(): number {
    return this._itens.reduce((acc, p) => acc + p.valor, 0);
  }
}
