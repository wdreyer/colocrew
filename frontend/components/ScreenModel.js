import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import { useState } from "react";
import globalStyle from "../styles/globalStyle";

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

export default function ScreenModel() {
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
              <Text style={globalStyle.titleText}>Mon titre ici</Text>
              <Text> </Text>
            </View>
            <View>
              <View style={globalStyle.contentContainer}>
                {/* Ajoutez ici les autres éléments de la screen */}
              </View>
            </View>
          </SafeAreaProvider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
