import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
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
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function RecruiterHomeScreen({ navigation }) {
  const [profilPercent, setProfilePercent] = useState(0);
  const [campsData, setCampsData] = useState([]);
  const user = useSelector((state) => state.users);
  const uid = "8vpGzN94vRf0sRR1tHrI1DsIVt03";

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
        console.log(res);
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
          setCampsData(camps);
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
                text="texte to display"
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
                      Votre profil est rempli à {profilPercent}%
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
                      Dernières candidatures postées:{" "}
                    </Text>
                    <CardBG textCard="Candidature 1" />
                    <CardBG textCard="Candidature 2" />
                    <CardBG textCard="Candidature 3" />
                  </View>
                </>
              )}
              {campsData.length === 0 && (
                <>
                  <View>
                    <Text style={globalStyle.text}>
                      Aucune annonce publiée.
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
                      Dernières candidatures postées:{" "}
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
              <View>
                <Text style={globalStyle.text}>Mes annonces : </Text>
                <View style={styles.séjourContainer}>
                  <CardBG textCard="Séjour 1" />
                  <CardBG textCard="Séjour 2" />
                  <CardBG textCard="Séjour 3" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(AnnounceArchivedScreen)}
                >
                  <Text style={styles.linkText}>
                    Voir mes annonces archivées
                  </Text>
                </TouchableOpacity>
              </View>
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
