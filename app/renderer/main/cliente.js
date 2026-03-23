
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
    };

    try {
        const result = await window.electronAPI.saveClient(data);
        console.log('cliente salvo com sucesso:', result);

    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        alert('Erro ao salvar cliente!');
    }
});