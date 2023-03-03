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
import avatarImage from "../assets/MathiasAvatar.png";
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
  const handleSetProfile = () => {
    const updateUser = {
      name: lastName,
      surname: firstName,
      email: email,
      phone: phoneNumber,
      birthDate: birthday,
      descritpion: description,
    };
    fetch(`${config.URL_BACKEND}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updateUser }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
  passwordText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  passwordContainer: {
    textAlign: "left",
    paddingLeft: 30,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "#53496B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  })