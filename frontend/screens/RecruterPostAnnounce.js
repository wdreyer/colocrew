import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Button,
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

export default function RecruterPostAnnounce({ navigation }) {
    const test = () => {
        console.log("test function");
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled
            >
                <ScrollView>
                    <SafeAreaView style={styles.safeAreaContainer}>
                        <View style={styles.logoContainer}></View>
                        <Image
                            style={styles.logo}
                            source={require("../assets/LogoMiniBlanc.png")}
                        />
                        <View style={styles.contentContainer}>
                            <Text style={styles.titlePage}>Mon annonce</Text>

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
                                multiline="textArea"
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

                            <View style={styles.uploadImageContainer}>
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
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#281C47",
    },
    logoContainer: {
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 30,
    },

    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    titlePage: {
        color: "#fff",
        fontSize: 30,
        marginTop: 10,
        marginBottom: 20,
    },

    safeAreaContainer: {
        alignItems: "center",
    },


    titleSection: {
        fontSize: 20,
        color: "#FFF",
    },

    uploadImageWrapper: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    }
});
