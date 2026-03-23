
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };

    try {
        const result = await window.electronAPI.saveUser(data);
        console.log('usuario salvo com sucesso:', result);

    } catch (error) {
        console.error('Erro ao salvar usuario:', error);
        alert('Erro ao salvar usuario!');
    }
});