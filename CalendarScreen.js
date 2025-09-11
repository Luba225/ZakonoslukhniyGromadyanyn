import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
import CalendarWithViolations from '../components/CalendarWithViolations';

export default function CalendarScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(themes[theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('calendar')}</Text>
      <View style={styles.languageSwitcher}>
        <TouchableOpacity onPress={() => i18n.changeLanguage('uk')}>
          <Text style={styles.langButton}>🇺🇦 {t('ukrainian')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
          <Text style={styles.langButton}>🇬🇧 {t('english')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => i18n.changeLanguage('pl')}>
          <Text style={styles.langButton}>🇵🇱 {t('polish')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarWrapper}>
        <CalendarWithViolations />
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 60,
      paddingHorizontal: 16,
    },
    text: {
      color: theme.text,
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    languageSwitcher: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    langButton: {
      color: theme.text,
      fontSize: 16,
    },
    calendarWrapper: {
      flex: 1,
    },
  });
