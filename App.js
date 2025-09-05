import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import DrawerNavigation from './src/navigation/DrawerNavigation';
import { ThemeProvider } from './src/context/ThemeContext';
import { loadLanguage } from './src/i18n/i18n';
import { initDb } from './src/services/db';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        await loadLanguage();
        await initDb();
        console.log('Database initialized successfully.');
      } catch (e) {
        console.warn('Failed to prepare app:', e);
      } finally {
        setIsReady(true);
      }
    }
    prepareApp();
  }, []);

  if (!isReady) {
    return null; // SplashScreen
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <DrawerNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
