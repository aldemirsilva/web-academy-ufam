const form = document.getElementById("form-cliente");
const resultado = document.getElementById("resultado");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
        cpf: document.getElementById("cpf").value,
        nome_completo: document.getElementById("nome_completo").value,
        celular: document.getElementById("celular").value,
        e_mail: document.getElementById("e_mail").value,
        data_nascimento: document.getElementById("data_nascimento").value,
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
    }
    catch (err) {
        resultado.textContent = `Erro de rede: ${String(err)}`;
    }
});
export {};
