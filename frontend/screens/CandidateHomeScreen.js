import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import globalStyle from "../styles/globalStyle";
import config from "../config";
import CandidateCard from "../components/CardCandidateAnnounce";


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";

export default function CandidateHomeScreen({ navigation, route }) {
  const User = useSelector((state) => state.users);
  const [myApplyings, setMyApplyings] = useState([]);
  console.log("ID USER =>> ",User.mongoID);
  // const [paramValue, setParamValue] = useState(false)

  console.log('>>> PARAMS >>>',  route.params)
  // console.log('Param STATE', paramValue);


  // useEffect(() => {
  //   console.log('>>> PARAM IN USEEFFECT >>>', route.params);
  // })

  useEffect(() => {
    // if(route.param) setParamValue(route.param)
    // console.log('UseEffect', route.param);
    fetch(`${config.URL_BACKEND}/applications/myApplications/${User.mongoID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('Type de qualifications ',data.data);
        if (data.result) {
          //console.log('Mes candidature : ',data);
          setMyApplyings(data.result);
          // console.log(myApplyings);
        }
        else {
          console.log('Erreur de ')
        }
      });

  }, [route.params]);

  const actionOnPress = (_id) => {
    navigation.navigate("CandidatePostApplyFormScreen")
  }


let applyings
console.log('MyApplyings =====>>>>>>>>>>>>>>>> ' ,myApplyings);
  if (myApplyings.length !== 0){
    applyings = myApplyings.map((e, i) => {
      return(<View key={i}><CandidateCard  ID={i+1} _id={e._id} startDate={e.startDate} endDate={e.endDate} contractType={e.contractType} locations={e.locations} activities={e.activities} likes={e.likes.length} actionOnPress={()=>actionOnPress()} /></View>
    )})
  } else {
    applyings = (<View ><Text style={styles.message}>Vous n'avez pas encore posté de candidature.</Text></View>)
    }
  


  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={globalStyle.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={globalStyle.body}
            contentContainerStyle={globalStyle.scrollView}
          >
            <SafeAreaProvider style={globalStyle.safeAreaContainer}>
              <StatusBar style="light" />

              <View style={globalStyle.headerContainer}>
                <Image
                  style={globalStyle.logo}
                  source={require("../assets/LogoMiniBlanc.png")}
                />
                <Text style={globalStyle.titleText}>Home Candidat</Text>
                
              </View>
              <View>
                {/* <CandidateFormSubmitted/> */}
                <View style={globalStyle.contentContainer}>
                  <View>
                    <PrimaryButton
                      textBtn="Publier une candidature"
                      actionOnPress={() =>
                        navigation.navigate("CandidatePostApplyFormScreen")
                      }
                    />
                    <Text style={styles.titleSection}>Mes candidatures</Text>
                  </View>
                  <View style={styles.containerMyApplyings}>
                    {applyings}
                  </View>
                </View>
              </View>
            </SafeAreaProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#53496B",
    width: "100%",
    minWidth: "85%",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 0.5,
  },

  containerMyApplyings:{
      height:'auto',
      flexDirection:'column-reverse',
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

  contentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  titleSection: {
    marginTop: 20,
    marginBottom: 20,
    color:'#FFF',
    fontSize:26,
    alignSelf:'center',
  },

  message: {
    color: "#FAD4D8",
    fontSize: 20,
    fontWeight: "bold",
  },

  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
