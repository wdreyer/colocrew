import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";

import Input from "../components/Input";
import UploadImage from "../components/UploadImage";
import globalStyle from "../styles/globalStyle";

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import ToggleButton from "../components/ToggleButton";
import config from "../config";
import { getToday } from "react-native-modern-datepicker";
import CreateEditAnnounce from "../components/CreateEditAnnounce";

export default function RecruiterPostAnnounceScreen({ navigation, route }) {
    const [editing,setEditing] = useState(false);
    const [propsToEdit, setPropsToEdit] = useState({})
    
    useEffect(()=> {
    if(route && route.params && route.params.editing){
        setEditing(route.params.editing)
        setPropsToEdit(route.params.updatedProps)
    }    
     },[]);

    return (
     <>
     <CreateEditAnnounce  navigation={navigation.navigate} editing={editing} {...propsToEdit}/>
     </> 
    )
}