function contadorTestemunhas() {
    const testemunhas =
        document.getElementById(
            "testemunhas"
        ).value.length;

    document.getElementById(
        "contadorTestemunhas"
    ).textContent = testemunhas;
}

function semNome() {
    const anonimo =
        document.getElementById("anonimo").checked;

    const dadosContato =
        document.getElementById("dadosContato");

    dadosContato.style.display =
        anonimo ? "none" : "grid";

    if (anonimo) {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    }
}

async function enviarFormulario(evento) {
    evento.preventDefault();

    const formDenuncia = {
        tipo_denuncia:
            document.getElementById(
                "tipoDenuncia"
            ).value,

        setor:
            document.getElementById("setor").value,

        local:
            document.getElementById("local").value,

        pessoa_envolvidas:
            document.getElementById(
                "envolvidos"
            ).value,

        descricao:
            document.getElementById(
                "descricao"
            ).value,

        testemunhas:
            document.getElementById(
                "testemunhas"
            ).value,

        nome:
            document.getElementById("nome").value,

        email:
            document.getElementById("email").value
    };

    try {
        const resposta = await fetch(
            "/api/uploads/denuncia",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formDenuncia)
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                "Erro ao enviar denúncia"
            );
        }

        document.getElementById(
            "formDenuncia"
        ).style.display = "none";

        document.getElementById(
            "msgSucesso"
        ).style.display = "block";

        document.getElementById(
            "numeroProtocolo"
        ).textContent = "DEN-" + dados.id;
    } catch (erro) {
        console.error(erro);
        alert(erro.message);
    }
}

document.getElementById(
    "formDenuncia"
).addEventListener(
    "submit",
    enviarFormulario
);