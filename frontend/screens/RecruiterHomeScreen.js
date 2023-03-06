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
import AnnounceArchivedScreen from "./AnnounceArchivedScreen";
import { useNavigation } from '@react-navigation/native';

export default function RecruiterHomeScreen() {

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
              <Text style={globalStyle.titleText}>Accueil Recruteur</Text>
              <Text></Text>
            </View>

            {/* Profil pas rempli a 100% */}
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

                {/* Profil rempli a 100% mais pas d'annonce publiéé */}

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

                {/* Screen "Mes annonces" */}
                <View>
                  <Text style={globalStyle.text}>Mes annonces : </Text>
                  <View style={styles.séjourContainer}>
                    <CardBG textCard="Séjour 1" />
                    <CardBG textCard="Séjour 2" />
                    <CardBG textCard="Séjour 3" />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(AnnounceArchivedScreen)
                    }
                  >
                    <Text style={styles.linkText}>
                      Voir mes annonces archivées
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
