import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type WeekDayPickerProps = {
  selectedDays?: number[];
  onChange?: (days: number[]) => void;
};

const WeekDayPicker: React.FC<WeekDayPickerProps> = ({ selectedDays = [], onChange }) => {
  const [days, setDays] = useState<number[]>(selectedDays);

  const toggleDay = (value: number) => {
    let updatedDays = [...days];
    if (updatedDays.includes(value)) {
      updatedDays = updatedDays.filter(d => d !== value);
    } else {
      updatedDays.push(value);
    }
    setDays(updatedDays);
    onChange && onChange(updatedDays);
  };

  const weekDays = [
    { label: 'Lun', value: 0 },
    { label: 'Mar', value: 1 },
    { label: 'Mié', value: 2 },
    { label: 'Jue', value: 3 },
    { label: 'Vie', value: 4 },
    { label: 'Sáb', value: 5 },
    { label: 'Dom', value: 6 }
  ];

  const renderDayButton = (day: { label: string, value: number }) => {
    const isSelected = days.includes(day.value);
    return (
      <TouchableOpacity
        key={day.value}
        style={[styles.dayButton, isSelected && styles.selectedDayButton]}
        onPress={() => toggleDay(day.value)}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {day.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {weekDays.map((day) => renderDayButton(day))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dayButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  selectedDayButton: {
    backgroundColor: '#007bff',
  },
  dayText: {
    color: '#000',
  },
  selectedDayText: {
    color: '#fff',
  },
});

export default WeekDayPicker;
