import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ToggleButton(props) {
  const [timesPressed, setTimesPressed] = useState(0);
  const [isPressed, setIsPressed] = useState(props.isPressed);

  const handleOnPress = () => {
    setIsPressed(!isPressed);
    console.log(isPressed);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleOnPress()}
        style={() => [
          { backgroundColor: isPressed ? "#C398BC" : "#999", justifyContent:'center',  alignItems: 'center', marginLeft: 5, height:35, },
          styles.wrapperCustom,
        ]}
      >
        <Text style={{color: isPressed ? "#FFF" : "#222", fontWeight:'bold'}}>{props.textButton}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minWidth: '25%',
    minHeight : 50,
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});
