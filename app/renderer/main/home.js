const productButton = document.getElementById('product-button');
const userButton = document.getElementById('user-button');
const fornecedorButton = document.getElementById('fornecedor-button');
const companyButton = document.getElementById('company-button');
const customerButton = document.getElementById('customer-button');

productButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaproduto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});


userButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listausuario.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de usuarios:', error);
    }
});


fornecedorButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listafornecedor.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de fornecedores:', error);
    }
});

companyButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listacompanhia.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de empresas:', error);
    }
});

customerButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listacliente.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de clientes:', error);
    }
});