import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input(props) {

    return (
        <View>
            <Text style={styles.labelInput}>{props.labelTxt}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor="rgba(167, 167, 167, 1)"
                placeholder={props.placeholder}
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
