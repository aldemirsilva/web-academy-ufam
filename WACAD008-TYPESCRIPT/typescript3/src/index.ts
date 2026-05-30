import express, { type Request, type Response } from "express";
import fs from "fs/promises";
import Carrinho from "./model/Carrinho";
import TV from "./model/TV";
import Celular from "./model/Celular";
import Bicicleta from "./model/Bicicleta";
import { type IProduto } from "./model/IProduto";
import { createRow } from "./templates/ProdutoRow";

const app = express();
const PORT = 3000;

const carrinho = new Carrinho<IProduto>();
let nextId = 1;

app.use(express.urlencoded({ extended: true }));

async function renderPage(): Promise<string> {
  let html = await fs.readFile("public/html/index.html", "utf-8");
  const vazio = carrinho.getNumItens() === 0;

  const totalFormatado = carrinho.getTotal().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return html
    .replace("{{NUM_ITENS}}", carrinho.getNumItens().toString())
    .replace("{{TOTAL}}", vazio ? "R$ 0,00" : totalFormatado)
    .replace(
      "{{ROWS}}",
      vazio ? "" : carrinho.itens.map((p) => createRow(p)).join("\n"),
    );
}

// GET / — exibe o carrinho com estatísticas
app.get("/", async (_req: Request, res: Response) => {
  const html = await renderPage();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
});

// POST /produto — adiciona produto ao carrinho
app.post("/produto", (req: Request, res: Response) => {
  const tipo = (req.body.tipo as string)?.toLowerCase().trim();
  const modelo = (req.body.modelo as string)?.trim();
  const fabricante = (req.body.fabricante as string)?.trim();
  const valor = parseFloat((req.body.valor as string)?.replace(",", "."));
  const id = (nextId++).toString();

  if (!modelo || !fabricante || isNaN(valor) || valor < 0) {
    res.redirect("/");
    return;
  }

  if (tipo === "tv") {
    const resolucao = (req.body.resolucao as string)?.trim() || "Full HD";
    const tamanho = parseFloat(req.body.tamanho as string);
    if (!isNaN(tamanho) && tamanho > 0) {
      carrinho.addProduto(
        new TV(id, modelo, resolucao, tamanho, fabricante, valor),
      );
    }
  } else if (tipo === "celular") {
    const memoria = (req.body.memoria as string)?.trim() || "64GB";
    carrinho.addProduto(new Celular(id, modelo, memoria, fabricante, valor));
  } else if (tipo === "bicicleta") {
    const aro = parseFloat(req.body.aro as string);
    if (!isNaN(aro) && aro > 0) {
      carrinho.addProduto(new Bicicleta(id, modelo, aro, fabricante, valor));
    }
  }

  res.redirect("/");
});

// POST /produto/:id/delete — remove produto do carrinho
app.post("/produto/:id/delete", (req: Request, res: Response) => {
  carrinho.removeProduto(req.params.id as string);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
