 import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal } from "react-native";
import  PrimaryButton from "./PrimaryButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker';


export default function ModalDatePicker(props) {
    const todayDate = getToday();
    console.log('Date du jour ===> ',todayDate);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    
    const handleDateModal = () => {
        props.recupDate(selectedDate)
        //console.log('Click HandleDateModal');
        setDateModalVisible(!dateModalVisible)
    };
    return (
            <View style={styles.centeredView}>
              <FontAwesome name='calendar' size={40} color='white' onPress={() => setDateModalVisible(true)}  />
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={dateModalVisible}
                  onRequestClose={() => {setDateModalVisible(!dateModalVisible);}}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{props.titleModal}</Text>
                            <Text style={styles.modalChoosenDate}>{selectedDate}</Text>
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
      marginTop: 22,
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
    fontSize: 30,
    marginTop: 10,
    color: '#281C47',
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