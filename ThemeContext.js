// Глобальна зміна theme в усьому додатку
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // При запуску читаємо тему з AsyncStorage
  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem('APP_THEME');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    })();
  }, []);

// Перемикання теми
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('APP_THEME', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
