const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  abrirJanela: (pagina) => ipcRenderer.send("abrir-pagina", pagina),
  sairDoApp: () => ipcRenderer.send("sair-app"),
});
