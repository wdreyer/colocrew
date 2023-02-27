import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import AreaChoiceScreen from './screens/AreaChoiceScreen';

export default function App() {
  const [showAreaChoiceScreen, setShowAreaChoiceScreen] = React.useState(false);
  
  return (
    <View style={styles.container}>
      <Text>Colo Crew</Text>
      <StatusBar style="auto" />
      <AreaChoiceScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
