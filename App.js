import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import './src/i18n/i18n';
import { loadLanguage } from './src/i18n/i18n';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  const [isLangLoaded, setIsLangLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLanguage();
      setIsLangLoaded(true);
    })();
  }, []);

  if (!isLangLoaded) return null; // або SplashScreen

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <DrawerNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
