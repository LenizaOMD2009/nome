const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        taxId: document.getElementById('tax_id').value,
    };

    try {
        const result = await window.electronAPI.saveCompany(data);
        console.log('empresa salva com sucesso:', result);
       
    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        alert('Erro ao salvar empresa!');
    }
});