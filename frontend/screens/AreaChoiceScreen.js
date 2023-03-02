import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { addUserToStore } from "../reducers/users";
import config from '../config';

export default function AreaChoiceScreen({ navigation }) {
    const user = useSelector((state) => state.users);
    const dispatch = useDispatch()

    const handleRecruiter = () => {
      fetch(`${config.URL_BACKEND}/users/updateRole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid : user.uid,
          isRecruiter : true,
          isCandidate : false,
      
        })
      }).then(rs => rs.json())
      .then(res => {           
         dispatch(addUserToStore({
            isConnected : true,
            email : res.userUpdated.email,
            uid: res.userUpdated.uid,
            isCandidate: res.userUpdated.isCandidate,
            isRecruiter: res.userUpdated.isRecruiter,
        }))
        })        
    navigation.navigate('TabRecruiterNavigator')
    }

    const handleCandidate = () => {
      fetch(`${config.URL_BACKEND}/users/updateRole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid : user.uid,
          isRecruiter : false,
          isCandidate : true,      
        })
      }).then(rs => rs.json())
      .then(res => {           
         dispatch(addUserToStore({
          isConnected : true,
          email : res.userUpdated.email,
          uid: res.userUpdated.uid,
          isCandidate: res.userUpdated.isCandidate,
          isRecruiter: res.userUpdated.isRecruiter,
        }))
        })        
    navigation.navigate('TabCandidateNavigator')
    }




  return (
    <LinearGradient 
    style={styles.container}
    colors= {["#281c47" , "#b8336a"]}>
        <Image style={styles.image} source={require('../assets/LogoCompletBlanc.png')} />
      <StatusBar style="light" />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => handleRecruiter()}>
          <Text style={styles.buttonText}>Espace Recruteur</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => handleCandidate() }>
          <Text style={styles.buttonText}>Espace Candidat</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 100,
    resizeMode: 'contain'
  },
 
  buttonsContainer: {
    flexDirection: 'column',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#FAD4D8',
    borderColor: '#281C47',
    borderWidth: 1,
    width: 350,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});