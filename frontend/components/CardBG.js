import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";

export default function BlurCard(props) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.actionOnPress()}
          activeOpacity={0.7}
          style={styles.contentContainer}
        >
          <Text style={styles.cardText}>{props.textCard}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#53496B",
    width: "100%",
    minWidth: "85%",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 0.5,
  },

  container: {
    position: "absolute",
    width: "100%",
    height: "100%",

    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },

  contentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
