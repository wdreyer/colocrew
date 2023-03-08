import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import avatarImage from "../assets/MathiasAvatar.png";
import { BlurView } from "expo-blur";
import moment from "moment"



export default function CandidateCard(props) {

  const convertDate = (date) =>{
    const maDate = new Date(date);
    const day = maDate.getDate().toString().padStart(2, '0');
    const month = (maDate.getMonth() + 1).toString().padStart(2, '0');
    const year = maDate.getFullYear().toString();
    const formattedDate = day + '/' + month + '/' + year;
    return(formattedDate);
  } 
  
  

  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.actionOnPress()}
          activeOpacity={0.7}
          style={styles.contentContainer}
          > 
        <View style={styles.headerCard}>
          <View style={styles.avatarContainer}>
            <Image source={avatarImage} style={styles.avatar} />
          </View>
          <View style={styles.headerContent}>
            <View><Text style={styles.titleCard}>Candidature n° {props.ID}</Text></View>
            <View style={styles.datesContainer}>
              <Text style={styles.dateText}>Du {convertDate(props.startDate)}</Text>
              <Text style={styles.dateText}> au {convertDate(props.endDate)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footerCard}>
          <View style={styles.contentCard}>
            <Text style={styles.cardText}>Type(s) de séjours : {props.locations.join(', ')}</Text>
            <Text style={styles.cardText}>Activités : {props.activities.join(', ')}</Text>
            <Text style={styles.cardText}>Type(s) de contrats : {props.contractType.join(', ')}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <FontAwesome name='heart' size={30} color='white' />
            <Text style={styles.cardText2}> {props.likes}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#53496B",
    width: "100%",
    minWidth: "95%",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 0.5,
    
  },

  container: {
    position: "absolute",
    width: "100%",
    height: "100%",

    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },

  
  headerContent: {
    flexDirection:'column',
  },
  
  contentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  datesContainer: {
    flexDirection: 'row',
  },

  titleSection:{
    fontSize:10,

  },

  titleCard: {
      marginTop: 15,
      color: "white",
      fontSize: 20,
      fontWeight:'bold',
  },

  headerCard:{
    
    width:'100%',
    justifyContent: 'space-around',
    alignItems:'center',
    flexDirection:'row',
    padding:0,
  },

  footerCard:{
    
    width:'100%',
    flexDirection:'row',
    padding:5,
    justifyContent:'space-evenly',
  },

  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  dateText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  cardText: {
    color: "#C398BC",
    fontSize: 15,

    
  },

  cardText2: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    
  },


});
