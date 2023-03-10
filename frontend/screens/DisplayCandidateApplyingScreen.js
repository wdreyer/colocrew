import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import globalStyle from "../styles/globalStyle";
import DisplayCandidateApplying from "../components/DisplayCandidateApplying";
import { useFocusEffect } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import config from "../config";
import CardBG from "../components/CardBG";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from 'react-redux';
import { display } from "@mui/system";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CandidatePost from "../components/CandidatePost";



export default function DisplayCandidateApplyingScreen({navigation,route}) {
    const [editable, setEditable] = useState(false);
    //console.log('ROUTE PARAMS PROPS Depuis DisplayCandidateApplyingScreen', route.params.props)

    const updatedProps = {...route.params.props, display: 'announce'}

    const handleEditable = () => {
      setEditable(true);
      console.log('GOGOGOG')
    }

    const formSubmitted = () => {
      console.log("Fomulaire d'édition validé");
      setEditable(false);
    }

return (
    <KeyboardAvoidingView
      style={globalStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={globalStyle.body}
        contentContainerStyle={globalStyle.scrollView}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaProvider style={globalStyle.safeAreaContainer}>
            <StatusBar style="light" />

            <View style={globalStyle.headerContainer}>
              <Image
                style={globalStyle.logo}
                source={require("../assets/LogoMiniBlanc.png")}
              />
              <Text style={globalStyle.titleText}></Text>
              <TouchableOpacity
              onPress={() => handleEditable()}
            >
              <FontAwesome
                name={!editable ? "edit" : ""} //------Edition-Fontawsome-Icon-----<<<<<<<<>>>>>>>>
                color="white"
                size={30}
              />
            </TouchableOpacity>
            </View>
          
              <View style={globalStyle.contentContainer}>
              {!editable ? (
                <>
                  <View>
                    <DisplayCandidateApplying navigation={navigation.navigate} displayTitle={false} {...updatedProps} />
                    <PrimaryButton textBtn='Retour' actionOnPress={() =>
                      navigation.navigate("TabCandidateNavigator",{
                        screen: 'CandidateHomeScreen',
                      })
                    }/>
                  </View> 
                </>)  : (
                  <View>
                    <CandidatePost isEditApplying={true} datas={updatedProps} formSubmitted={(data) => formSubmitted(data)}/>
                  </View>
                )}
               </View>            
          </SafeAreaProvider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>



)   
}