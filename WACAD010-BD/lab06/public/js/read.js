const form = document.getElementById("form-read");
const resultado = document.getElementById("resultado");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cpf = document.getElementById("cpf").value.trim();
    try {
        const response = await fetch(`/v1/clientes/${encodeURIComponent(cpf)}`, {
            method: "GET",
        });
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
        if (!response.ok) {
            resultado.textContent = `Erro ${response.status}: ${JSON.stringify(data, null, 2)}`;
            return;
        }
        if (!data) {
            resultado.textContent = "Cliente não encontrado.";
            return;
        }
        resultado.textContent = JSON.stringify(data, null, 2);
    }
    catch (err) {
        resultado.textContent = `Erro de rede: ${String(err)}`;
    }
});
export {};
