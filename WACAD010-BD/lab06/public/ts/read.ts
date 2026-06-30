interface ReadClienteDTO {
  cpf: string;
  nome_completo: string;
  celular: string;
  e_mail: string;
  data_nascimento: string;
}

const form = document.getElementById("form-read") as HTMLFormElement;
const resultado = document.getElementById("resultado") as HTMLPreElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const cpf = (document.getElementById("cpf") as HTMLInputElement).value.trim();

  try {
    const response = await fetch(`/v1/clientes/${encodeURIComponent(cpf)}`, {
      method: "GET",
    });

    const text = await response.text();
    const data = text ? (JSON.parse(text) as ReadClienteDTO | null) : null;

    if (!response.ok) {
      resultado.textContent = `Erro ${response.status}: ${JSON.stringify(data, null, 2)}`;
      return;
    }

    if (!data) {
      resultado.textContent = "Cliente não encontrado.";
      return;
    }

    resultado.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    resultado.textContent = `Erro de rede: ${String(err)}`;
  }
});

export {};
