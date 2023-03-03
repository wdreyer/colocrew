import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../components/PrimaryButton';
import { useSelector, useDispatch } from 'react-redux';


export default function RecruiterHomeScreen({navigation}) {

  const user = useSelector((state) => state.users);


  const goToForm = () =>{
    navigation.navigate('CandidatePostApplyFormScreen')
  }

  return (
    <View style={styles.container}>
      <Text>CANDIDATE HOME SCREEN</Text>
      <FontAwesome name='home' size={70} color='white'  />
      <PrimaryButton textBtn='Go to Candidature' actionOnPress={goToForm}/>
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
