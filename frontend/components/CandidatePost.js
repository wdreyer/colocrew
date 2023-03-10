import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import ModalDatePicker from "./ModalDatePicker";
import SelectableList from "./SelectableList";
import ToggleButton from "./ToggleButton";
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import config from "../config";
import { shittyDateFormater } from "../modules/dateFormater";


export default function CandidatePost(props) {
    const user = useSelector((state) => state.users);
    console.log('USER => ',user)
    //console.log('PROPS RECUES PAR LE FORMULAIRE', props)
    const todayDate = getToday();
    const formattedDate = getFormatedDate(new Date(), "DD/MM/YYYY"); 
    //console.log('Formatted date ',formattedDate);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [tabContracts, setTabContracts] = useState([]);
    const [tabQualifications, setTabQualifications] = useState([]);
    const [tabLodgings, setTabLodgings] = useState([]);
    const [tabLocations, setTabLocations] = useState([]);

    const [post_id, setPost_id] = useState([]);
    const [postContracts, setPostContracts] = useState([]);
    const [postQualifications, setPostQualifications] = useState([]);
    const [postLodgings, setPostLodgings] = useState([]);
    const [postLocations, setPostLocations] = useState([]);
    const [postDescription , setPostDescription] = useState([]);
    const [postActivitiesList  , setPostActivitiesList]  = useState([]);
    const [edited, setEdited] = useState([]);

    //const [postUsersID, setPostUsersID] = useState([]);


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
  
                  fetch(`${config.URL_BACKEND}/settings/locations`, {
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
                        setTabLocations(newArray);
                      }
                    });
            }, [props]);


if (props.isEditApplying){
  useEffect (()=>{
    setPostDescription(props.datas.datas.description);
    setPostContracts(props.datas.datas.contractType);
    setPostActivitiesList(props.datas.datas.activities);
    setPostLodgings(props.datas.datas.lodgingType);
    setPostLocations(props.datas.datas.locations);
    setPost_id(props.datas.datas._id);
    setEdited(false);


  },[props, edited])
}

        const handleContractTypesButtons = (data) => {
          //console.log(data)
          if (data.state && !postContracts.some((e) => e === data.value)) {
              setPostContracts(prev => [...prev, data.value]);
          } else if (!data.state ) {
            setPostContracts(prev => prev.filter(e => e !== data.value));
          }
        }

        const handleQualificationsButtons = (data) => {
          //console.log(data)
          if (data.state && !postQualifications.some((e) => e === data.value)) {
              setPostQualifications(prev => [...prev, data.value]);
          } else if (!data.state && postQualifications.some((e) => e === data.value)) {
            setPostQualifications(prev => prev.filter(e => e !== data.value));
          }
        }

        const handleLodgingsButtons = (data) => {
          //console.log(data)
          if (data.state && !postLodgings.some((e) => e === data.value)) {
            setPostLodgings(prev => [...prev, data.value]);
        } else if (!data.state && postLodgings.some((e) => e === data.value)) {
          setPostLodgings(prev => prev.filter(e => e !== data.value));
        }
        }

        const handleLocationsButtons = (data) => {
          if (data.state && !postLocations.some((e) => e === data.value)) {
            setPostLocations(prev => [...prev, data.value]);
        } else if (!data.state && postLocations.some((e) => e === data.value)) {
          setPostLocations(prev => prev.filter(e => e !== data.value));
        }
        }
        
        //console.log('TABLEAU DE CONTRATS ==>  ',postContracts)
        //console.log('TABLEAU DE LOGEMENTS ==>  ',postLodgings)
        //console.log('TABLEAU DE Qualifications ==>  ',postQualifications)


        const ContractTypesButtons = () => {
                let contractsList = tabContracts.map((e, i) => <ToggleButton key={i} isPressed={postContracts.some(el => el === e)} textButton={e} funcReverseData={(data) => handleContractTypesButtons(data) }></ToggleButton>);
                return(<View style={styles.section}>{contractsList}</View>)
            }
        
        const LodgingButtons = () => {
            let lodgingsList = tabLodgings.map((e, i) => <ToggleButton key={i} isPressed={postLodgings.some(el => el === e)} textButton={e} funcReverseData={(data) => handleLodgingsButtons(data) }></ToggleButton>);
            return(<View style={styles.section}>{lodgingsList}</View>)
            }

        const QualificationsButtons = () => {
            let qualificationsList = tabQualifications.map((e, i) => <ToggleButton key={i} isPressed={postQualifications.some(el => el === e)} textButton={e} funcReverseData={(data) => handleQualificationsButtons(data) }></ToggleButton>);
            return(<View style={styles.section}>{qualificationsList}</View>)
            }
        
        const LocationsButtons = () => {
          let locationsList = tabLocations.map((e, i) => <ToggleButton key={i} isPressed={postLocations.some(el => el === e)} textButton={e} funcReverseData={(data) => handleLocationsButtons(data) }></ToggleButton>);
          return(<View style={styles.section}>{locationsList}</View>)
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
  

    const recupStartDate= (date) => {
        setStartDate(date);
        //console.log('RECUP START DATE Candidate FORM :  ', date);
    };

    const recupEndDate = (date) => {
        setEndDate(date);
        //console.log('RECUP END DATE Candidate FORM :  ', date);
    };

    const handleDescriptionField = (value) => {
        setPostDescription(value);
        //console.log(postDescription);
    };

    const handleActivitiesList = (data) => {
      setPostActivitiesList(data);
    };
    //console.log('========> ',postActivitiesList);

    const handleSubmitCandidateForm = () => {
      fetch(`${config.URL_BACKEND}/applications/newApply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { 
            
            idCandidate : user.mongoID,
            startDate : startDate,
            endDate : endDate,
            description : postDescription,
            lodgingType : postLodgings,
            locations : postLocations,
            activities : postActivitiesList,
            contractType : postContracts,
          }
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log('Type de qualifications ',data.data);
          if (data.result) {
            console.log('CANDIDATURE CREEE : ',data.storedResult);
          }
          else {
            console.log('Erreur de ')
          }
        });

        console.log("Formulaire soumis");
        props.formSubmitted(true);
    };

    const handleSubmitEditCandidateForm = () => {
      fetch(`${config.URL_BACKEND}/applications/editApply`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { 
            _id: post_id,
            idCandidate : user.mongoID,
            startDate : startDate,
            endDate : endDate,
            description : postDescription,
            lodgingType : postLodgings,
            locations : postLocations,
            activities : postActivitiesList,
            contractType : postContracts,
          }
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log('Type de qualifications ',data.data);
          if (data.result) {
            console.log('CANDIDATURE MODIFIEE : ',data);
            setPostDescription(data.description);
            setPostContracts(data.contractType);
            setPostActivitiesList(data.activites);
            setPostLodgings(data.lodgingType);
            setPostLocations(data.locations);
            setEdited(false);
          }
          else {
            console.log('Erreur de modification de l`annonce')
          }
        });
        props.formSubmitted(true);
        setEdited(true);
    };

    const formatedStartDate = shittyDateFormater(startDate);
    const formatedEndDate = shittyDateFormater(endDate);


  if (props.isNewApplying) {
    return (
    <View style={styles.CenteredView}>
        <View style={styles.datePickers}>
          <Text style={styles.labelDatePicker}>Disponibilités*</Text>
          <View style={styles.containerDatePickers}>
            <View style={styles.datePicker}>
                <Text style={styles.labelCalendar}>Date de début*</Text>
                <ModalDatePicker
                titleModal="Date de début"
                currentDate={startDate}
                selectedDate={startDate}
                todayDate={todayDate}
                recupDate={(startDate)=>recupStartDate(startDate)}
                />
            </View>
            <View style={styles.datePicker}>
                <Text style={styles.labelCalendar}>Date de fin*</Text>
                <ModalDatePicker
                titleModal="Date de fin"
                currentDate={endDate}
                selectedDate={endDate}
                todayDate={todayDate}
                recupDate={(endDate)=>recupEndDate(endDate)}
                />
            </View>
        </View>
        <View style={styles.dispoDates}>
            <Text style={styles.date}>Du {formatedStartDate}</Text>
            <Text style={styles.date}>au {formatedEndDate}</Text>
        </View>
        </View>
        <View>
        <Input multiline={true} labelTxt='Je suis hyper motivé !' onChangeText={(value) => handleDescriptionField(value)}></Input>
        </View>
        
        <Text  style={styles.labelsFields}>Type de contrat préféré</Text>
        <ContractTypesButtons/>
        
        <Text  style={styles.labelsFields}>Qualifications</Text>
        <QualificationsButtons/>

        <Text style={styles.labelsFields}>Environnement souhaité</Text>
        <LocationsButtons/>

        <Text style={styles.labelsFields}>Type d'hébergement souhaité</Text>
        <LodgingButtons/>
        
        <Text style={styles.labelsFields}>Activités</Text>
        <View style={styles.selectableList}>
          <SelectableList type='activities' handleActivitiesList={(data)=>handleActivitiesList(data)}/>
        </View>
        
        <PrimaryButton
          textBtn="Publier ma candidature"
          actionOnPress={(data) => handleSubmitCandidateForm(data)}
          />
    </View>
    )
  } 
  if (props.isEditApplying) {
    console.log("Edition annonce existante", props.datas)
    console.log(postQualifications,postContracts,postActivitiesList,postContracts,postLocations,postLodgings);
    return (
      <View style={styles.CenteredView}>
        <Text  style={styles.titleForm}>Modifier votre annonce {props.datas.ID}</Text>
          <View style={styles.datePickers}>
            <Text style={styles.labelDatePicker}>Disponibilités*</Text>
            <View style={styles.containerDatePickers}>
              <View style={styles.datePicker}>
                  <Text style={styles.labelCalendar}>Date de début*</Text>
                  <ModalDatePicker
                  titleModal="Date de début"
                  currentDate={startDate}
                  selectedDate={startDate}
                  todayDate={todayDate}
                  recupDate={(startDate)=>recupStartDate(startDate)}
                  />
              </View>
              <View style={styles.datePicker}>
                  <Text style={styles.labelCalendar}>Date de fin*</Text>
                  <ModalDatePicker
                  titleModal="Date de fin"
                  currentDate={endDate}
                  selectedDate={endDate}
                  todayDate={todayDate}
                  recupDate={(endDate)=>recupEndDate(endDate)}
                  />
              </View>
          </View>
          <View style={styles.dispoDates}>
              <Text style={styles.date}>Du {formatedStartDate}</Text>
              <Text style={styles.date}>au {formatedEndDate}</Text>
          </View>
          </View>
          <View>
          <Input multiline={true} defaultValue={postDescription} labelTxt='Je suis hyper motivé !' onChangeText={(value) => handleDescriptionField(value)}></Input>
          </View>
          
          <Text  style={styles.labelsFields}>Type de contrat préféré{}</Text>
          <ContractTypesButtons/>
          
          <Text  style={styles.labelsFields}>Qualifications</Text>
          <QualificationsButtons/>
  
          <Text style={styles.labelsFields}>Environnement souhaité</Text>
          <LocationsButtons/>
  
          <Text style={styles.labelsFields}>Type d'hébergement souhaité</Text>
          <LodgingButtons/>
          
          <Text style={styles.labelsFields}>Activités</Text>
          <View style={styles.selectableList}>
            <SelectableList type='activities' defaultCheckedValues={postActivitiesList} handleActivitiesList={(data)=>handleActivitiesList(data)}/>
          </View>
          
          <PrimaryButton
            textBtn="Valider ma candidature"
            actionOnPress={(data) => handleSubmitEditCandidateForm(data)}
            />
      </View>
      )
  }
};

{/* <Switch
    trackColor={{ false: "#767577", true: "#CCC" }}
    thumbColor={isEnabled ? "#B8336A" : "#AAA"}
    ios_backgroundColor="#3e3e3e"
    onValueChange={toggleSwitch}
    value={isEnabled}
/> */}


const styles = StyleSheet.create({
  CenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    width: "90%",
    height: "80%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
titleForm: {
  fontSize: 22,
  fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 2,
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
    justifyContent: 'flex-start',
    width: 350,
    height: 'auto',
    padding: 5,
    borderWidth: 0,
    borderRadius: 2,
    borderColor: '#938CA4',
},
containerDatePickers:{
  marginTop: 10,
  flexDirection:'row',
  justifyContent: 'center',
  height:90,
  width:'100%',
  backgroundColor:'#53496B',
},

  datePickers: {
    backgroundColor:'#53496B',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: "#fff",
    borderRadius: 5,
    height: 200,
    marginBottom: 20,
    width: "100%",
    padding: 5,
    color: "#fff",

  },
  labelCalendar: {
    color:'#fff',
    fontSize: 16,
    
    marginBottom: 25,
  },

  labelDatePicker: {
    color: "#fff",
    fontSize: 14,
    
    top: -6,
    zIndex: 100,
    backgroundColor: "#53496B",
    position:'absolute',
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
color: "#FFF",
margin: 10,

},

selectableList: {
  justifyContent: 'center',
  width: '100%',
  marginBottom: 40,
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
