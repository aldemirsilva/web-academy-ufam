interface UpdateClienteDTO {
  cpf: string;
  nome_completo: string;
  celular: string;
  e_mail: string;
  data_nascimento: string;
}

const form = document.getElementById("form-update") as HTMLFormElement;
const resultado = document.getElementById("resultado") as HTMLPreElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const cpf = (document.getElementById("cpf") as HTMLInputElement).value.trim();
  const nomeCompleto = (
    document.getElementById("nome_completo") as HTMLInputElement
  ).value;
  const celular = (document.getElementById("celular") as HTMLInputElement)
    .value;
  const eMail = (document.getElementById("e_mail") as HTMLInputElement).value;
  const dataNascimento = (
    document.getElementById("data_nascimento") as HTMLInputElement
  ).value;

  const payload: Omit<UpdateClienteDTO, "cpf"> = {
    nome_completo: nomeCompleto,
    celular,
    e_mail: eMail,
    data_nascimento: dataNascimento,
  };

  try {
    const response = await fetch(`/v1/clientes/${encodeURIComponent(cpf)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      resultado.textContent = `Erro ${response.status}: ${JSON.stringify(data, null, 2)}`;
      return;
    }

    resultado.textContent = `Atualizado com sucesso:\n${JSON.stringify(data, null, 2)}`;
  } catch (err) {
    resultado.textContent = `Erro de rede: ${String(err)}`;
  }
});

export {};
