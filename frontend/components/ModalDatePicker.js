 import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal } from "react-native";
import  PrimaryButton from "./PrimaryButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker';
import { dateFormater, shittyDateFormater } from "../modules/dateFormater";



export default function ModalDatePicker(props) {
    const todayDate = getToday();
    //console.log('Date du jour ===> ',todayDate);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(()=> {
      if(props.selectedDate){
        setSelectedDate(props.selectedDate)
      }
      if(props.current){
        setCurrentDate(props.current)
      }
      },[props]);
  


    
    const handleDateModal = () => {
        props.recupDate(selectedDate)
        //console.log('Click HandleDateModal');
        
        
        setDateModalVisible(!dateModalVisible)
    };

    const formattedDate =  shittyDateFormater(selectedDate)

    return (
            <View style={styles.centeredView}>
              <View  style={styles.calendarIcons}>
                <FontAwesome name='calendar' size={50} color='white' onPress={() => setDateModalVisible(true)}  />
              </View>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={dateModalVisible}
                  onRequestClose={() => {setDateModalVisible(!dateModalVisible);}}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{props.titleModal}</Text>
                            <Text style={styles.modalChoosenDate}>{formattedDate}</Text>
                            <View style={styles.datePicker}>
                                  <DatePicker
                                    options={{
                                      backgroundColor: '#281C47',
                                      textHeaderColor: '#FFF',
                                      textDefaultColor: '#FFF',
                                      selectedTextColor: '#fff',
                                      mainColor: '#F4722B',
                                      textSecondaryColor: '#D6C7A1',
                                      borderColor: 'rgba(122, 146, 165, 0.1)',
                                    }}
                                    format={'DD-MM-YYYY'}
                                    current={props.current}
                                    minimumDate={props.todayDate}
                                    maximumDate='2199-05-21'
                                    selected={props.selectedDate}
                                    onSelectedChange={date => setSelectedDate(date)}
                                    mode="calendar"
                                    minuteInterval={30}
                                    style={{ borderRadius: 10 }}
                                  />
                                  <View  style={styles.modalButtons}>
                                    <View style={styles.button}>
                                      <PrimaryButton textBtn='Valider la date' actionOnPress={() => handleDateModal(selectedDate)} ></PrimaryButton>
                                      <PrimaryButton textBtn='Annuler' actionOnPress={() => setDateModalVisible(!dateModalVisible)} ></PrimaryButton>
                                    </View>   
                                  </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      height: 100,
    },

    calendarIcons:{
      height:50,
      marginBottom:20,
    },

    datePicker: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: '90%',
    },
    modalView: {
        width: '90%',
        height: '90%',
        backgroundColor: '#53496B',
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalTitle: {
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 30,
      color: '#FFF',
  },
  modalChoosenDate: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FAD4D8',
},
  modalButtons: {
        marginTop: 20,
        flexDirection: "row",
        width:'60%',
    },

  button: {
      justifyContent:'space-evenly',
      borderRadius: 20,
      marginTop: 20,
      height: 150,

},
    
    
  });