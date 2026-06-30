const form = document.getElementById("form-delete");
const resultado = document.getElementById("resultado");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cpf = document.getElementById("cpf").value.trim();
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
    }
    catch (err) {
        resultado.textContent = `Erro de rede: ${String(err)}`;
    }
});
export {};
