import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ChoiceScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text>CHOICE SCREEN</Text>
      <Button
        style={styles.button}
        title="Go to Recruiter area"
        onPress={() => navigation.navigate('TabRecruiterNavigator')}
      />
      <Button
        style={styles.button}
        title="Go to Candidate area"
        onPress={() => navigation.navigate('TabCandidateNavigator')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#281C47',
    alignItems: 'center',
    justifyContent: 'center',
  },


  button: {
    backgroundColor: '#3B2',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});