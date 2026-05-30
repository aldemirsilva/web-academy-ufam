import Aluno from "./Aluno";

export default class Turma {
  constructor(
    private _id: string = "1",
    private _nome: string = "Turma de Educação Física",
    private _alunos: Aluno[] = [],
  ) {}

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get alunos(): Aluno[] {
    return this._alunos;
  }

  getNumAlunos(): number {
    return this._alunos.length;
  }

  private calcMedia(extrator: (aluno: Aluno) => number): number {
    if (this._alunos.length === 0) return 0;
    const soma = this._alunos.reduce((acc, aluno) => acc + extrator(aluno), 0);
    return soma / this._alunos.length;
  }

  getMediaIdades(): number {
    return this.calcMedia((aluno) => aluno.idade);
  }

  getMediaAlturas(): number {
    return this.calcMedia((aluno) => aluno.altura);
  }

  getMediaPesos(): number {
    return this.calcMedia((aluno) => aluno.peso);
  }

  addAluno(aluno: Aluno): void {
    this._alunos.push(aluno);
  }

  removeAluno(id: string): void {
    this._alunos = this._alunos.filter((a) => a.id !== id);
  }

  getAluno(id: string): Aluno | undefined {
    return this._alunos.find((a) => a.id === id);
  }
}
