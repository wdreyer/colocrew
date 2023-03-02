import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    body: {
        backgroundColor: "#281c47",
        height: windowHeight,
        width: windowWidth,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginRight: 20,
        marginTop: 20,
        flex: 1,
        height: 100,
    },

    container: {
        flex: 1,
        backgroundColor: "#281C47",
    },

    safeAreaContainer: {
        flex: 1,
    },

    contentContainer: {
        margin: 25,
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

    scrollView: {
        backgroundColor: "#281C47",
    },

    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    titleText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        marginRight: 50,
    },
});
