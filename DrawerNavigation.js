import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import { useTranslation } from 'react-i18next';
import { View, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { changeLanguage, loadLanguage } from '../i18n/i18n';
//реалізона навігація бічного меню
function SettingsScreen() {
  const { t } = useTranslation();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <View style={{ padding: 20 }}>
      <Button title={t('change_theme')} onPress={toggleTheme} />
      <Button title={t('english')} onPress={() => changeLanguage('en')} />
      <Button title={t('ukrainian')} onPress={() => changeLanguage('uk')} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { t } = useTranslation();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BottomTabs} options={{ title: t('welcome') }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: t('change_language') }} />
    </Drawer.Navigator>
  );
}
