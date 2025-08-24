import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
//Поки майже однакова реалізація екранів
export default function MapScreen() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(themes[theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('map')}</Text>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.text,
      fontSize: 24,
    },
  });
