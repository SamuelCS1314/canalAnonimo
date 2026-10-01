function contadorSolucao() {
    let solucao = document.getElementById('solucao').value.length;
    document.getElementById('contadorSolucao').textContent = solucao;
    console.log(solucao);
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
    const formReclamacao = {
        categoria: document.getElementById("categoria").value,
        setor: document.getElementById("setor").value,
        nivel_urgencia: document.getElementById("urgencia").value,
        resumo_reclamacao: document.getElementById("assunto").value,
        descricao: document.getElementById("descricao").value,
        tentou_resolver: tentouResolver(),
        solucao: document.getElementById("solucao").value,
        nome: document.getElementById("nome").value
    }

    const arquivoReclamacao = getElementById("comprovante");

    const formAquivo = new FormData();
    formAquivo.append ('arquivoReclamacao', arquivoReclamacao.files[0]);
    async resposta => await fetch('https://localhost:3000/uploads/reclamacao/arquivos', {
        method: 'POST',
        body: formAquivo
    });
    const dados = resposta.json();
    console.log(dados.url);
    
    fetch('api/uploads/reclamacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formReclamacao)
    }).then(resposta => resposta.json())
        .then(dados => {
            document.getElementById("formulario").style.display = "none";
            document.getElementById("mensagemSucesso").style.display = "block";
            document.getElementById("mensagem").textContent = `Sua manifestação foi registrada. Guarde o protocolo: ${dados.insertId}`;
        })
        .catch(err => console.error('Erro no fetch ', err));
};