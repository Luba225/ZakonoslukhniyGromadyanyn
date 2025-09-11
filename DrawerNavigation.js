import React, { useContext, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomTabs from './BottomTabs';
import ViolationsListScreen from '../screens/ViolationsListScreen';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { changeLanguage } from '../i18n/i18n';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, onLogout }) => {
  const { t, i18n } = useTranslation();
  const { theme, changeTheme } = useContext(ThemeContext);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleLanguageChange = async (lang) => {
    await changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setSelectedTheme(newTheme);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        style={[styles.option, { marginBottom: 20 }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={[styles.optionText, { fontWeight: 'bold' }]}>
          🏠 {t('welcome') || 'Велком'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, { marginBottom: 20 }]}
        onPress={() => navigation.navigate('LocalViolations')}
      >
        <Text style={[styles.optionText, { fontWeight: 'bold' }]}>
          📋 {t('local_violations') || 'Локальні порушення'}
        </Text>
      </TouchableOpacity>


      <Text style={styles.sectionTitle}>{t('select_language')}</Text>
      {[
        { code: 'uk', label: '🇺🇦 Українська' },
        { code: 'en', label: '🇬🇧 English' },
        { code: 'pl', label: '🇵🇱 Polski' },
      ].map(({ code, label }) => (
        <TouchableOpacity
          key={code}
          style={styles.option}
          onPress={() => handleLanguageChange(code)}
        >
          <View style={styles.radioCircle}>
            {selectedLanguage === code && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.optionText}>{label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>{t('change_theme')}</Text>
      {[
        { key: 'blue', label: t('theme_blue') },
        { key: 'yellow', label: t('theme_yellow') },
        { key: 'dark', label: t('theme_dark') },
      ].map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={styles.option}
          onPress={() => handleThemeChange(key)}
        >
          <View style={styles.radioCircle}>
            {selectedTheme === key && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.optionText}>{label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.logoutButton, { marginTop: 40 }]}
        onPress={onLogout}
      >
        <Text style={styles.logoutText}>🚪 {t('logout') || 'Вийти'}</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigation({ onLogout }) {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} />}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabs}
        options={{ title: t('welcome') || 'Велком' }}
      />
      <Drawer.Screen
        name="LocalViolations"
        component={ViolationsListScreen}
        options={{ title: t('local_violations') || 'Локальні порушення' }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0033A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0033A0',
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
