import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import MapScreen from '../screens/MapScreen';
import NewViolationScreen from '../screens/NewViolationScreen';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
//ми тут реалізували навігацію між сторінками(ТАБ)
const Tab = createBottomTabNavigator();
export default function BottomTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Calendar') iconName = 'calendar';
          else if (route.name === 'Map') iconName = 'map';
          else iconName = 'add-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0033A0',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: t('calendar') }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: t('map') }} />
      <Tab.Screen name="New" component={NewViolationScreen} options={{ title: t('new_violation') }} />
    </Tab.Navigator>
  );
}
