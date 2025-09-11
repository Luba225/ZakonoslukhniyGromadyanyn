import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { isSameMonth, isToday } from 'date-fns';
import styles from './styles';

const Day = ({ day, currentDate, theme }) => {
  const isCurrentMonth = isSameMonth(day, currentDate);
  const today = isToday(day);
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
      <View
        style={[
          styles.dayContainer,
          !isCurrentMonth && styles.otherMonthDay,
          today && styles.today,
          pressed && styles.pressedDay,
        ]}
      >
        <Text style={[styles.dayText, { color: theme.text }]}>{day.getDate()}</Text>
      </View>
    </Pressable>
  );
};

export default Day;
