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
import ProfileScreen from "./ProfileScreen";
import ApplyArchivedScreen from "./AnnounceArchivedScreen";
import { useNavigation } from "@react-navigation/native";

export default function CandidateHomeScreen() {
  const navigation = useNavigation();

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
              <Text style={globalStyle.titleText}>Accueil Candidat</Text>
              <Text></Text>
            </View>

            {/* Profil pas rempli a 100% */}
            <View>
              <View style={globalStyle.contentContainer}>
                <View>
                  <Text style={globalStyle.text}>
                    Veuillez remplir votre profil pour publier une candidature
                    et consulter les annonces.
                  </Text>
                  <PrimaryButton
                    textBtn="Remplir mon profil"
                    actionOnPress={() => navigation.navigate(ProfileScreen)}
                  />
                </View>
                <View style={styles.candidaturesContainer}>
                  <Text style={globalStyle.text}>
                    Dernières annonces postées:{" "}
                  </Text>
                  <CardBG textCard="Séjour 1" />
                  <CardBG textCard="Séjour 2" />
                  <CardBG textCard="Séjour 3" />
                </View>

                {/* Profil rempli a 100% mais pas de candidatures publiéé */}

                <View>
                  <Text style={globalStyle.text}>
                    Aucune candidature publiée.
                  </Text>
                  <PrimaryButton
                    textBtn="Publier une candidature"
                    actionOnPress={() =>
                      navigation.navigate(CandidatePostApplyFormScreen)
                    }
                  />
                </View>
                <View style={styles.candidaturesContainer}>
                  <Text style={globalStyle.text}>
                    Dernières annonces postées:{" "}
                  </Text>
                  <CardBG textCard="Séjour 1" />
                  <CardBG textCard="Séjour 2" />
                  <CardBG textCard="Séjour 3" />
                </View>

                {/* Screen "Mes candidatures" */}
                <View>
                  <Text style={globalStyle.text}>Mes candidatures: </Text>
                  <View style={styles.séjourContainer}>
                    <CardBG textCard="Candidatures 1" />
                    <CardBG textCard="Candidatures 2" />
                    <CardBG textCard="Candidatures 3" />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ApplyArchivedScreen)}
                  >
                    <Text style={styles.linkText}>
                      Voir mes candidatures archivées
                    </Text>
                  </TouchableOpacity>
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
  sejourContainer: {
    marginTop: 30,
  },

  linkText: {
    color: "#7AC3F7",
    textDecorationLine: "underline",
    textAlign: "right",
    margin: 20,
    fontSize: 15,
  },
});
