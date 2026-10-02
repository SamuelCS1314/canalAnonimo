document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formLoginAdm');
    const mensagemErro = document.getElementById('mensagemErro');

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        mensagemErro.classList.remove('visivel');

        const formularioLogin = {
            email:   document.getElementById('email').value,
            senha:   document.getElementById('senha').value,
            lembrar: document.getElementById('lembrar').checked
        };

        // Caminho relativo: funciona porque a página é aberta em http://localhost:3100/login.html
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioLogin)
        })
        .then(resposta => resposta.json().then(dados => ({ ok: resposta.ok, dados: dados })))
        .then(({ ok, dados }) => {
            if (!ok) {
                mensagemErro.textContent = dados.erro;
                mensagemErro.classList.add('visivel');
                return;
            }
            window.location.href = 'chamadas.html';
        })
        .catch(err => {
            console.error('Erro no fetch ', err);
            mensagemErro.textContent = 'Erro ao conectar com o servidor';
            mensagemErro.classList.add('visivel');
        });
    });
});