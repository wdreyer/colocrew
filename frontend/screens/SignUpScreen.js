import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TextInput,
    ImageBackground,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, {useState} from 'react';

//import firebase
import { getAuth, createUserWithEmailAndPassword,fetchSignInMethodsForEmail } from "firebase/auth";
import app from '../src/firebase'
const auth = getAuth(app)

//endimport firebase

export default function SignUpScreen({ navigation }) {


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');


    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
      }  
    
    const handleForm = () => {
      if (!validateEmail(email)) {
        setMailError("Mail non valide");
        return;
      }
      if (!validatePassword(password)) {
        console.log("password non valide");
        setPasswordError(
          "Le mot de passe doit comprendre au moins 8 caractères, 1 chiffre et 1 caractère spécial"
        );
        return;
      }
      if (password !== passwordConfirm) {
        setPasswordConfirmError("Les 2 mots de passe ne sont pas identiques");
        console.log("password valide");
        return;
      }
      fetchSignInMethodsForEmail(auth, email)
        .then(function (signInMethods) {
          if (signInMethods.length > 0) {
           setMailError("L'adresse e-mail est déjà utilisée.");
            return
          } else {
            console.log("L'adresse e-mail est disponible.");
          }
        })
        .catch(function (error) {
          console.log("Une erreur s'est produite :", error);
        });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    const goToLoginPage = () => {
        navigation.navigate("LoginScreen");
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
                                        onChangeText={(email) => {
                                        setMailError('');
                                        setEmail(email)}}
                                        value = {email}
                                        onFocus = {() =>setMailError('')}
                                    />
                                    
                                   {mailError && <Text style={styles.error} >{mailError} </Text>}
                                    
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInput}>
                                        Mot de passe
                                    </Text>
                                    <TextInput
                                        style={ styles.input}
                                        secureTextEntry={true}
                                        placeholderTextColor="#fff"
                                        onChangeText={(password) => {
                                        setPasswordError('');    
                                        setPassword(password)}}
                                        value = {password}
                                        onFocus={() => setPasswordError('')}
                                    />
                                    {passwordError && <Text style={styles.error} >{passwordError} </Text>}

                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInput}>
                                        Confirmer le mot de passe
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        placeholderTextColor="#fff"
                                        onChangeText={(passwordConfirm) => {
                                        setPasswordConfirmError('');
                                        setPasswordConfirm(passwordConfirm)}}
                                        value = {passwordConfirm}
                                        onFocus ={()=>setPasswordConfirmError('')}
                                    />
                                {passwordConfirmError && <Text style={styles.error} >{passwordConfirmError} </Text>}
                                </View>


                                <TouchableOpacity
                                    onPress={() => handleForm()}
                                    activeOpacity={0.7}
                                    style={styles.primaryButton}
                                >
                                    <Text style={styles.primaryTextButton}>
                                        Sinscrire
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.linkContainer}
                                >
                                    <Text style={styles.linkText}>
                                        Vous avez déjà un compte ?
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => goToLoginPage()}
                                    >
                                        <Text style={styles.pressableLink}>
                                            Se connecter
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
        fontSize: 14,
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
    error : {
        color:"red",
        marginBottom: 10,
        fontSize: 18,
        backgroundColor:"rgba(0,0,0,0.5)",        
        padding: 5,
        borderRadius : 15,
    }


});
