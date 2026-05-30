import express, { type Request, type Response } from "express";
import fs from "fs/promises";
import { createRow, type TodoTuple } from "./utils/tables";

const app = express();
const PORT = 3000;

// Array de tuplas (armazenamento em memória)
const todos: TodoTuple[] = [];

// Faz o parser de body de formulários HTML (caso contrário, req.body é undefined)
app.use(express.urlencoded({ extended: true }));

// Monta a página completa (junta os partials e as linhas de tabela geradas a partir do array de tuplas)
async function renderPage(): Promise<string> {
  const partial1 = await fs.readFile("public/html/partial1.html", "utf-8");
  const partial2 = await fs.readFile("public/html/partial2.html", "utf-8");
  const rows = todos.map((todo, i) => createRow(i, todo)).join("\n");
  return partial1 + rows + partial2;
}

// GET / — lista todos os lembretes (gera a página completa e envia como resposta)
app.get("/", async (_req: Request, res: Response) => {
  const html = await renderPage();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
});

// POST /todo — cria novo lembrete (a data de inserção é a data atual)
app.post("/todo", (req: Request, res: Response) => {
  const titulo: string = (req.body.titulo as string)?.trim();
  if (titulo) {
    const novaTupla: TodoTuple = [titulo, new Date()];
    todos.push(novaTupla);
  }
  res.redirect("/");
});

// POST /todo/:id/delete — remove lembrete (usa splice para remover a tupla do array, se o id for válido)
app.post("/todo/:id/delete", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  if (!isNaN(id) && id >= 0 && id < todos.length) {
    todos.splice(id, 1);
  }
  res.redirect("/");
});

// POST /todo/:id/edit — salva edição (preserva data original)
app.post("/todo/:id/edit", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const novoTitulo: string = (req.body.titulo as string)?.trim();
  if (!isNaN(id) && id >= 0 && id < todos.length && novoTitulo) {
    // Preserva a data de inserção original — apenas o título muda
    todos[id] = [novoTitulo, todos[id][1]];
  }
  res.redirect("/");
});

// Servidor (escuta na porta definida e exibe mensagem no console quando estiver rodando)
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
