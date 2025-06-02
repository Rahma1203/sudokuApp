// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
// import { GameTip } from '../components/GameTip';
// import { useSudokuStore } from '../store/sudokuStore';
// import { RewardedAd, RewardedAdEventType, TestIds } from 'expo-ads-admob';

// // Usa un ID de prueba para desarrollo y tu ID real en producción
// const adUnitId = __DEV__ 
//   ? TestIds.REWARDED
//   : 'ca-app-pub-2379499005569310/1012396396'; // Tu ID real

// const TipManager = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [rewardedAd, setRewardedAd] = useState(null);
//   const setTip = useSudokuStore(state => state.setTip);
//   const tip = useSudokuStore(state => state.tip);

//   // Cargar anuncio de recompensa
//   const loadRewardedAd = async () => {
//     try {
//       setIsLoading(true);
//       console.log('Creando nueva instancia de anuncio de recompensa...');
      
//       // Crear una nueva instancia de RewardedAd
//       const ad = RewardedAd.createForAdRequest(adUnitId, {
//         requestNonPersonalizedAdsOnly: true,
//         keywords: ['game', 'puzzle', 'sudoku'],
//       });

//       // Configurar el event listener para cuando se carga el anuncio
//       const loadedSubscription = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
//         console.log('Anuncio de recompensa cargado correctamente');
//         setIsLoading(false);
//         setRewardedAd(ad);
//       });

//       // Event listener para cuando ocurre un error
//       const errorSubscription = ad.addAdEventListener(RewardedAdEventType.ERROR, (error) => {
//         console.error('Error al cargar el anuncio de recompensa:', error);
//         setIsLoading(false);
//         setRewardedAd(null);
//       });

//       // Event listener para cuando el usuario obtiene la recompesa
//       const rewardedSubscription = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
//         console.log('Usuario recompensado:', reward);
//         setTip(3); // Restablecer a 3 tips
//         Alert.alert('¡Recompensa!', 'Has obtenido 3 nuevas pistas.', [{ text: 'OK' }]);
//       });

//       // Event listener para cuando el anuncio se cierra
//       const closedSubscription = ad.addAdEventListener(RewardedAdEventType.CLOSED, () => {
//         console.log('Anuncio de recompensa cerrado');
//         setRewardedAd(null);
        
//         // Cuando se cierra el anuncio, cargamos uno nuevo para la próxima vez
//         // Pero dejamos un pequeño delay para evitar muchas solicitudes simultáneas
//         setTimeout(() => {
//           loadRewardedAd();
//         }, 1000);
//       });

//       // Iniciar la carga del anuncio
//       ad.load();
      
//       // Devolver función de limpieza para eliminar los event listeners
//       return () => {
//         loadedSubscription.remove();
//         errorSubscription.remove();
//         rewardedSubscription.remove();
//         closedSubscription.remove();
//       };
//     } catch (error) {
//       console.error('Error al crear el anuncio de recompensa:', error);
//       setIsLoading(false);
//       setRewardedAd(null);
//     }
//   };

//   // Cargar el primer anuncio cuando el componente se monta
//   useEffect(() => {
//     const cleanupFn = loadRewardedAd();
    
//     // Limpiar los event listeners cuando el componente se desmonta
//     return () => {
//       if (cleanupFn) cleanupFn();
//     };
//   }, []);

//   // Función para mostrar el anuncio cuando el usuario lo solicita
//   const showRewardedAd = async () => {
//     if (!rewardedAd) {
//       Alert.alert(
//         'Anuncio no disponible',
//         'Estamos preparando un anuncio para ti. Por favor, inténtalo de nuevo en unos momentos.',
//         [{ text: 'OK' }]
//       );
      
//       if (!isLoading) {
//         loadRewardedAd();
//       }
//       return;
//     }

//     try {
//       console.log('Mostrando anuncio de recompensa...');
//       await rewardedAd.show();
//     } catch (error) {
//       console.error('Error al mostrar el anuncio de recompensa:', error);
//       Alert.alert(
//         'Error',
//         'No se pudo mostrar el anuncio. Inténtalo de nuevo más tarde.',
//         [{ text: 'OK' }]
//       );
//       setRewardedAd(null);
//       loadRewardedAd();
//     }
//   };

//   const handleRequestMoreTips = () => {
//     // Mostrar un diálogo para confirmar que el usuario quiere ver un anuncio
//     Alert.alert(
//       'Obtener más pistas',
//       '¿Quieres ver un anuncio para obtener 3 pistas más?',
//       [
//         { text: 'Cancelar', style: 'cancel' },
//         {
//           text: 'Ver anuncio',
//           onPress: showRewardedAd
//         },
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <GameTip onRequestMoreTips={handleRequestMoreTips} />
//       {tip <= 0 && (
//         <TouchableOpacity 
//           onPress={handleRequestMoreTips}
//           style={styles.getMoreButton}
//           disabled={isLoading && !rewardedAd}
//         >
//           <Text style={styles.getMoreText}>
//             {isLoading && !rewardedAd ? 'Cargando anuncio...' : 'Obtener más pistas'}
//           </Text>
//         </TouchableOpacity>
//       )}
//       {__DEV__ && (
//         <Text style={styles.debugText}>
//           Estado del anuncio: {isLoading ? 'Cargando...' : (rewardedAd ? 'Listo' : 'No disponible')}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//   },
//   getMoreButton: {
//     backgroundColor: '#FF9800',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginTop: 8,
//   },
//   getMoreText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   debugText: {
//     marginTop: 10,
//     color: '#666',
//     fontSize: 12,
//   }
// });

// export default TipManager;