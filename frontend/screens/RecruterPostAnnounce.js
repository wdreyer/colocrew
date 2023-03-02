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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../components/Input";
import UploadImage from "../components/UploadImage";
import globalStyle from "../styles/globalStyle";

import { useState } from "react";
import Svg, { Path } from "react-native-svg";

import PrimaryButton from "../components/PrimaryButton";


export default function RecruterPostAnnounce({ navigation }) {
    const test = () => {
        console.log("test function");
    };

    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={styles.scrollView}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    enabled
                >
                    <SafeAreaView style={styles.safeAreaContainer}>
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={require("../assets/LogoMiniBlanc.png")}
                            />
                        </View>

                        <View style={styles.contentContainer}>
                            <Text style={globalStyle.titlePage}>
                                Mon annonce
                            </Text>

                            <Input
                                labelTxt="Titre de l'annonce *"
                                placeholder="Super séjour cheval à Val d'Isère"
                                onChangeText={test}
                            />

                            <Input
                                labelTxt="Lieu *"
                                placeholder="Lieu"
                                onChangeText={test}
                            />

                            <Input
                                labelTxt="Description"
                                placeholder="Description"
                                onChangeText={test}
                                multiline={true}
                            />

                            <Input
                                labelTxt="Salaire (Brut / jour)"
                                placeholder="0€"
                                onChangeText={test}
                            />

                            <Input
                                labelTxt="Activités"
                                placeholder="Activités"
                                onChangeText={test}
                            />

                            <View style={styles.sectionContainer}>
                                <Text style={styles.titleSection}>
                                    Ajouter des photos :
                                </Text>
                                <View style={styles.uploadImageWrapper}>
                                    <UploadImage />
                                    <UploadImage />
                                    <UploadImage />
                                    <UploadImage />
                                    <UploadImage />
                                </View>
                            </View>

                            <View style={styles.sectionContainer}>
                                <Text style={globalStyle.subtitle}>
                                    Type d'hébergement :
                                </Text>
                                
                            </View>

                            <View style={styles.sectionContainer}>
                                <Text style={globalStyle.subtitle}>
                                    Séjours :
                                </Text>
                                <Svg
                                    style={styles.addButton}
                                    viewBox="0 0 24 24"
                                    width="50"
                                    height="50"
                                    fill="#FAD4D8"
                                >
                                    <Path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                                </Svg>
                            </View>

                            <PrimaryButton
                                actionOnPress={test}
                                textBtn="Publier une annonce"
                            />
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#281C47",
    },

    scrollView: {
        backgroundColor: "#281C47",
    },

    logoContainer: {
        justifyContent: "center",
        width: "100%",
        marginHorizontal: 30,
    },

    contentContainer: {
        margin: 25,
    },

    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    safeAreaContainer: {
        flex: 1,
    },

    titleSection: {
        fontSize: 20,
        color: "#FFF",
    },

    sectionContainer: {
        marginBottom: 30,
    },

    uploadImageWrapper: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    checkBox: {
        backgroundColor: "red",
    },

    sejourContainer: {},
});
