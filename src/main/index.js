import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Crie a janela do navegador
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR para renderizador baseado em electron-vite cli.
  // Carregue a URL remota para desenvolvimento ou o arquivo html local para produção.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


// Este método será chamado quando o Electron terminar
// inicialização e está pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas após esse evento ocorrer.
app.whenReady().then(() => {
  // Definir ID do modelo de usuário do aplicativo para Windows
  electronApp.setAppUserModelId('com.electron')

  // Abrir ou fechar o DevTools padrão por F12 em desenvolvimento
  // e ignorar CommandOrControl + R na produção.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Teste IPC
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // No macOS é comum recriar uma janela no aplicativo quando o
    // o ícone do dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Sair quando todas as janelas estiverem fechadas, exceto no macOS. Lá, é comum
// para que os aplicativos e suas barras de menu permaneçam ativos até que o usuário saia
// explicitamente com Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Neste arquivo você pode incluir o restante do processo principal específico do seu aplicativo
// código. Você também pode colocá-los em arquivos separados e solicitá-los aqui.
