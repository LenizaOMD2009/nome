const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPage: (pageName) => ipcRenderer.invoke('window:open-page', pageName),
    goHome: () => ipcRenderer.invoke('window:open-page', 'index.html'),
    saveProduct: (data) => ipcRenderer.invoke('product:save', data),
    saveClient: (data) => ipcRenderer.invoke('client:save', data),
    saveUser: (data) => ipcRenderer.invoke('users:save', data),
    saveCompany: (data) => ipcRenderer.invoke('company:save', data),
    saveSupplier: (data) => ipcRenderer.invoke('supplier:save', data),
    searchProduct: (data) => ipcRenderer.invoke('product:search', data),
    searchClient: (data) => ipcRenderer.invoke('client:search', data),
    searchSupplier: (data) => ipcRenderer.invoke('supplier:search', data),
    searchUser: (data) => ipcRenderer.invoke('users:search', data),
    searchCompany: (data) => ipcRenderer.invoke('company:search', data),
});