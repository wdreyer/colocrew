import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View, TextInput, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CandidatePost from "../components/CandidatePost";

export default function CandidatePostApplyFormScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/LogoMiniBlanc.png')}/>
        <Text style={styles.title}>MA CANDIDATURE</Text>
        <CandidatePost isEditable={true} />
        <View style={styles.checkboxContainer}>
      </View>
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

  logo:{
    width:45,
    height:45,
  },

  title:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },


  button: {
    backgroundColor: '#3B2',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});
