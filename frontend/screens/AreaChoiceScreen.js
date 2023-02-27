import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';



export default function AreaChoiceScreen() {
  return (
    
    <LinearGradient 
    style={styles.container}
    colors= {["#281c47" , "#b8336a"]}>
        <Image style={styles.image} source={require('../assets/LogoCompletBlanc.png')} />
      <StatusBar style="auto" />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('TabRecruiterNavigator')}>
          <Text style={styles.buttonText}>Espace Recruteur</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('TabCandidateNavigator')}>
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
    borderWidth: '1px',
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
    color: '#281C47',
    fontWeight: 'bold',
  },
});