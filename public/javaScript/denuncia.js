function contadorTestemunhas(){
    let testemunhas = document.getElementById('testemunhas').value.length; 
    document.getElementById('contadorTestemunhas').textContent = testemunhas
    console.log(testemunhas);
}

function enviarFormulario(){
    const formDenuncia{
        const date = new Date();
        const data = date.toLocaleDateString("pt-br");

        denuncia : document.getElementById('tipoDenuncia').value,
        setor    : document.getElementById('setor').value,
        data     : data,
    };
};