import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import AreaChoiceScreen from './screens/AreaChoiceScreen';

export default function App() {
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AreaChoiceScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
