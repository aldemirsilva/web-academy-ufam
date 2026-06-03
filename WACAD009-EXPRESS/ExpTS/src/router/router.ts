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

router.get("/hb1", (req, res) => {
  const message = "Bem-vindo(a) ao Web Academy!";
  res.render("hb1", {
    message,
    layout: false,
  });
});

router.get("/hb2", (req, res) => {
  res.render("hb2", {
    poweredByNodeJs: true,
    name: "Express",
    type: "Framework",
    message: "A mensagem não será exibida!",
    layout: false,
  });
});

router.get("/hb3", (req, res) => {
  const profs = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernades", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 },
  ];
  res.render("hb3", {
    profs,
    layout: false,
  });
});

router.get("/hb4", (req, res) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodeJs: true },
    { name: "Laravel", type: "Framework", poweredByNodeJs: false },
    { name: "React", type: "Library", poweredByNodeJs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodeJs: true },
    { name: "Django", type: "Framework", poweredByNodeJs: false },
    { name: "Docker", type: "Virtualization", poweredByNodeJs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodeJs: true },
  ];
  res.render("hb4", {
    technologies,
    layout: false,
  });
});

router.use((req, res) => {
  res.statusCode = 404;
  res.send("Erro 404: Página não encontrada.");
});

export default router;
