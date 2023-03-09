import React from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { useEffect, useState } from "react";



export default function TheDatePicker(props) {
  const [selectedDate, setSelectedDate] = useState("");

  const reverseDate = (date) => {
    setSelectedDate(date);
    //console.log('SELECTED DATE  :', selectedDate)
    props.updateDate(selectedDate)
  }
  
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
        minimumDate='2023-01-01'
        maximumDate='2099-02-17'
        selected={props.selected}
        onSelectedChange={date => reverseDate(date)}
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