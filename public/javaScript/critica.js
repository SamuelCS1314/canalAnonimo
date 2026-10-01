function contadorSugestao() {
    let sugestao = document.getElementById('sugestao').value.length;
    document.getElementById('contadorSugestao').textContent = sugestao;
}
    var controle = false

function semNome(){
    if(controle != true){
        controle = true
        document.getElementById("campoNome").style.display = "none"; 
    } else{
        controle = false
        document.getElementById("campoNome").style.display = "flex";
    };

}

function enviarFormulario(){
   const formularioCritica = {
      setor :    document.getElementById('setor').value,
      assunto :  document.getElementById('assunto').value,
      descricao: document.getElementById('descricao').value,
      sugestao:  document.getElementById('sugestao').value, 
      nome:      document.getElementById('nome').value
    };

    fetch('/api/uploads/criticas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formularioCritica)
    })
    .then(resposta => resposta.json())
    .then(dados => {
        document.getElementById("formulario").style.display = "none";
        document.getElementById("mensagemSucesso").style.display = "block";
        document.getElementById("mensagem").textContent = `Sua manifestação foi registrada. Guarde o protocolo: ${dados.insertId}`;
    })
    .catch(err => console.error('Erro no fetch ', err));    
};