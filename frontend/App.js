import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
// import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <SignUpScreen />
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
