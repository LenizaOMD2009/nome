
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cnpj').value,
    };

    try {
        const result = await window.electronAPI.saveCompany(data);
        console.log('empresa salva com sucesso:', result);

    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        alert('Erro ao salvar empresa!');
    }
});