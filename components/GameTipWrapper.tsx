import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { GameTip } from './GameTip';
import { useSudokuStore } from '../store/sudokuStore';

interface GameTipWrapperProps {
  onRequestMoreTips: () => void;
}

export function GameTipWrapper({ onRequestMoreTips }: GameTipWrapperProps) {
  const setTip = useSudokuStore(state => state.setTip);
  
  // Cuando se gana una recompensa por anuncio
  useEffect(() => {

  
    return () => {
   
    };
  }, []);

  return (
    <GameTip onRequestMoreTips={onRequestMoreTips} />
  );
}