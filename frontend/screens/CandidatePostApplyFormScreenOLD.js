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
    resizeMode: 'contain',
    width:50,
    height:50,
    alignSelf: 'flex-start',
    margin: 20,
    marginTop: 50,
  },

  title:{
    color: '#FFF',
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 30,
    
    

  },


  button: {
    backgroundColor: '#3B2',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});
