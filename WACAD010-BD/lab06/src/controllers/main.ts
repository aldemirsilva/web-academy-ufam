import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { loremIpsum } from "lorem-ipsum"

const index = (req: Request, res: Response) => {
  res.send("Hello World!")
}

const about = (req: Request, res: Response) => {
  res.send("Pagina sobre")
}

const welcome = (req: Request, res: Response) => {
  const nome = req.params.nome
  res.send(`Seja bem-vindo(a), ${nome}!`)
}

const lorem = (req: Request, res: Response) => {
  const lorem = loremIpsum({
    count: parseInt(req.params.paragrafos as string),
    format: "html",
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    random: Math.random,
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    suffix: "\n",
    units: "paragraphs",
  })
  res.send(lorem)
}

const hb1 = (req: Request, res: Response) => {
  const message = "Bem-vindo(a) ao Web Academy!"
  res.render("main/hb1", {
    message,
  })
}

const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    poweredByNodeJs: true,
    name: "Express",
    type: "Framework",
    message: "A mensagem não será exibida!",
  })
}

const hb3 = (req: Request, res: Response) => {
  const profs = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernades", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 },
  ]
  res.render("main/hb3", {
    profs,
  })
}

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodeJs: true },
    { name: "Laravel", type: "Framework", poweredByNodeJs: false },
    { name: "React", type: "Library", poweredByNodeJs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodeJs: true },
    { name: "Django", type: "Framework", poweredByNodeJs: false },
    { name: "Docker", type: "Virtualization", poweredByNodeJs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodeJs: true },
  ]
  res.render("main/hb4", {
    technologies,
  })
}

const not_found = (req: Request, res: Response) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send("<h1>Erro 404: Página não encontrada.</h1>")
}

export default { index, about, welcome, lorem, hb1, hb2, hb3, hb4, not_found }
