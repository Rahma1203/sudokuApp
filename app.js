import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import React, { useEffect, useState } from 'react';
import { GameTipWrapper } from './path/to/GameTipWrapper'; // Ajusta la ruta según tu estructura

// Usar TestIds para desarrollo y los IDs reales para producción
// Asegúrate de que este ID coincida con el configurado en app.json para la plataforma correspondiente
const adUnitId = __DEV__ 
  ? TestIds.REWARDED 
  : 'ca-app-pub-2379499005569310/2899736285'; // Reemplaza XXXXXX con el ID de tu unidad de anuncio (no el app ID)

// Creación del objeto RewardedAd con la especificación de palabras clave
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export function App() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    console.log('Configurando anuncios recompensados');
    
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED, 
      () => {
        console.log('Anuncio recompensado cargado correctamente');
        setLoaded(true);
      }
    );
    
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD, 
      (reward) => {
        console.log('Usuario ganó recompensa:', reward);
        // Aquí deberías implementar la lógica para dar las pistas al usuario
        // Por ejemplo: useSudokuStore.getState().setTip(3);
      }
    );
    
    // Cargar el anuncio
    rewarded.load();
    console.log('Solicitando carga del anuncio');
    
    // Desuscribirse de los eventos cuando el componente se desmonte
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // Función para mostrar el anuncio cuando se soliciten más pistas
  const mostrarAnuncio = () => {
    if (loaded) {
      console.log('Mostrando anuncio recompensado');
      rewarded.show();
    } else {
      console.log('El anuncio no está cargado aún, intentando cargar uno nuevo');
      // Intentar cargar un nuevo anuncio si no hay uno disponible
      rewarded.load();
    }
  };

  // Renderiza el componente GameTipWrapper y pasa la función mostrarAnuncio
  return <GameTipWrapper onRequestMoreTips={mostrarAnuncio} />;
}
