function contadorSugestao() {
    let sugestao = document.getElementById('sugestao').value.length;
    document.getElementById('contadorSugestao').textContent = sugestao;
    console.log(sugestao)
}

function criarJson(){
   const formulario = {
      setor :    document.getElementById('setor').value,
      assunto :  document.getElementById('assunto').value,
      descricao: document.getElementById('descricao').value,
      sugestao:  document.getElementById('sugestao').value, 
      nome:      document.getElementById('nome').value
    };
    
    console.log(formulario);

    const jsonString = JSON.stringify(formulario, null, 2);

    // 3. Criar o arquivo para download no navegador
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'formulario.json'; // Nome do arquivo sugerido
    link.click();

    // Limpar a memória
    URL.revokeObjectURL(url);
    console.log('Download do JSON iniciado com sucesso!');
}