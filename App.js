import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import AuthScreen from './src/screens/AuthScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { loadLanguage } from './src/i18n/i18n';
import { initDb, fetchUnsyncedViolations, updateViolationSyncStatus } from './src/services/db';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        await loadLanguage();
        await initDb();
        await syncOfflineViolations();

        const savedLogin = await AsyncStorage.getItem('isLoggedIn');
        if (savedLogin === 'true') setIsLoggedIn(true);

        console.log('✅ App prepared successfully.');
      } catch (e) {
        console.warn('❌ Failed to prepare app:', e);
      } finally {
        setIsReady(true);
      }
    }

    prepareApp();
  }, []);

  const syncOfflineViolations = async () => {
    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
      console.log('📴 No internet connection — skipping sync.');
      return;
    }

    try {
      const unsynced = await fetchUnsyncedViolations();

      for (const violation of unsynced) {
        await axios.post('https://your-backend-url.com/api/violations', {
          title: violation.title,
          description: violation.description,
          photoUri: violation.photoUri,
          date: violation.date,
          latitude: violation.latitude,
          longitude: violation.longitude,
        });

        await updateViolationSyncStatus(violation.id);
        console.log(`✅ Violation ${violation.id} synced successfully.`);
      }
    } catch (error) {
      console.warn('⚠️ Error syncing offline violations:', error);
    }
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0033A0" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Завантаження...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="Drawer">
              {() => <DrawerNavigation onLogout={() => {
                AsyncStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
              }} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Auth">
              {() => <AuthScreen onLogin={async () => {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
              }} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
