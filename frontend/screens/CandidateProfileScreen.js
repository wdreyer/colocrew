import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
import { useState } from "react";
import avatarImage from "../assets/MathiasAvatar.png";

export default function CandidateProfileScreen({ navigation }) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [adress, setAdress] = useState("");
  const [birthday, setBirthday] = useState("");

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
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setLastName}
                placeholder="Nom"
                placeholderTextColor="#52597A"
                value={lastName}
                keyboardType="text"
              />
              <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                placeholder="Prénom"
                placeholderTextColor="#52597A"
                value={firstName}
                keyboardType="text"
              />
               <TextInput
                style={styles.input}
                onChangeText={setAdress}
                placeholder="Adresse"
                placeholderTextColor="#52597A"
                value={adress}
                keyboardType="text"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                placeholder="Numéro de téléphone"
                placeholderTextColor="#52597A"
                value={phoneNumber}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={setBirthday}
                placeholder="Date d'anniversaire"
                value={birthday}
                placeholderTextColor="#52597A"
                keyboardType="text"
              />
              <TextInput
                style={styles.descriptionInput}
                onChangeText={setDescription}
                placeholder="Déscription"
                placeholderTextColor="#52597A"
                value={description}
                keyboardType="text"
                textAlignVertical="top"
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
                onPress={() => navigation.navigate("TabCandidateNavigator")}
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
    position: "fixed",
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

  input: {
    width: 350,
    height: 55,
    color: "white",
    borderWidth: 0.5,
    padding: 10,
    borderColor: "white",
    borderRadius: 6,
    marginVertical: 15,
    placeholderTextColor: "lightgrey",
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
    placeholderTextColor: "lightgrey",
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#FAD4D8",
    borderColor: "black",
    borderWidth: "1px",
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
    borderWidth: "1px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 15,
  },
});
