function contadorTestemunhas(){
    let testemunhas = document.getElementById('testemunhas').value.length; 
    document.getElementById('contadorTestemunhas').textContent = testemunhas
    console.log(testemunhas);
}