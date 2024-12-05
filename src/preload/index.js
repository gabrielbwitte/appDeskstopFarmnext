import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('apiElectron', {
  toSend: (message) => ipcRenderer.send('rendererMessage', message),
  toReceive: (message) => ipcRenderer.on('mainMessage', message)
});
