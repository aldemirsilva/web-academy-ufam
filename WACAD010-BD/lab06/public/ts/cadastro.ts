interface CreateClienteDTO {
  cpf: string;
  nome_completo: string;
  celular: string;
  e_mail: string;
  data_nascimento: string;
}

const form = document.getElementById("form-cliente") as HTMLFormElement;
const resultado = document.getElementById("resultado") as HTMLPreElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const payload: CreateClienteDTO = {
    cpf: (document.getElementById("cpf") as HTMLInputElement).value,
    nome_completo: (
      document.getElementById("nome_completo") as HTMLInputElement
    ).value,
    celular: (document.getElementById("celular") as HTMLInputElement).value,
    e_mail: (document.getElementById("e_mail") as HTMLInputElement).value,
    data_nascimento: (
      document.getElementById("data_nascimento") as HTMLInputElement
    ).value,
  };

  try {
    const response = await fetch("/v1/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      resultado.textContent = `Erro ${response.status}: ${JSON.stringify(data, null, 2)}`;
      return;
    }

    form.reset();
    resultado.textContent = `Cadastrado com sucesso:\n${JSON.stringify(data, null, 2)}`;
  } catch (err) {
    resultado.textContent = `Erro de rede: ${String(err)}`;
  }
});

export {};
