export interface IAluno {
  id: string;
  nomeCompleto: string;
  idade: number;
  altura: number;
  peso: number;
}

export default class Aluno implements IAluno {
  constructor(
    private _id: string = "",
    private _nomeCompleto: string = "",
    private _idade: number = 0,
    private _altura: number = 0,
    private _peso: number = 0,
  ) {}

  get id(): string {
    return this._id;
  }

  get nomeCompleto(): string {
    return this._nomeCompleto;
  }

  set nomeCompleto(nomeCompleto: string) {
    this._nomeCompleto = nomeCompleto;
  }

  get idade(): number {
    return this._idade;
  }

  set idade(idade: number) {
    this._idade = idade;
  }

  get altura(): number {
    return this._altura;
  }

  set altura(altura: number) {
    this._altura = altura;
  }

  get peso(): number {
    return this._peso;
  }

  set peso(peso: number) {
    this._peso = peso;
  }
}
