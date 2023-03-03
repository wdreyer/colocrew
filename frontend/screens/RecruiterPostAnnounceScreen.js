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

import { SafeAreaProvider } from "react-native-safe-area-context";
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
import ToggleButton from "../components/ToggleButton";

export default function RecruterPostAnnounce({ navigation }) {
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);

    const [startDate, setStartDate] = useState("01-01-2020");

    const [counterChild, setCounterChild] = useState(0);
    const [counterAnim, setCounterAnim] = useState(0);


    const [titleAnnounce, setTitleAnnounce] = useState('');
    const [placeAnnounce, setPlaceAnnounce] = useState('');
    const [descriptionAnnounce, setDescriptionAnnounce] = useState('');
    const [salaryAnnounce, setSalaryAnnounce] = useState('');

    const handleForm = () => {
        console.log('test')

        const formData = new FormData();

        formData.append('photoFromFront', {
        uri: 'file://...',
        name: 'photo.jpg',
        type: 'image/jpeg',
        });

        fetch('http://.../upload', {
        method: 'POST',
        body: formData,
        }).then((response) => response.json())
        .then((data) => {
        
        });
    }


    const test = () => {
        console.log("test function");
    };

    const handleImageUrl = (value) => {
        console.log(value)
    }

    const handleTitleAnnounce = (value) => {
        setTitleAnnounce(value)
    }

    const handlePlaceAnnounce = (value) => {
        setPlaceAnnounce(value)
    }

    const handleDescriptionAnnounce = (value) => {
        setDescriptionAnnounce(value)
    }

    const handleSalaryAnnounce = (value) => {
        setSalaryAnnounce(value)
    }

    const handleActivitty= (value) => {
        setSalaryAnnounce(value)
    }

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
        <KeyboardAvoidingView
            style={globalStyle.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                style={globalStyle.body}
                contentContainerStyle={globalStyle.scrollView}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <SafeAreaView style={globalStyle.safeAreaContainer}>
                        <StatusBar style="light" />

                        <View style={globalStyle.headerContainer}>
                            <Image
                                style={globalStyle.logo}
                                source={require("../assets/LogoMiniBlanc.png")}
                            />
                            <Text style={globalStyle.titleText}>
                                Mon annonce
                            </Text>
                            <Text> </Text>
                        </View>
                        <View>
                            <View style={globalStyle.contentContainer}>
                                <Input
                                    labelTxt="Titre de l'annonce *"
                                    placeholder="Super séjour cheval à Val d'Isère"
                                    onChangeText={(value) => handleTitleAnnounce(value)}
                                />

                                <Input
                                    labelTxt="Lieu *"
                                    placeholder="Lieu"
                                    onChangeText={(value) => handlePlaceAnnounce(value)}
                                />

                                <Input
                                    labelTxt="Description"
                                    placeholder="Description"
                                    onChangeText={(value) => handleDescriptionAnnounce(value)}
                                    multiline={true}
                                />

                                <Input
                                    labelTxt="Salaire (Brut / jour)"
                                    placeholder="0€"
                                    onChangeText={(value) => handleSalaryAnnounce(value)}
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
                                        <UploadImage onUpdate={handleImageUrl} />
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
                                        <ToggleButton textButton="Tente" />
                                        <ToggleButton textButton="Centre" />
                                        <ToggleButton textButton="Itinérant" />
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
                                        <Input
                                            labelTxt="Nombre d'enfant(s)"
                                            onChangeText={(value) =>
                                                handleCounterChild(value)
                                            }
                                            value={counterChild}
                                            counter={true}
                                            type={"counter"}
                                        />
                                    </View>
                                    <View style={styles.wrapper}>
                                        <Input
                                            labelTxt="Nombre d'animateur(s)"
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
                                    actionOnPress={handleForm}
                                    textBtn="Publier une annonce"
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
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
        // flexDirection: "row",
        // alignItems: "center",
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
