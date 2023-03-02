import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body: {
        fontFamily: "Inter",
        backgroundColor: "#281c47"
    },

    titlePage: {
        color: "#fff",
        fontSize: 30,
        marginTop: 10,
        marginBottom: 20,
    },

    subtitle: {
        color: "#fff",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },

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
        minWidth: "70%",
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: "#fff",
    },

    inputTextArea: {
        position: "relative",
        minWidth: "70%",
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 15,
        marginBottom: 15,
        color: "#fff",
        height: 200,
    },
});
