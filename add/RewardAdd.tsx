
// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import  createRewardedAd,{RewardedAd }  from 'react-native-google-mobile-ads';
// import { GameTip } from '../components/GameTip';

// const RewardAdd = () => {
//   const [tips, setTips] = useState([]);
//   const [tipsCount, setTipsCount] = useState(0);
//   const [adLoaded, setAdLoaded] = useState(false);

//   useEffect(() => {
//     // Carga +los consejos iniciales
//     setTips([...tips,]);
//   }, []);

// const handleAdPress = () => {
//   // Carga el anuncio de recompensa
//   const ad = createRewardedAd('2379499005569310', {
//     requestNonPersonalizedAdsOnly: true,
//   });
//   ad.load();
//   setAdLoaded(true);
// };

//   const handleAdReward = () => {
//     // El usuario ha visto el anuncio, incrementa el número de consejos
//     setTipsCount(tipsCount + 1);
//     setAdLoaded(false);
//   };

//   return (
//     <View>
//       <GameTip onPress={handleAdPress} />
//       {tipsCount < tips.length ? (
//         <Text>{tips[tipsCount]}</Text>
//       ) : (
//         <Text>¡Se han acabado los consejos!</Text>
//       )}
//       {adLoaded && (
//         <RewardedAd
//           adUnitID="tu_id_de_anuncio"
//           onAdLoaded={() => setAdLoaded(true)}
//           onAdReward={handleAdReward}
//         />
//       )}
//     </View>
//   );
// };

// export default RewardAdd;
