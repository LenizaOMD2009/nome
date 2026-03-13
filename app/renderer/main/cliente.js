
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        full_name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
    };

    try {
        const result = await window.electronAPI.saveCustomer(data);
        console.log('cliente salvo com sucesso:', result);

    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        alert('Erro ao salvar cliente!');
    }
});