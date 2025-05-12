import { useEffect } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // En web, no necesitamos esperar a que el framework esté listo
      return;
    }
    window.frameworkReady?.();
  }, []);
}
