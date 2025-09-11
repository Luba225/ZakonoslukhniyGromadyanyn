import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../theme/theme';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('blue');

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem('APP_THEME');
      if (savedTheme && themes[savedTheme]) {
        setTheme(savedTheme);
      } else {
        setTheme('blue');
      }
    })();
  }, []);

  const changeTheme = async (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      await AsyncStorage.setItem('APP_THEME', newTheme);
    } else {
      console.warn(`❌ Unknown theme selected: ${newTheme}`);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
