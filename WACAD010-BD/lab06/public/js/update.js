const form = document.getElementById("form-update");
const resultado = document.getElementById("resultado");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cpf = document.getElementById("cpf").value.trim();
    const nomeCompleto = document.getElementById("nome_completo").value;
    const celular = document.getElementById("celular")
        .value;
    const eMail = document.getElementById("e_mail").value;
    const dataNascimento = document.getElementById("data_nascimento").value;
    const payload = {
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
    }
    catch (err) {
        resultado.textContent = `Erro de rede: ${String(err)}`;
    }
});
export {};
