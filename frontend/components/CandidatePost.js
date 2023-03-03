import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import ModalDatePicker from "./ModalDatePicker";
import SelectableList from "./SelectableList";
import ToggleButton from "./ToggleButton";
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import config from "../config";

export default function CandidatePost(props) {
    const todayDate = getToday();
    const formattedDate = getFormatedDate(new Date(), "DD/MM/YYYY"); 
    //console.log('Formatted date ',formattedDate);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [tabContracts, setTabContracts] = useState([]);
    const [tabQualifications, setTabQualifications] = useState([]);
    const [tabLodgings, setTabLodgings] = useState([]);

    useEffect(() => {
            fetch(`${config.URL_BACKEND}/settings/contractType`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(),
            })
              .then((response) => response.json())
              .then((data) => {
                //console.log('Type de contracts ',data.data);
                if (data.result) {
                  let newArray = data.data.map((data,i) => {
                    return data.name;
                  });
                  setTabContracts(newArray);
                }
              });

              fetch(`${config.URL_BACKEND}/settings/qualifications`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(),
              })
                .then((response) => response.json())
                .then((data) => {
                  //console.log('Type de qualifications ',data.data);
                  if (data.result) {
                    let newArray = data.data.map((data,i) => {
                      return data.name;
                    });
                    setTabQualifications(newArray);
                  }
                });

                fetch(`${config.URL_BACKEND}/settings/lodgings`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      //console.log('Type de lodgings ',data.data);
                      if (data.result) {
                        let newArray = data.data.map((data,i) => {
                          return data.name;
                        });
                        setTabLodgings(newArray);
                      }
                    });
                
                
          }, []);

        const ContractTypesButtons = () => {
                let contractsList = tabContracts.map((e, i) => <ToggleButton key={i} isPressed={false} textButton={e}></ToggleButton>);
                return(<View style={styles.section}>{contractsList}</View>)
            }
        
        const LodgingButtons = () => {
            let lodgingsList = tabLodgings.map((e, i) => <ToggleButton key={i} isPressed={false} textButton={e}></ToggleButton>);
            return(<View style={styles.section}>{lodgingsList}</View>)
            }

        const QualificationsButtons = () => {
            let qualificationsList = tabQualifications.map((e, i) => <ToggleButton key={i} isPressed={false} textButton={e}></ToggleButton>);
            return(<View style={styles.section}>{qualificationsList}</View>)
            }

//   const data = [
//     { key: "1", value: "Mobiles", disabled: true },
//     { key: "2", value: "Appliances" },
//     { key: "3", value: "Cameras" },
//     { key: "4", value: "Computers", disabled: true },
//     { key: "5", value: "Vegetables" },
//     { key: "6", value: "Diary Products" },
//     { key: "7", value: "Drinks" },
//   ];

    const [startDate, setStartDate] = useState(todayDate);
    const [endDate, setEndDate] = useState(todayDate);
    const [childrenAge, setChildrenAge] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const recupDateFrom = (date) => {
        setStartDate(date);
        //console.log('RECUP START DATE Candidate FORM :  ', date);
    };

    const recupDateTo = (date) => {
        setEndDate(date);
        //console.log('RECUP END DATE Candidate FORM :  ', date);
    };

    const handleDateModal = () => {
        console.log("Click HandleDateModal");
    };

    const handleSubmitForm = () => {
        console.log("Formulaire soumis");
    };


  if (props.isEditable) {
    return (
    <View style={styles.centeredView}>
        <View style={styles.datePickers}>
          <Text style={styles.labelDatePicker}>Disponibilités*</Text>
          <View style={styles.containerDatePickers}>
            <View style={styles.datePicker}>
                <Text style={styles.labelDatePicker}>Date de début*</Text>
                <ModalDatePicker
                titleModal="Date de début"
                currentDate={startDate}
                selectedDate={startDate}
                todayDate={todayDate}
                recupDate={(dateFrom)=>recupDateFrom(dateFrom)}
                />
            </View>
            <View style={styles.datePicker}>
                <Text style={styles.labelDatePicker}>Date de fin*</Text>
                <ModalDatePicker
                titleModal="Date de fin"
                currentDate={endDate}
                selectedDate={endDate}
                todayDate={todayDate}
                recupDate={(dateTo)=>recupDateTo(dateTo)}
                />
            </View>
        </View>
        <View style={styles.dispoDates}>
            <Text style={styles.date}>Du {startDate}</Text>
            <Text style={styles.date}>au {endDate}</Text>
        </View>
        </View>
        
        
        
        {/* <Switch
            trackColor={{ false: "#767577", true: "#CCC" }}
            thumbColor={isEnabled ? "#B8336A" : "#AAA"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        /> */}
        <Text  style={styles.labelsFields}>Type de contrat préféré</Text>
        <ContractTypesButtons/>
        
        <Text  style={styles.labelsFields}>Qualifications</Text>
        <QualificationsButtons/>
        
        <Text style={styles.labelsFields}>Type d'hébergement</Text>
        <LodgingButtons/>
        
        <Text style={styles.labelsFields}>Activités</Text>
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
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
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

labelsFields: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
},

section:{
    position:'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 350,
    height: 'auto',
    padding: 10,
    borderWidth: 0.3,
    borderRadius: 25,
    borderColor: '#938CA4',
},
containerDatePickers:{
  marginTop: 20,
  flexDirection:'row',
  height: 80,
  width:'100%',
},

  datePickers: {
    position: "relative",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    height: 120,
    marginBottom: 10,
    width: "100%",
    padding: 10,
    color: "#fff",

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

datePicker:{
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:'35%',
},

dispoDates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height:40,
},

date: {
fontSize: 20,
fontWeight: 'bold',
color: "#C398BC",
margin: 10,

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
