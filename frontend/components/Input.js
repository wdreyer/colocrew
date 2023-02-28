import { useState } from "react";
import { StyleSheet, Text, TextInput, View, PermissionsAndroid } from "react-native";

export default function Input(props) {

    const [textInput, setTextInput] = useState('');

    const handleInput = (value) => {
        setTextInput(value)
        props.onChangeText(value)
    }

    return (
        <View>
            <Text style={styles.labelInput}>{props.labelTxt}</Text>
            <TextInput onChangeText={(value) => handleInput(value)}
                style = {styles.input}
                placeholderTextColor = "rgba(167, 167, 167, 1)"
                placeholder = {props.placeholder}

                secureTextEntry = {props.type === "password" && true}
        
                autoCapitalize = {props.type === "email" ? "none" : props.type === "password" ? "password" : "sentences"}
                keyboardType ={props.type === "email" ? "email-address" : props.type === "phone" ? "numeric" : "default"}
                textContentType ={props.type === "email" ? "emailAddress" : props.type === "phone" ? "telephoneNumber" : "none"}

                value = {textInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    labelInput: {
        color: "#fff",
        fontSize: 12,
        marginBottom: 2,
        top: -6,
        marginLeft: 8,
        zIndex: 100,
        backgroundColor: "#281C47",
        position: "absolute",
        paddingHorizontal: 3,
    },

    input: {
        position: "relative",
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: "#fff",
    },
});
