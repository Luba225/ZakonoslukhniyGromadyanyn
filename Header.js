import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { uk, enUS, pl } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const Header = ({ currentDate, onPrev, onNext, onToday, theme }) => {
  const { t, i18n } = useTranslation();

  const getLocale = () => {
    switch (i18n.language) {
      case 'uk':
        return uk;
      case 'pl':
        return pl;
      default:
        return enUS;
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPrev}>
        <Text style={{ color: theme.text }}>◀</Text>
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: theme.text }]}>
        {format(currentDate, 'MMMM yyyy', { locale: getLocale() })}
      </Text>

      <TouchableOpacity onPress={onNext}>
        <Text style={{ color: theme.text }}>▶</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToday}>
        <Text style={{ color: theme.text }}>{t('today')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
