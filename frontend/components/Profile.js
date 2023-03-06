import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Input from "./Input";
import ModalDatePicker from "./ModalDatePicker";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

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
  const user = useSelector((state) => state.users);
  const uid = user.uid;
  const enfantRef = useRef(null);

  //States formulaire
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  //const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [editable, setEditable] = useState(false);
  //States
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // 2 modes possible display edit
  useEffect(() => {
    setEditable(props.editable);
  }, [props.editable]);

  // Date à faire plus tard !

  const handleDateChange = (date) => {
    setBirthDate(date);
    setDatePickerVisible(false);
  };

  //chargement des props affichage  :
  useEffect(() => {
    const { firstname, lastname, email, phone, description, birthDate } =
      props.profileData;
    setFirstName(firstname),
      setLastName(lastname),
      setEmail(email),
      setPhone(phone),
      setDescription(description),
      setBirthDate(birthDate);
  }, [props]);

  // édition et sauvergarde du profil en DB
  const handleSetProfile = () => {
    console.log("enter");
    const updateUser = {
      uid,
      firstname,
      lastname,
      email,
      phone,
      birthDate,
      description,
    };

    fetch(`${config.URL_BACKEND}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setEditable(false);
    props.onUpdate();
  };

  return (
    <>
      <LinearGradient
        colors={["rgba(40, 28, 71, 0.5)", "rgba(184, 51, 106, 0.7)"]}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{ flex: 0.5 }}
      >
        <View style={styles.avatarContainer}>
          <Image source={avatarImage} style={styles.avatar} />
        </View>
      </LinearGradient>

      <View style={[styles.inputsContainer]}>
        {!editable ? (
          <View style={styles.nameContainer}>
            <Text style={[styles.displayedText, { fontSize: 28 }]}>
              {lastname}
            </Text>
            <Text> </Text>
            <Text style={[styles.displayedText, { fontSize: 28 }]}>
              {firstname}
            </Text>
          </View>
        ) : (
          <Input
            style={styles.input}
            labelTxt="Nom"
            placeholder="Nom"
            onChangeText={(value) => setLastName(value)}
            defaultValue={lastname}
          />
        )}
        {!editable ? (
          <Text style={[styles.displayedText, styles.infoText]}></Text>
        ) : (
          <Input
            style={(styles.input, styles.customInputStyle)}
            labelTxt="Prénom"
            placeholder="Prénom"
            defaultValue={firstname}
            onChangeText={(value) => setFirstName(value)}
          />
        )}
        {!editable ? (
          <>
            <Text style={styles.displayedInfo}>EMAIL</Text>
            <View style={styles.borderedContainer}>
              <Text style={styles.displayedText}>{email}</Text>
            </View>
          </>
        ) : (
          <Input
            style={styles.input}
            labelTxt="Email"
            placeholder="Email"
            defaultValue={email}
            onChangeText={(value) => setEmail(value)}
            type={email}
          />
        )}

        {!editable ? (
          <>
            <Text style={styles.displayedInfo}>NUMERO DE TELEPHONE</Text>
            <View style={styles.borderedContainer}>
              <Text style={styles.displayedText}>{phone}</Text>
            </View>
          </>
        ) : (
          <Input
            style={styles.input}
            labelTxt="Numéro de téléphone"
            placeholder="0102030405"
            defaultValue={phone}
            onChangeText={(value) => setPhone(value)}
            type="phone"
          />
        )}
        {!editable ? (
          <>
            <Text style={styles.displayedInfo}>DATE DE NAISSANCE</Text>
            <View style={styles.borderedContainer}>
              <Text style={styles.displayedText}>{birthDate}</Text>
            </View>
          </>
        ) : (
          <TouchableWithoutFeedback onPress={() => setDatePickerVisible(true)}>
            <View style={styles.birthDate}>
              <Text style={styles.labelText}>Date de naissance : </Text>
              <Text style={styles.labelText}>{birthDate}</Text>
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

        {!editable ? (
          <>
            <Text style={styles.displayedInfo}>DESCRIPTION</Text>

            <View style={styles.borderedContainer}>
              <Text style={styles.displayedText}>{description}</Text>
            </View>
          </>
        ) : (
          <Input
            style={styles.input}
            labelTxt="Description"
            placeholder="Décris nous en quelques lignes tes expériences,tes motivations,tes valeurs,etc..."
            defaultValue={description}
            onChangeText={(value) => setDescription(value)}
            multiline={true}
          />
        )}

        {!editable ? (
          <></>
        ) : (
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordText}> Mot de passe : </Text>
            <Text
              onPress={() => setModalVisible(true)}
              style={styles.textLinkModifiedPassword}
            >
              Modifier mon mot de passe
            </Text>
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
                  <Text style={styles.modalText}>Mot de passe formulaire</Text>
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
          </View>
        )}
        {!editable ? (
          <></>
        ) : (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              actionOnPress={() => handleSetProfile()}
              textBtn="Enregistrer"
            />
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
    width: "90%",
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

  displayedText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
  },

  displayedInfo: {
    fontWeight: "bold",
    color: "#A8A4B4",
    textAlign: "left",
    fontSize: 12,
    marginTop: 15,
  },

  labelText: {
    textAlign: "left",
    color: "white",
    fontSize: 15,
  },
  description: {
    color: "white",
    fontSize: 18,
    width: "90%",
  },
  passwordContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
  birthDate: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "2%",
    paddingBottom: "5%",
    textAlign: "left",
    justifyContent: "flex-start",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },

  borderedContainer: {
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    marginVertical: 10,
    backgroundColor: "rgba(184, 51, 106, 0.2)",
    padding: 10,
  },
});
