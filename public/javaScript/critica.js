function contadorSugestao() {
    let sugestao = document.getElementById('sugestao').value.length;
    document.getElementById('contadorSugestao').textContent = sugestao;
    console.log(sugestao)
}

function criarJson(){
    const date = new Date();
    const data = date.toLocaleDateString("pt-br");
    
   const formularioCritica = {
      setor :    document.getElementById('setor').value,
      data:      data,
      assunto :  document.getElementById('assunto').value,
      descricao: document.getElementById('descricao').value,
      sugestao:  document.getElementById('sugestao').value, 
      nome:      document.getElementById('nome').value
    };

    fetch('/api/uploads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formularioCritica)
    })
    .then(resposta => resposta.json())
    .then(dados => console.log('Resposta API: ',dados))
    .catch(err => console.error(err));
};
