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
import CardBG from "../components/CardBG";
import RecruiterProfileScreen from "./RecruiterProfileScreen";

export default function ScreenModel() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={globalStyle.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={globalStyle.body}
          contentContainerStyle={globalStyle.scrollView}
        >
          <SafeAreaProvider style={globalStyle.safeAreaContainer}>
            <StatusBar style="light" />

            <View style={globalStyle.headerContainer}>
              <Image
                style={globalStyle.logo}
                source={require("../assets/LogoMiniBlanc.png")}
              />
              <Text style={globalStyle.titleText}>Accueil Recruteur</Text>
              <Text></Text>
            </View>
            <View>
              <View style={globalStyle.contentContainer}>
                <View>
                  <Text style={globalStyle.text}>
                    Veuillez remplir votre profil pour publier une annonce et
                    consulter les candidatures.
                  </Text>
                  <PrimaryButton
                    textBtn="Remplir mon profil"
                    actionOnPress={() =>
                      navigation.navigate(RecruiterProfileScreen)
                    }
                  />
                </View>
                <View style={styles.candidaturesContainer}>
                  <Text style={globalStyle.text}>
                    Dernières candidatures postées:{" "}
                  </Text>
                  <CardBG textCard="Candidature 1" />
                  <CardBG textCard="Candidature 2" />
                  <CardBG textCard="Candidature 3" />
                </View>
                <View>
                  <Text style={globalStyle.text}>Aucune annonce publiée.</Text>
                  <PrimaryButton
                    textBtn="Publier une annonce"
                    actionOnPress={() =>
                      navigation.navigate(RecruiterPostAnnounce)
                    }
                  />
                </View>
                <View style={styles.candidaturesContainer}>
                  <Text style={globalStyle.text}>
                    Dernières candidatures postées:{" "}
                  </Text>
                  <CardBG textCard="Candidature 1" />
                  <CardBG textCard="Candidature 2" />
                  <CardBG textCard="Candidature 3" />
                </View>
              </View>
            </View>
          </SafeAreaProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  candidaturesContainer: {
    marginTop: 30,
  },
});
