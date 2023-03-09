import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import globalStyle from "../styles/globalStyle";
import DisplayAnnounce from "../components/DisplayAnnounce";
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



export default function DisplayAnnounceScreen({navigation,route}) {
    const [editable, setEditable] = useState(false);   
    const updatedProps = {...route.params.props, display: 'announce'}

    const handleEditable = () => {
      navigation.navigate('RecruiterPostAnnounceScreen', {editing : true, updatedProps : updatedProps})

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
              <Text style={globalStyle.titleText}>{route.params.props.title}</Text>
              <TouchableOpacity
              onPress={() => handleEditable()}
            >
              <FontAwesome
                name={!editable ? "edit" : "save"}
                color="white"
                size={30}
              />
            </TouchableOpacity>
            </View>          
              <View style={globalStyle.contentContainer}>
              {!editable && (
                <>
               <DisplayAnnounce navigation={navigation.navigate} displayTitle={false} {...updatedProps} />
               <PrimaryButton textBtn='Retour' actionOnPress={() =>
                navigation.navigate("TabRecruiterNavigator",{
                  screen: 'RecruiterHomeScreen',
                })
              }/>
              </>
              )}

               </View>            
          </SafeAreaProvider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>



)   
}