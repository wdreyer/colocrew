 import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal } from "react-native";
import TheDatePicker from './TheDatePicker';
import  PrimaryButton from "./PrimaryButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function ModalDatePicker(props) {
    const [dateModalVisible, setDateModalVisible] = useState(false);

    const handleDateModal = () => {
        console.log('Click HandleDateModal');
    };

    const handleSubmitForm = () => {
        console.log('blabla');
    };

    return (
            <View style={styles.centeredView}>
            <FontAwesome name='calendar' size={40} color='white' onPress={() => setDateModalVisible(true)}  />
                <Modal
                animationType="slide"
                transparent={true}
                visible={dateModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setDateModalVisible(!dateModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>{props.titleModal}</Text>
                    <TheDatePicker selected={props.selectedDate} current={props.currentDate}></TheDatePicker>
                    <View  style={styles.modalButtons}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setDateModalVisible(!dateModalVisible)}>
                        <Text style={styles.textStyle}>Valider la date</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setDateModalVisible(!dateModalVisible)}>
                        <Text style={styles.textStyle}>Annuler</Text>
                    </Pressable>

                    </View>
                    </View>
                </View>
                </Modal>
            </View>
        );
    }

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "70%",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    margin: 10,
    padding: 10,
    elevation: 2,
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
});
