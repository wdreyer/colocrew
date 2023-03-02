import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Input from "./Input";
import ModalDatePicker from "./ModalDatePicker";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import config from "../config";
import avatarImage from "../assets/MathiasAvatar.png";

export default function ProfileScreen(props) {

    //States formulaire    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");   
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [mode, setMode] = useState('')

  // 3 modes possible display, create, edit 
  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]); 

  useEffect(()=> {
    const { firstname,lastname,email,phone, description,birthDate } = props.profileData ;
    setFirstName(firstname),
    setLastName(lastname),   
    setEmail(email),
    setPhone(phone),
    setDescription(description),
    setBirthDate(birthDate)
  },[props])


  //States 
  const [modalVisible, setModalVisible] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  // 3 modes possible display, create, edit 

  const handleDateChange = (date) => {
    setBirthDate(date);
    setDatePickerVisible(false);
  };  

  const handleSetProfile = () => {
    const updateUser = {
      name: lastName,
      surname: firstName,
      email: email,
      phone: phone,
      birthDate: birthDate,
      description: description,
    };
    fetch(`${config.URL_BACKEND}/users/)`, {
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
<>
            <View style={styles.avatarContainer}>
              <Image source={avatarImage} style={styles.avatar} />
            </View>
            <View style={[styles.inputsContainer, { width: "100%" }]}>
            {mode === 'display' ? (
              <Text style={styles.displayedText}>{lastName}</Text>
            ) : (
              <Input
                style={styles.input}
                labelTxt="Nom"
                placeholder={lastName}
                onChangeText={(value) => setLastName(value)}
                value={lastName}
              />
            )}
            {mode === 'display' ? (
              <Text style={styles.displayedText}>{firstName}</Text>
            ) : (
              <Input
                style={(styles.input, styles.customInputStyle)}
                labelTxt="Prénom"
                placeholder={firstName}
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
              />
              )}
              {mode === 'display' ? (
                <Text style={styles.displayedText}>{email}</Text>
              ) : (
              <Input
                style={styles.input}
                labelTxt="Email"
                placeholder={email}
                value={email}
                onChangeText={(value) => setEmail(value)}
                type={email}
              />
              )}

              {mode === 'display' ? (
                <Text style={styles.displayedText}>{phone}</Text>
              ) : (
              <Input
                style={styles.input}
                labelTxt="Numéro de téléphone"
                placeholder={phone}
                value={phone}
                onChangeText={(value) => setPhone(value)}
                type="phone"
              />
              )}
              {mode === 'display' ? (
                <Text style={styles.displayedText}>{birthDate}</Text>
              ) : (
              <TouchableWithoutFeedback
                onPress={() => setDatePickerVisible(true)}
              >
                <View style={styles.input}>
                  <Text style={styles.labelText}>Date de naissance</Text>
                  <Text style={styles.inputText}>{birthDate}</Text>
                </View>
              </TouchableWithoutFeedback>
              )}
             
              {datePickerVisible && (
                <ModalDatePicker
                  current={birthDate}
                  selected={birthDate}
                  onSelectedChange={(date) => {
                    setDatePickerVisible(false);
                    setBirthDate(date);
                  }}
                />
              )}

              {mode === 'display' ? (
                <>
                <Text style={styles.displayedText}>Description :</Text> 
                <Text style={styles.description} >{description}</Text>
                </>
              ) : (
              <Input
                style={styles.input}
                labelTxt="Description"
                placeholder={description}
                value={description}
                onChangeText={(value) => setDescription(value)}
                multiline={true}
              />
              )}
            
            {mode === 'display' ? (
              <></>
            ) : (            
            <View style={styles.passwordContainer}>
              <Text style={styles.passwordText}> Mot de passe : </Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Mot de passe formulaire
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.buttonContainer}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.buttonValidate}>Valider</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Pressable onPress={() => setModalVisible(true)}>
                <Text style={styles.textLinkModifiedPassword}>
                  Modifier mon mot de passe
                </Text>
              </Pressable>
        

            </View>
            )}
            {mode === 'display' ? (
              <></>
            ) : (
            <View style={styles.buttonContainer}>
            <PrimaryButton actionOnPress={()=> handleSetProfile} textBtn="Enregistrer" />
            </View>
            )}
            </View>

       
            </>
       
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#281C47",
    color: "white",
  },
  image: {
    position: "absolute",
    left: 10,
    top: 30,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  inputsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 40,
  },
  customInputStyle: {
    width: "80%",
    height: 45,
  },

  descriptionInput: {
    width: 350,
    height: 300,
    color: "white",
    borderWidth: 0.5,
    padding: 10,
    borderColor: "white",
    borderRadius: 6,
    marginVertical: 15,
  },

  buttonContainer: {
    width : '90%',
  },

  button: {
    backgroundColor: "#FAD4D8",
    borderColor: "black",
    borderWidth: 1,
    width: 350,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 15,
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
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

  textLinkModifiedPassword: {
    color: "#7AC3F7",
    textDecorationLine: "underline",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },

  buttonValidate: {
    backgroundColor: "#FAD4D8",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 15,
  },

  displayedText : {
    color : "white",
    fontSize : 30,
  },

  labelText  : {
    textAlign : 'left',
    color : "white",
    fontSize : 15,
  },
  description : {
    color: "white",
    fontSize : 20,
  }
});
