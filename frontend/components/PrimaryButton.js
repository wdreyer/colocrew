import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PrimaryButton(props) {
    return (
        <TouchableOpacity
            onPress={() => props.actionOnPress()}
            activeOpacity={0.7}
            style={styles.primaryButton}
        >
            <Text style={styles.primaryTextButton}>{props.textBtn}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
});
