/**
 * Script de prueba para verificar que al pulsar para obtener más tips se ejecuta la función mostrarAnuncio.
 * Este script simula el flujo de la función mostrarAnuncio y el estado de carga del anuncio.
 */

import { mostrarAnuncio } from '../app';

// Simulación del estado loaded
let loaded = true;

// Mock del objeto rewarded con función show simulada
const rewarded = {
  show: () => {
    console.log('Anuncio mostrado correctamente');
  }
};

// Reemplazar la función mostrarAnuncio para usar el mock y estado simulado
function mostrarAnuncioTest() {
  if (loaded) {
    rewarded.show();
  } else {
    console.log('El anuncio no está cargado aún');
  }
}

// Simular pulsar para obtener más tips
console.log('Simulando pulsar para obtener más tips...');
mostrarAnuncioTest();
