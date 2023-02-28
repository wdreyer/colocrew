import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
    const handleForm = () => {
        navigation.navigate("AreaChoiceScreen");
    };

    const goToSignUpPage = () => {
        navigation.navigate("SignUpScreen");
    };

    const handleGoogleConnect = () => {
        // A définir
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar style="light" />

                <View style={styles.filterBg}>
                    <ImageBackground
                        source={require("../assets/backgroundHome.jpg")}
                        resizeMode="cover"
                        style={styles.bgImage}
                        imageStyle={{ opacity: 0.5 }}
                    >
                        <KeyboardAvoidingView
                            style={styles.container}
                            behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                            }
                            enabled
                        >
                            <View style={styles.contentContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.tinyLogo}
                                    source={require("../assets/LogoColocrewCompletBlanc.png")}
                                />

                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInput}>
                                        E-mail
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="john@email.com"
                                        placeholderTextColor="rgba(167, 167, 167, 1)"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoComplete="email"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInput}>
                                        Mot de passe
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        placeholderTextColor="rgba(167, 167, 167, 1)"
                                        placeholder="mysecretpassword"
                                    />
                                </View>

                                <PrimaryButton
                                    textBtn="Se connecter"
                                    actionOnPress={handleForm}
                                />

                                <TouchableOpacity
                                    onPress={() => handleGoogleConnect()}
                                    activeOpacity={0.7}
                                    style={styles.googleConnectButton}
                                >
                                    <Text
                                        style={styles.googleConnectTextButton}
                                    >
                                        Google connect
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.linkContainer}
                                >
                                    <Text style={styles.linkText}>
                                        Vous n'avez pas encore de compte ?
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => goToSignUpPage()}
                                    >
                                        <Text style={styles.pressableLink}>
                                            S'inscrire
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    filterBg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundColor: "#000",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 60,
    },

    bgImage: {
        flex: 1,
        justifyContent: "center",
        height: "100%",
    },

    tinyLogo: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },

    inputContainer: {
        width: "100%",
    },

    labelInput: {
        color: "#fff",
        fontSize: 12,
        marginBottom: 2,
    },

    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: "#fff",
    },
    primaryButton: {
        backgroundColor: "#FAD4D8",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 6,
        marginTop: 10,
    },

    primaryTextButton: {
        fontSize: 20,
        fontWeight: "bold",
    },

    googleConnectButton: {
        backgroundColor: "#fff",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 6,
        marginTop: 10,
    },

    googleConnectTextButton: {
        fontSize: 20,
        fontWeight: "bold",
    },

    linkContainer: {
        marginTop: 40,
    },

    linkText: {
        color: "#fff",
    },
    pressableLink: {
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationColor: "#fff",
        paddingBottom: 5,
        color: "#fff",
        lineHeight: 32,
    },
});
