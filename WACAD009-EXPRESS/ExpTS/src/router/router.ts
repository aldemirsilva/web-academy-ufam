import Router from "express";
import { loremIpsum } from "lorem-ipsum";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/about", (req, res) => {
  res.send("Pagina sobre");
});

router.get("/bem-vindo/:nome", (req, res) => {
  const nome = req.params.nome;
  res.send(`Seja bem-vindo(a), ${nome}!`);
});

router.get("/lorem/:paragrafos", (req, res) => {
  const lorem = loremIpsum({
    count: parseInt(req.params.paragrafos),
    format: "html",
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    random: Math.random,
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    suffix: "\n",
    units: "paragraphs",
  });
  res.send(lorem);
});

router.use((req, res) => {
  res.statusCode = 404;
  res.send("Erro 404: Página não encontrada.");
});

export default router;
