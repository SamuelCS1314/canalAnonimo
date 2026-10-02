function contadorSolucao() {
    const solucao =
        document.getElementById("solucao").value.length;

    document.getElementById(
        "contadorSolucao"
    ).textContent = solucao;
}

function semNome() {
    const anonimo =
        document.getElementById("anonimo").checked;

    const campoNome =
        document.getElementById("campoNome");

    campoNome.style.display =
        anonimo ? "none" : "flex";

    if (anonimo) {
        document.getElementById("nome").value = "";
    }
}

async function enviarFormulario(evento) {
    evento.preventDefault();

    const tentativaMarcada =
        document.querySelector(
            'input[name="tentou-resolver"]:checked'
        );

    const formReclamacao = {
        categoria:
            document.getElementById("categoria").value,

        setor:
            document.getElementById("setor").value,

        nivel_urgencia:
            document.getElementById("urgencia").value,

        resumo_reclamacao:
            document.getElementById("assunto").value,

        descricao:
            document.getElementById("descricao").value,

        tentou_resolver:
            tentativaMarcada
                ? tentativaMarcada.value
                : "",

        sugestao:
            document.getElementById("solucao").value,

        nome:
            document.getElementById("nome").value
    };

    try {
        const resposta = await fetch(
            "/api/uploads/reclamacao",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formReclamacao)
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                "Erro ao enviar reclamação"
            );
        }

        document.getElementById(
            "formReclamacao"
        ).style.display = "none";

        document.getElementById(
            "msgSucesso"
        ).style.display = "block";

        document.getElementById(
            "numeroProtocolo"
        ).textContent = "REC-" + dados.id;
    } catch (erro) {
        console.error(erro);
        alert(erro.message);
    }
}

document.getElementById(
    "formReclamacao"
).addEventListener(
    "submit",
    enviarFormulario
);