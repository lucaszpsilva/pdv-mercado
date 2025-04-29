const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { screen } = require("electron"); // Importe o módulo screen

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("index.html");
}

function createSubWindow(pagina) {
  // Obtém as dimensões da tela primária do usuário
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize; // Dimensões disponíveis (exclui barra de tarefas)

  const subWindow = new BrowserWindow({
    width: width, // 100% da largura da tela
    height: height, // 100% da altura da tela
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Carrega a página solicitada
  subWindow.loadFile(pagina);

  // Opcional: Maximizar a janela para garantir que ela ocupe a tela inteira
  subWindow.maximize();

  // Esconde a janela principal (opcional, se desejar)
  // mainWindow.hide();

  // Quando fechar a sub-janela, volta com a principal
  subWindow.on("closed", () => {
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("abrir-pagina", (event, pagina) => {
  createSubWindow(pagina);
});

// Listener para o botão "Sair" (já adicionado anteriormente)
ipcMain.on("sair-app", () => {
  app.quit();
});
