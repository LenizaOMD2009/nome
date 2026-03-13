
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        contactName: document.getElementById('contact_name').value,
        category: document.getElementById('category').value,
    };

    try {
        const result = await window.electronAPI.saveSupplier(data);
        console.log('fornecedor salvo com sucesso:', result);
       
    } catch (error) {
        console.error('Erro ao salvar fornecedor:', error);
        alert('Erro ao salvar fornecedor!');
    }
});