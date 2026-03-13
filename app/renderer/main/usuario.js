
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    try {
        const result = await window.electronAPI.saveUsers(data);
        console.log('usuario salvo com sucesso:', result);
       
    } catch (error) {
        console.error('Erro ao salvar usuario:', error);
        alert('Erro ao salvar usuario!');
    }
});