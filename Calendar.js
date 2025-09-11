import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { addMonths, subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Day from './Day';
import { getMatrix } from './utils';
import baseStyles from './styles';

const Calendar = ({ theme }) => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarMatrix = getMatrix(currentDate);

  const styles = {
    ...baseStyles,
    dayText: [baseStyles.dayText, { color: theme.text }],
  };

  const weekdayNames = [
    t('monday_short'),
    t('tuesday_short'),
    t('wednesday_short'),
    t('thursday_short'),
    t('friday_short'),
    t('saturday_short'),
    t('sunday_short'),
  ];

  return (
    <View style={styles.calendarContainer}>
      <Header
        currentDate={currentDate}
        onPrev={() => setCurrentDate(subMonths(currentDate, 1))}
        onNext={() => setCurrentDate(addMonths(currentDate, 1))}
        onToday={() => setCurrentDate(new Date())}
        theme={theme}
      />

      <View style={styles.weekRow}>
        {weekdayNames.map((dayName, index) => (
          <View key={index} style={baseStyles.dayContainer}>
            <Text style={[baseStyles.dayText, baseStyles.weekdayLabel, { color: theme.text }]}>
              {dayName}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {calendarMatrix.map((week, rowIndex) => (
          <View style={styles.weekRow} key={rowIndex}>
            {week.map((day, dayIndex) => (
              <Day key={dayIndex} day={day} currentDate={currentDate} theme={theme} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
