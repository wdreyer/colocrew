import { StatusBar } from 'expo-status-bar';
import { StyleSheet, CheckBox, Text, View, TextInput, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CandidatePostApplyFormScreen({navigation}) {

    const handleFormSubmit = () => {

    };



  return (
    <View style={styles.container}>
        <Text>MA CANDIDATURE</Text>
        <TextInput text='' ></TextInput>
        <TextInput text='' ></TextInput>
        <Text>Type d'hébergement</Text>
        <View style={styles.checkboxContainer}>
        <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox}/>
        <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox}/>
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      <FontAwesome name='home' size={70} color='white'  />
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
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});
