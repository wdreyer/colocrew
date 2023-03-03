import React from 'react';
import Profile from '../components/Profile';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
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
import globalStyle from "../styles/globalStyle";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import avatarImage from "../assets/MathiasAvatar.png";
import config from '../config';

export default function CandidateProfileScreen({ navigation }) {
const [profileData, setProfileData] = useState({});
const user = useSelector((state) => state.users);
const uid = user.uid
const [editable, setEditable] = useState(false);
const enfantRef = useRef(null);
const handleEditable = () => {  
    setEditable(!editable)
  }

// On fetch la DB pour afficher l'user
useEffect (()=> {
  fetchUserData()
},[])
//
const updateData = () => {
  handleEditable()
  fetchUserData()

}

const fetchUserData = () => {
    fetch(`${config.URL_BACKEND}/users/authByUid/${uid}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
.then(rs => rs.json())
.then(res => {
  setProfileData(prevState => ({...prevState, firstname: res.data.firstname,lastname : res.data.lastname, email : res.data.email, phone : res.data.phone , birthDate : res.data.birthDate, description : res.data.description,birthDate : res.data.birthDate}));
})

}



  return (
   
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView style={{  paddingBottom: 160 }} >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
          <View style={styles.headerContainer}>          
          <Image
          style={styles.image}
          source={require("../assets/LogoMiniBlanc.png")}
        />
          <Text style={globalStyle.titleText}>Mon profil</Text>
          <TouchableOpacity style={styles.icon} onPress={()=> handleEditable()}>
          <FontAwesome name={!editable ? "edit" : ""} color="white" size={30}  />


        </TouchableOpacity>
        </View>
      <Profile editable={editable} onUpdate={updateData} profileData={profileData} />
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
    paddingBottom : 50,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  })