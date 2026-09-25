function contadorSugestao() {
    let sugestao = document.getElementById('sugestao').value.length;
    document.getElementById('contadorSugestao').textContent = sugestao;
}

function criarJson(){
    const date = new Date();
    console.log(date)
    const data = date.toLocaleDateString("en");
    console.log(data)

   const formularioCritica = {
      setor :    document.getElementById('setor').value,
      data:      data,
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
    .then(resposta => {
        if(!resposta.ok) throw new Error('Erro na requisição');
        return resposta.json();
    })
    .then(dados => console.log('Resposta API: ',dados))
    .catch(err => console.error('Erro no fetch ', err));    
};
