import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  body: {
    backgroundColor: "#281c47",
    height: windowHeight,
    width: windowWidth,
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginRight: 20,
    marginTop: 40,
    flex: 1,
  },

  mainTitlePage: {
    color: "#fff",
    fontSize: 30,
    marginTop: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#fff",
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20,
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
    color: "#fff",
    backgroundColor: "#281C47",
    paddingBottom : 100,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  titleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginRight: 50,
  },

  container: {
    color: "#fff",
    flex: 1,
    backgroundColor: "#281C47",
    paddingBottom: 5,
  },

  safeAreaContainer: {
    flex: 1,
    color: "#fff",
  },

  contentContainer: {
    color: "#fff",
    margin: 25,

  },

  text: {
    marginBottom: 15,
    color: "#fff",
    fontSize: 20,
  }
});
