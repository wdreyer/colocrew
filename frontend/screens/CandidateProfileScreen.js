import React from 'react';
import Profile from '../components/Profile';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import config from '../config';

export default function CandidateProfileScreen({ navigation }) {
const [profileData, setProfileData] = useState({});
const user = useSelector((state) => state.users);
console.log(user)
const uid = '8vpGzN94vRf0sRR1tHrI1DsIVt03'
console.log(uid)

useEffect (()=> {
  fetch(`${config.URL_BACKEND}/users/authByUid/${uid}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
.then(rs => rs.json())
.then(res => {
  setProfileData(prevState => ({...prevState, firstname: res.data.firstname,lastname : res.data.lastname, email : res.data.email, phone : res.data.phone , birthDate : res.data.birthDate, description : res.data.description,birthDate : res.data.birthDate}));
})

},[])




const [mode, setMode] = useState('display');
const changeMode = () => {
  if(mode === 'display'){
    setMode('edit')
  }
  else if (mode === 'edit'){
    setMode('display')
  }
} 

  return (
   
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
          <View style={styles.headerContainer}>          
          <Image
          style={styles.image}
          source={require("../assets/LogoMiniBlanc.png")}
        />
          <Text style={styles.titleText}>Mon profil</Text>
       

          <TouchableOpacity style={styles.icon} onPress={()=>changeMode()}>

          <FontAwesome name={mode === 'display' ? "edit" : "save"} color="white" size={30}  />


        </TouchableOpacity>
        </View>

      <Profile mode={mode} profileData={profileData} />

      </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
  </KeyboardAvoidingView>
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#281C47",
    paddingBottom : 5,
  },
  headerContainer : {
    marginLeft : 20,
    marginRight : 20,
    marginTop : 5,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  }, 
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  })