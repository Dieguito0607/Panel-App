// shared/controller-sync.js
// Asegúrate de incluir la librería de Supabase en tu HTML o importarla
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Sustituye con tus credenciales de Supabase
const SUPABASE_URL = https://sfwlrpwamioiazmqfpmp.supabase.co;
const SUPABASE_ANON_KEY = sb_publishable_cuEqC1dZ27unkGPivAcV3A_a73_avUF;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const channel = supabase.channel('parada_control_room');

// Suscribirse al canal al cargar
channel.subscribe();

export const CONTROL_ACTIONS = {
  SET_RADIO: 'SET_RADIO',
  STOP_RADIO: 'STOP_RADIO',
  SET_STREAM: 'SET_STREAM',
  STOP_STREAM: 'STOP_STREAM',
  RESET_ALL: 'RESET_ALL'
};

// Enviar comandos desde el Controlador (vía WebSocket hacia la nube)
export function sendControlCommand(action, payload = {}) {
  channel.send({
    type: 'broadcast',
    event: 'control_action',
    payload: { action, payload, timestamp: Date.now() }
  });
}

// Escuchar comandos en cualquier pantalla del mundo conectada a Vercel
export function listenControlCommands(callback) {
  channel.on('broadcast', { event: 'control_action' }, (response) => {
    if (response.payload && response.payload.action) {
      callback(response.payload.action, response.payload.payload);
    }
  });
}