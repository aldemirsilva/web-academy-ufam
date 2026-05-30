import express, { type Request, type Response } from "express";
import fs from "fs/promises";
import Aluno from "./model/Aluno";
import Turma from "./model/Turma";
import { createRow } from "./templates/AlunoRow";

const app = express();
const PORT = 3000;

const turma = new Turma();
let nextId = 1;

app.use(express.urlencoded({ extended: true }));

async function renderPage(): Promise<string> {
  let html = await fs.readFile("public/html/index.html", "utf-8");
  const sem = turma.getNumAlunos() === 0;
  return html
    .replace("{{NUM_ALUNOS}}", turma.getNumAlunos().toString())
    .replace(
      "{{MEDIA_IDADES}}",
      sem ? "—" : `${turma.getMediaIdades().toFixed(1)} anos`,
    )
    .replace(
      "{{MEDIA_ALTURAS}}",
      sem ? "—" : `${turma.getMediaAlturas().toFixed(2)} m`,
    )
    .replace(
      "{{MEDIA_PESOS}}",
      sem ? "—" : `${turma.getMediaPesos().toFixed(1)} kg`,
    )
    .replace("{{ROWS}}", turma.alunos.map((a) => createRow(a)).join("\n"));
}

// GET / — exibe a turma com estatísticas
app.get("/", async (_req: Request, res: Response) => {
  const html = await renderPage();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
});

// POST /aluno — insere novo aluno
app.post("/aluno", (req: Request, res: Response) => {
  const nome = (req.body.nomeCompleto as string)?.trim();
  const idade = parseFloat(req.body.idade as string);
  const altura = parseFloat(req.body.altura as string);
  const peso = parseFloat(req.body.peso as string);

  if (nome && !isNaN(idade) && !isNaN(altura) && !isNaN(peso)) {
    turma.addAluno(new Aluno(nextId.toString(), nome, idade, altura, peso));
    nextId++;
  }
  res.redirect("/");
});

// POST /aluno/:id/edit — atualiza dados do aluno
app.post("/aluno/:id/edit", (req: Request, res: Response) => {
  const aluno = turma.getAluno(req.params.id as string);
  const nome = (req.body.nomeCompleto as string)?.trim();
  const idade = parseFloat(req.body.idade as string);
  const altura = parseFloat(req.body.altura as string);
  const peso = parseFloat(req.body.peso as string);

  if (aluno && nome && !isNaN(idade) && !isNaN(altura) && !isNaN(peso)) {
    aluno.nomeCompleto = nome;
    aluno.idade = idade;
    aluno.altura = altura;
    aluno.peso = peso;
  }
  res.redirect("/");
});

// POST /aluno/:id/delete — remove aluno da turma
app.post("/aluno/:id/delete", (req: Request, res: Response) => {
  turma.removeAluno(req.params.id as string);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
