// shared/controller-sync.js
const channel = new BroadcastChannel('parada_control_channel');

export const CONTROL_ACTIONS = {
  SET_RADIO: 'SET_RADIO',
  STOP_RADIO: 'STOP_RADIO',
  SET_STREAM: 'SET_STREAM',
  STOP_STREAM: 'STOP_STREAM',
  SET_VOLUME: 'SET_VOLUME',
  RESET_ALL: 'RESET_ALL'
};

// Enviar un comando desde el Controlador
export function sendControlCommand(action, payload = {}) {
  channel.postMessage({ action, payload, timestamp: Date.now() });
}

// Escuchar comandos en los Televisores
export function listenControlCommands(callback) {
  channel.onmessage = (event) => {
    if (event.data && event.data.action) {
      callback(event.data.action, event.data.payload);
    }
  };
}