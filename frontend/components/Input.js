import { useState,useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input(props) {

    const [textInput, setTextInput] = useState('');
    useEffect(()=> {
    if(props.defaultValue){
        setTextInput(props.defaultValue)
    }
    },[props]);

    const handleInput = (value) => {
        setTextInput(value)
        props.onChangeText(value)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.labelInput}>{props.labelTxt}</Text>
            <TextInput onChangeText={(value) => handleInput(value)} 
                style = {props.multiline === true ? styles.inputTextArea : props.counter === true ? styles.inputCounter : styles.input}
                placeholderTextColor = "rgba(167, 167, 167, 1)"
                placeholder = {props.placeholder}

                textAlignVertical="top"

                secureTextEntry = {props.type === "password" && true}
        
                autoCapitalize = {props.type === "email" ? "none" : props.type === "password" ? "password" : "sentences"}
                keyboardType = {props.type === "email" ? "email-address" : props.type === "phone" ? "numeric" : props.type === "counter" ? "numeric" :  "default"}
                textContentType = {props.type === "email" ? "emailAddress" : props.type === "phone" ? "telephoneNumber" : "none"}

                multiline = {props.multiline === true && true}

                value = {textInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },

    labelInput: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 2,
        top: -10,
        marginLeft: 8,
        zIndex: 100,
        backgroundColor: "#281C47",
        position: "absolute",
        paddingHorizontal: 3,
    },

    input: {
        position: "relative",
        minWidth: "70%",
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        color: "#fff",
        fontSize: 15,
    },

    inputTextArea: {
        position: "relative",
        minWidth: "100%",
        maxWidth: "100%",
        borderWidth: 0.3,
        borderColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 15,
        marginBottom: 15,
        color: "#fff",
        height: 200,
    },

    inputCounter: {
        position: "relative",
        minWidth: '80%',
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        color: "#fff",
        height: 40,
        paddingHorizontal: 10,
    }
});
