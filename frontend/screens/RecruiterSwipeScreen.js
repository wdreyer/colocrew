import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function RecruiterSwipeScreen({navigation}) {

  return (
    <View style={styles.container}>
        <Text>RECRUITER SWIPE SCREEN</Text>
      
      <FontAwesome name='heart' size={70} color='white'  />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A29',
    alignItems: 'center',
    justifyContent: 'center',
  },


  button: {
    backgroundColor: '#3B2',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});
