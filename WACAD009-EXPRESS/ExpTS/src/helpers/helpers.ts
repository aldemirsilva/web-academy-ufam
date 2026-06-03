import { Prof, Technologies } from "./helpersTypes";

function listProfs(profs: Prof[]) {
  const list = profs.map((p) => `<li>${p.nome} - ${p.sala}</li>`);
  return `<ul>${list.join("")}</ul>`;
}

function listTechnologies(tech: Technologies) {
  return `<li>${tech.name} - ${tech.type}</li>`;
}

export default { listProfs, listTechnologies };
