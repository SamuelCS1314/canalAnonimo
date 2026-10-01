function contadorTestemunhas() {
    let testemunhas = document.getElementById('testemunhas').value.length;
    document.getElementById('contadorTestemunhas').textContent = testemunhas
    console.log(testemunhas);
}

function semNome(){
    if(controle != true){
        controle = true
        document.getElementById("campoNome").style.display = "none"; 
    } else{
        controle = false
        document.getElementById("campoNome").style.display = "flex";
    };
}

function enviarFormulario() {
    const formDenuncia = {
        tipo_denuncia: document.getElementById("tipoDenuncia").value,
        setor: document.getElementById("setor").value,
        local: document.getElementById("local").value,
        pessoa_envolvida: document.getElementById("envolvidos").value,
        descricao: document.getElementById("descricao").value,
        testemunhas: document.getElementById("400").value,
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
    }

    const arquivoDenuncia = getElementById("evidencia");

    const formAquivo = new FormData();
    formAquivo.append('arquivoDenuncia', arquivoDenuncia.files[0]);
    async resposta => await fetch('https://localhost:3000/uploads/denuncias/arquivos', {
        method: 'POST',
        body: formAquivo
    });
    const dados = resposta.json();
    console.log(dados.url);

    fetch('api/uploads/denuncia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDenuncia)
    }).then(resposta => resposta.json())
        .then(dados => {
            document.getElementById("formulario").style.display = "none";
            document.getElementById("mensagemSucesso").style.display = "block";
            document.getElementById("mensagem").textContent = `Sua manifestação foi registrada. Guarde o protocolo: ${dados.insertId}`;
        })
        .catch(err => console.error('Erro no fetch ', err));
};