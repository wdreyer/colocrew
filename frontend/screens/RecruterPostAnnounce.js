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
    TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../components/Input";
import UploadImage from "../components/UploadImage";
import globalStyle from "../styles/globalStyle";

import { useState } from "react";
import Svg, { Path } from "react-native-svg";

import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import SelectableList from "../components/SelectableList";
import { TextInput } from "react-native-gesture-handler";

export default function RecruterPostAnnounce({ navigation }) {
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);

    const [startDate, setStartDate] = useState("01-01-2020");

    const [counterChild, setCounterChild] = useState(0);
    const [counterAnim, setCounterAnim] = useState(0);

    const test = () => {
        console.log("test function");
    };

    const handleStartDate = (date) => {
        setStartDate(date);
    };

    const handleCounterChild = (value) => {
        setCounterChild(value);
    };

    const handleCounterAnim = (value) => {
        setCounterAnim(value);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                                <View style={styles.wrapper}>
                                    <Text style={styles.choiceLabel}>
                                        Tente
                                    </Text>
                                    <Text style={styles.choiceLabel}>
                                        Centre
                                    </Text>
                                    <Text style={styles.choiceLabel}>
                                        Itinérant
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.sectionContainer}>
                                <View style={styles.wrapper}>
                                    <Text style={globalStyle.subtitle}>
                                        Début :
                                    </Text>
                                    <View style={styles.dateContainer}>
                                        <ModalDatePicker
                                            recupDate={(date) =>
                                                handleStartDate(date)
                                            }
                                        />
                                        <Text style={styles.date}>
                                            {startDate}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={globalStyle.subtitle}>
                                        Fin :
                                    </Text>
                                    <View style={styles.dateContainer}>
                                        <ModalDatePicker
                                            recupDate={(date) =>
                                                handleStartDate(date)
                                            }
                                        />
                                        <Text style={styles.date}>
                                            {startDate}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.sectionContainer}>
                                <View style={styles.wrapper}>
                                    <Input labelTxt="Nombre d'enfant(s)"
                                        onChangeText={(value) =>
                                            handleCounterChild(value)
                                        }
                                        value={counterChild}
                                        counter={true}
                                        type={"counter"}
                                    />
                                </View>
                                <View style={styles.wrapper}>
                                    <Input labelTxt="Nombre d'animateur(s)"
                                        onChangeText={(value) =>
                                            handleCounterAnim(value)
                                        }
                                        value={counterAnim}
                                        counter={true}
                                        type={"counter"}
                                    />
                                </View>
                            </View>

                            <PrimaryButton
                                actionOnPress={test}
                                textBtn="Publier une annonce"
                            />
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#281C47",
    },

    scrollView: {
        flex: 1,
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
        marginBottom: 10,
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
        justifyContent: "center",
    },

    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    date: {
        marginLeft: 20,
        color: "#FFF",
        fontSize: 20,
    },

    counter: {
        color: "#FFF",
        fontSize: 20,
        marginHorizontal: 10,
    },

    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },

    choiceLabel: {
        color: "#281c47",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 20,
        backgroundColor: "#FAD4D8",
        borderRadius: 10,
        padding: 10,
    },
});
