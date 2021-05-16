import { ipcRenderer } from 'electron';
function init() {
  window.isElectron = true
  window.ipcRenderer = ipcRenderer
}
init();