const form = document.getElementById("form-delete") as HTMLFormElement;
const resultado = document.getElementById("resultado") as HTMLPreElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const cpf = (document.getElementById("cpf") as HTMLInputElement).value.trim();

  try {
    const response = await fetch(`/v1/clientes/${encodeURIComponent(cpf)}`, {
      method: "DELETE",
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      resultado.textContent = `Erro ${response.status}: ${JSON.stringify(data, null, 2)}`;
      return;
    }

    resultado.textContent = "Cliente excluído com sucesso.";
  } catch (err) {
    resultado.textContent = `Erro de rede: ${String(err)}`;
  }
});

export {};
