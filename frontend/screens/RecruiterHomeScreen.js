import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import globalStyle from "../styles/globalStyle";
import DisplayAnnounce from "../components/DisplayAnnounce";
import { useFocusEffect } from "@react-navigation/native";

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
import { useSelector } from "react-redux";
import { display } from "@mui/system";

export default function RecruiterHomeScreen({ navigation }) {
  const [profilPercent, setProfilePercent] = useState(0);
  const [campsData, setCampsData] = useState([]);
  const user = useSelector((state) => state.users);
  const uid = user.uid;

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = () => {
    fetch(`${config.URL_BACKEND}/users/authByUid/${uid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((rs) => rs.json())
      .then((res) => {
        let calculPercent = 0;
        const { firstname, lastname, phone, birthDate, description, camps } =
          res.data;
        let dataFields = [firstname, lastname, phone, birthDate, description];
        for (let data of dataFields) {
          if (data) {
            calculPercent = calculPercent + 20;
          }
        }
        setProfilePercent(calculPercent);
        if (camps.length > 0) {
          displayUserCamps(camps);
        }
      });
  };

  const displayUserCamps = (camps) => {
    {
      fetch(`${config.URL_BACKEND}/users/displayCampByUser/${uid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((rs) => rs.json())
        .then((res) => {
          const campsData = res.data.map((data, i) => {
            return (
              <DisplayAnnounce
                navigation={navigation.navigate}
                display="card"
                key={i}
                {...data}
              />
            );
          });
          setCampsData(campsData);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={globalStyle.scrollView}
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
              <Text style={globalStyle.titleText}>Accueil Recruteur</Text>
            </View>
            <View style={globalStyle.contentContainer}>
              {profilPercent < 100 && (
                <>
                  <View>
                    <Text style={globalStyle.text}>
                      Votre profil est rempli ?? {profilPercent}%
                    </Text>
                    <Text style={globalStyle.text}>
                      Veuillez remplir votre profil pour publier une annonce et
                      consulter les candidatures.
                    </Text>
                    <PrimaryButton
                      textBtn="Remplir mon profil"
                      actionOnPress={() =>
                        navigation.navigate("TabRecruiterNavigator", {
                          screen: "ProfileScreen",
                          params: { isEditable: true },
                        })
                      }
                    />
                  </View>
                  <View style={styles.candidaturesContainer}>
                    <Text style={globalStyle.text}>
                      Derni??res candidatures post??es:{" "}
                    </Text>
                    <CardBG textCard="Candidature 1" />
                  </View>
                </>
              )}
              {campsData.length === 0 && (
                <>
                  <View>
                    <Text style={globalStyle.text}>
                      Aucune annonce publi??e.
                    </Text>
                    <PrimaryButton
                      textBtn="Publier une annonce"
                      actionOnPress={() =>
                        navigation.navigate("RecruiterPostAnnounceScreen")
                      }
                    />
                  </View>
                  <View style={styles.candidaturesContainer}>
                    <Text style={globalStyle.text}>
                      Derni??res candidatures post??es:{" "}
                    </Text>

                    <CardBG textCard="Candidature 1" />
                    <CardBG textCard="Candidature 2" />
                    <CardBG textCard="Candidature 3" />
                  </View>
                </>
              )}
              {campsData.length > 0 && (
                <View>
                  <Text style={globalStyle.subtitle}>Mes Annonces :</Text>
                  {campsData}
                  <PrimaryButton
                    textBtn="Publier une annonce"
                    actionOnPress={() =>
                      navigation.navigate("RecruiterPostAnnounceScreen")
                    }
                  />
                </View>
              )}
              <>
                <Text style={globalStyle.text}>Mes annonces : </Text>
                <View style={styles.s??jourContainer}>
                  <CardBG textCard="S??jour 1" />
                  <CardBG textCard="S??jour 2" />
                  <CardBG textCard="S??jour 3" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(AnnounceArchivedScreen)}
                >
                  <Text style={styles.linkText}>
                    Voir mes annonces archiv??es
                  </Text>
                </TouchableOpacity>
              </>

              {campsData.length > 0 && (
                <View>
                  <Text style={globalStyle.subtitle}>Mes Annonces :</Text>
                  {campsData}
                  <PrimaryButton
                    textBtn="Publier une annonce"
                    actionOnPress={() =>
                      navigation.navigate("RecruiterPostAnnounceScreen")
                    }
                  />
                </View>
              )}
            </View>
          </SafeAreaProvider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  candidaturesContainer: {
    marginTop: 20,
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
