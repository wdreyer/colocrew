import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import ModalDatePicker from "./ModalDatePicker";
import SelectableList from "./SelectableList";

export default function CandidatePost(props) {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndtDate] = useState("");
  const [childrenAge, setChildrenAge] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleDateModal = () => {
    console.log("Click HandleDateModal");
  };

  const handleSubmitForm = () => {
    console.log("blabla");
  };


  if (props.isEditable) {
    return (
    <View>
        <View style={styles.datePickers}>
            <Text style={styles.labelDatePicker}>Disponibilités*</Text>
            <View style={styles.datePicker}>
             <Text style={styles.labelDatePicker}>Date de début*</Text>
                <ModalDatePicker
                titleModal="Date de début"
                currentDate="2023-02-10"
                selectedDate="2023-02-10"
                />
            </View>
            <View style={styles.datePicker}>
            <Text style={styles.labelDatePicker}>Date de fin*</Text>
                <ModalDatePicker
                titleModal="Date de fin"
                currentDate="2023-02-17"
                selectedDate="2023-02-17"
                />
            </View>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#CCC" }}
          thumbColor={isEnabled ? "#B8336A" : "#AAA"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <SelectableList type='contractType'/>
        <Text>Qualifiactions</Text>
        <SelectableList type='qualifications'/>
        
        <Text>Type d'hébergement</Text>
        <SelectableList type='lodgings'/>
        
        <Text>Activités</Text>
        <SelectableList type='activities'/>
        <PrimaryButton
          textBtn="Publier ma candidature"
          actionOnPress={() => handleSubmitForm()}
        />
        
            
    </View>
    )
  } else {
    console.log("erreur")
    return (<Text>Erreur</Text>);
  }
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
    height: "80%",
    margin: 10,
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

  labelDatePicker: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 2,
    top: -6,
    
    zIndex: 100,
    backgroundColor: "#281C47",
    position: "absolute",
    paddingHorizontal: 3,
},

  datePickers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    height: 120,
    marginBottom: 10,
    position: "relative",
    width: "95%",
    padding: 10,
    color: "#fff",

  },

datePicker:{
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:'35%',
},
  
  button: {
    borderRadius: 20,
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
