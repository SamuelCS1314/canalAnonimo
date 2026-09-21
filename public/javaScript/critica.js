function contadorSugestao() {
    let sugestao = document.getElementById('sugestao').value.length;
    document.getElementById('contadorSugestao').textContent = sugestao;
    console.log(sugestao)
}

function criarJson(){
    const date = new Date();
    const data = date.toLocalDateString("pt-br");
    
   const formCritica = {
      setor :    document.getElementById('setor').value,
      data:      data,
      assunto :  document.getElementById('assunto').value,
      descricao: document.getElementById('descricao').value,
      sugestao:  document.getElementById('sugestao').value, 
      nome:      document.getElementById('nome').value
    };
    
    console.log(formCritica);

    const jsonString = JSON.stringify(formCritica, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `formCritica${data}.json`; link.click();

    URL.revokeObjectURL(url);
    console.log('Download do JSON iniciado com sucesso!');
}
