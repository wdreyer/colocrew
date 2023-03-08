import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function DisplayCandidateApplying(props) {
  const { navigation, ...updatedProps } = props;
  //delete updatedProps.navigation;

  //console.log('DATAS PROPS DU COMPONENT DisplayCandidateApplying___--->',props.datas);

   const  formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
      }

    return (
        <>
        {props.display === "card"  &&  (
          <TouchableOpacity onPress={() =>
           navigation("DisplayCandidateApplyingScreen",{
              props: { ...updatedProps,display: 'announce'}
            })
          }
          activeOpacity={0.7}>
          <View style={styles.cardContainer}>           
                <Text style={styles.cardTitle}>{props.title}</Text>
                <View style={styles.container}>
                <Image
                style={styles.cardImage}
                source={{ uri: props.photos[0] }}
              />
              <View style ={styles.rightContent}>
              <Text style={styles.cardText}>Du : {formatDate(props.startDate)} </Text>
              <Text style={styles.cardText}>Au {formatDate(props.endDate)}</Text>
              <Text style={styles.locationText}>{props.location}</Text>
              <Text style={styles.locationText}><FontAwesome size={30} name="heart"/> ({props.datas.likes.length})</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )}
        {props.display === "announce" &&  (
          <View style={styles.announceContainer}>           
                {props.displayTitle && ( <Text style={styles.cardTitle}>{props.title}</Text>)}
                <View style={styles.announceContainer}>
                
                    <Text style={styles.announceText}>Mes disponibilités :</Text>
                    <Text style={styles.announceText}>du  {formatDate(props.datas.startDate)} Au {formatDate(props.datas.endDate)}</Text>
                    <Text style={styles.announceText}>Type(s) de contrats préférés : {props.datas.contractType}</Text>
                    <Text style={styles.announceText}>Mes qualifications : {props.datas.qualifications}</Text>
                    <Text style={styles.announceText}>Ma motivation : {props.datas.description}</Text>
                    
                    <Text style={styles.announceText}>Hébergement : {props.datas.lodgingType.join(', ')}</Text>
                    <Text style={styles.announceText}>Environnement : {props.datas.locations.join(', ')}</Text>
                    <Text style={styles.announceText}>Activités : {props.datas.activities.join(', ')}</Text>

                    <Text style={styles.loveText}><FontAwesome size={30} name="heart"/> {props.datas.likes.length}</Text>
                    
                    <Text style={styles.annouceTitle}>Vos séjours correspondants</Text>
                    {props.datas.likes.length === 0 && (
                        <>
                        <Text style={styles.announceText}>Vous navez pas encore de like, rendez vous sur la page <Text onPress={() =>
                        navigation("TabCandidateNavigator",{
                            screen: 'CandidateSwipe',
                            })} style={styles.textLink} >Swipe</Text> pour trouver des séjours qui vous conviennent</Text>
                        </>
                        )}
                </View>
          </View>
        )}
    </>)
};

const styles = StyleSheet.create({
  textLink: {
    color: "#7AC3F7",
    textDecorationLine: "underline",
  },


  announceContainer : {
    backgroundColor: "#53496B",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    minWidth: "85%",
    justifyContent:"center",
    flex: 1,
    height: "100%",
    marginBottom: 10,
  },
  announceImages: {
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: 5,
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "white",
    shadowColor: "#FFF",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  announceText : {
    marginTop: 5,
    marginLeft : 10,
    color : "white",
    fontSize : 20,
    textAlign : "left",

  },
  loveText : {
    textAlign:"center",
    marginTop: 5,
    marginLeft : 10,
    marginBottom : 10,
    color : "white",
    fontSize : 20,
  },
  annouceTitle : {
    textAlign:"center",
    marginTop: 15,
    marginBottom : 10,
    padding : 5,
    color : "white",
    fontSize : 25,
    backgroundColor : "#7B6A85" , 

  },

  cardContainer: {
    backgroundColor: "#53496B",
    width: "100%",
    minWidth: "85%",
    height: 160,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 0.5,
  },
  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    paddingBottom: 10,
  },
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContent :{
    flex: 1,
    alignContent : "center",
    width : "100%",
  },
  locationText :{
    marginTop: 5,
    marginLeft : 10,
    color : "white",
    fontSize : 20,
    textAlign : "center",
  },
  cardText : {
    marginLeft : 10,
    color : "white",
    fontSize : 15,
    textAlign : "center",

  },
  cardImage: {
    marginTop: 5,
    width: 150,
    height: 100,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "white",
    shadowColor: "#FFF",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
  