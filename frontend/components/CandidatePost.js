import { StyleSheet, Text, Pressable, TextInput, Switch, View, Modal } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import Input from "./Input";
import  PrimaryButton from "./PrimaryButton";
import ModalDatePicker from './ModalDatePicker';

export default function CandidatePost(props) {
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [selected, setSelected] = useState([]);

    const data = [
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ];

    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndtDate] = useState('');
    const [childrenAge, setChildrenAge] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleDateModal = () => {
        console.log('Click HandleDateModal');
    };

    const handleSubmitForm = () => {
        console.log('blabla');
    };

    const AActivitiesList = () => {
        
        fetch('http://10.0.2.32:3000/settings/activities', {
			    method: 'GET',
			    headers: { 'Content-Type': 'application/json' },
			    body: JSON.stringify(),
		}).then(response => response.json())
			.then(data => {
                //console.log(data.activities);
				if (data.result) {
					console.log('fetch Activities', data.activities)
                    const dataActivities = data.activities.map((data,i) => {
                        {key:i, value:data.name, disabled:true}
                    })
                    }
                console.log(dataActivities);
                })
        return(
        <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={dataActivities} 
            save="value"
            onSelect={() => alert(selected)} 
            label="Activités"
        />)
    }

    if (props.isEditable) {
        return (
        <View>
            <Input labelTxt='Ma candidature' placeholder='Ma candidature'/>
            <ModalDatePicker titleModal='Date de début' currentDate='2023-02-10' selectedDate='2023-02-10'/>
            <ModalDatePicker titleModal='Date de fin' currentDate='2023-02-17' selectedDate='2023-02-17'/>
            <Text >Type d'hébergement</Text>
            <Switch
                trackColor={{false: '#767577', true: '#CCC'}}
                thumbColor={isEnabled ? '#B8336A' : '#AAA'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Text >Activités</Text>
            <AActivitiesList/>
            <MultipleSelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                onSelect={() => alert(selected)} 
                label="Categories"
            />
            <PrimaryButton textBtn='Publier ma candidature'  actionOnPress={() => handleSubmitForm()} />
        </View>
        );
    } else {
        console.log('erreur');
        return (
            <Text>Erreur</Text>
        )
    }
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
        width: '90%',
        height: '80%',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });