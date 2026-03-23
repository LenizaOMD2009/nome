document.addEventListener('DOMContentLoaded', () => {
    $('#tabela').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
        }
    });

    const voltarButton = document.getElementById('voltar-button');
    const cadastroButton = document.getElementById('cadastro-button');

    voltarButton?.addEventListener('click', async () => {
        try {
            await window.electronAPI.goHome();
        } catch (error) {
            console.error('Erro ao voltar para home:', error);
        }
    });

    cadastroButton?.addEventListener('click', async () => {
        try {
            alert('Funcionalidade de cadastro de venda (não integrada a banco na versão inicial).');
        } catch (error) {
            console.error('Erro ao abrir cadastro de venda:', error);
        }
    });
});