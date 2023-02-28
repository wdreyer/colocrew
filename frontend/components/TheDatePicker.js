import React from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

export default function TheDatePicker(props) {
  return (
    <View style={styles.datePicker}>
      <DatePicker
        options={{
          backgroundColor: '#53496B',
          textHeaderColor: '#FFF',
          textDefaultColor: '#FFF',
          selectedTextColor: '#fff',
          mainColor: '#F4722B',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
        }}
        current={props.current}
        minimumDate='2023-02-10'
        maximumDate='2023-02-17'
        selected={props.selected}
        mode="calendar"
        minuteInterval={30}
        style={{ borderRadius: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
  }
});