const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPage: (pageName) => ipcRenderer.invoke('window:open-page', pageName),
    goHome: () => ipcRenderer.invoke('window:open-page', 'index.html'),
    saveProduct: (data) => ipcRenderer.invoke('product:save', data),
    saveUsers: (data) => ipcRenderer.invoke('users:save', data),
    saveCompany: (data) => ipcRenderer.invoke('company:save', data),
    saveSupplier: (data) => ipcRenderer.invoke('supplier:save', data),
    saveCustomer: (data) => ipcRenderer.invoke('customer:save', data),
});