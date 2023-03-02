import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import ModalDatePicker from "../components/ModalDatePicker";
import { useState } from "react";



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
import avatarImage from "../assets/MathiasAvatar.png";
import config from '../config';

export default function CandidateProfileScreen({ navigation }) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);


  const handleDateChange = (date) => {
    setBirthday(date);
    setDatePickerVisible(false);
  };
  

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
          <SafeAreaProvider style={styles.container}>
            <StatusBar style="light" />
            <Image
              style={styles.image}
              source={require("../assets/LogoMiniBlanc.png")}
            />
            <Text style={styles.titleText}>Mon profil</Text>
            <View style={styles.avatarContainer}>
              <Image source={avatarImage} style={styles.avatar} />
            </View>
            <View style={[styles.inputsContainer, { width: "100%" }]}>
              <Input
                style={styles.input}
                labelTxt="Nom"
                placeholder="Nom"
                onChangeText={(value) => setLastName(value)}
              />
              <Input
                style={(styles.input, styles.customInputStyle)}
                labelTxt="Prénom"
                placeholder="Prénom"
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
              />
              <Input
                style={styles.input}
                labelTxt="Email"
                placeholder="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                type="email"
              />
              <Input
                style={styles.input}
                labelTxt="Adresse"
                placeholder="Adresse"
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
              <Input
                style={styles.input}
                labelTxt="Numéro de téléphone"
                placeholder="Numéro de téléphone"
                value={phoneNumber}
                onChangeText={(value) => setPhoneNumber(value)}
                type="phone"
              />
              <TouchableWithoutFeedback
                onPress={() => setDatePickerVisible(true)}
              >
                <View style={styles.input}>
                  <Text style={styles.labelText}>Date d'anniversaire</Text>
                  <Text style={styles.inputText}>{birthday}</Text>
                </View>
              </TouchableWithoutFeedback>
              {datePickerVisible && (
                <ModalDatePicker
                  current={birthday}
                  selected={birthday}
                  onSelectedChange={(date) => {
                    setDatePickerVisible(false);
                    setBirthday(date);
                  }}
                />
              )}
              <Input
                style={styles.input}
                labelTxt="Description"
                placeholder="Description"
                value={description}
                onChangeText={(value) => setDescription(value)}
                multiline={true}
              />
            </View>
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

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={handleSetProfile}
              >
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaProvider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#281C47",
  },
  image: {
    position: "absolute",
    left: 10,
    top: 10,
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
    alignItems: "center",
    justifyContent: "center",
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
});
