function contadorSolucao(){
    let solucao = document.getElementById('solucao').value.length;
    document.getElementById('contadorSolucao').textContent = solucao;
    console.log(solucao);
}