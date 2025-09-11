import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
import { fetchViolations } from '../services/db';
import { useTranslation } from 'react-i18next';
import styles from './styles';

LocaleConfig.locales['uk'] = {
  monthNames: [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ],
  monthNamesShort: [
    'Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв',
    'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'
  ],
  dayNames: [
    'Неділя', 'Понеділок', 'Вівторок', 'Середа',
    'Четвер', 'П’ятниця', 'Субота'
  ],
  dayNamesShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сьогодні',
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ],
  monthNamesShort: [
    'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
    'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
  ],
  dayNames: [
    'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa',
    'Czwartek', 'Piątek', 'Sobota'
  ],
  dayNamesShort: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
  today: 'Dzisiaj',
};

export default function CalendarWithViolations() {
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation();

  const [violations, setViolations] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // зміна мови календаря
  useEffect(() => {
    LocaleConfig.defaultLocale = i18n.language;
  }, [i18n.language]);

  // правопорушення
  useEffect(() => {
    (async () => {
      const all = await fetchViolations();
      setViolations(all);

      const md = {};
      all.forEach(v => {
        if (!v?.date) return;
        const dateStr = new Date(v.date).toISOString().split('T')[0];
        md[dateStr] = { marked: true, dotColor: 'red' };
      });
      setMarkedDates(md);
    })();
  }, []);

  const handleDayPress = (dateString) => {
    const items = violations.filter(v =>
      new Date(v.date).toISOString().split('T')[0] === dateString
    );
    if (items.length > 0) {
      setSelectedDate({ date: dateString, items });
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themes[theme].background }}>
      <Calendar
        onDayPress={d => handleDayPress(d.dateString)}
        markedDates={markedDates}
        theme={{
          backgroundColor: themes[theme].background,
          calendarBackground: themes[theme].background,
          textSectionTitleColor: themes[theme].text,
          dayTextColor: themes[theme].text,
          todayTextColor: '#007bff',
          arrowColor: themes[theme].text,
          monthTextColor: themes[theme].text,
          textDisabledColor: '#d9e1e8',
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}> {selectedDate?.date}</Text>
          <FlatList
            data={selectedDate?.items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.violationItem}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}