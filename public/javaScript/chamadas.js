document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnSair').addEventListener('click', function (evento) {
        evento.preventDefault();

        fetch('/api/logout', { method: 'POST' })
        .then(() => window.location.href = 'login.html')
        .catch(err => console.error('Erro no fetch ', err));
    });
});
