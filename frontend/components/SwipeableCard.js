// React Native Swipeable Card View UI like Tinder
// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

// import React in our code
import React, { useState } from "react";

// import fontawesome
import FontAwesome from "react-native-vector-icons/FontAwesome";

// import all the components we are going to use
import {
    StyleSheet,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import avatarImage from "../assets/hasbulla.jpg";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default SwipeableCard = ({ item, removeCard, swipedDirection }) => {
    // let xPosition = new Animated.Value(0);
    const [xPosition, setXPosition] = useState(new Animated.Value(0));
    let swipeDirection = "";
    let cardOpacity = new Animated.Value(1);
    let rotateCard = xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-20deg", "0deg", "20deg"],
    });

    let panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            xPosition.setValue(gestureState.dx);
            if (gestureState.dx > SCREEN_WIDTH - 250) {
                swipeDirection = "Right";
            } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
                swipeDirection = "Left";
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (
                gestureState.dx < SCREEN_WIDTH - 150 &&
                gestureState.dx > -SCREEN_WIDTH + 150
            ) {
                swipedDirection("--");
                Animated.spring(xPosition, {
                    toValue: 0,
                    speed: 5,
                    bounciness: 10,
                    useNativeDriver: false,
                }).start();
            } else if (gestureState.dx > SCREEN_WIDTH - 150) {
                Animated.parallel([
                    Animated.timing(xPosition, {
                        toValue: SCREEN_WIDTH,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    swipedDirection(swipeDirection);
                    removeCard();
                });
            } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
                Animated.parallel([
                    Animated.timing(xPosition, {
                        toValue: -SCREEN_WIDTH,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    swipedDirection(swipeDirection);
                    removeCard();
                });
            }
        },
    });



    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.cardStyle,
                {
                    backgroundColor: "#53496B",
                    opacity: cardOpacity,
                    transform: [
                        { translateX: xPosition },
                        { rotate: rotateCard },
                    ],
                },
            ]}
        >
            <View style={styles.avatarContainer}>
                <Image source={avatarImage} style={styles.avatar} />
            </View>
            <Text style={styles.cardTitleStyle}> {item.cardTitle}</Text>

            <View style={styles.containerQualifications}>
                {item.qualifications.map((qualification, i) => {
                    return (
                        <View key={i} style={styles.qualifications}>
                            <Text style={styles.qualification}>
                                {qualification}
                            </Text>
                        </View>
                    );
                })}
            </View>

            <Text style={styles.disponibilities}>
                Disponible du {item.startDate} au {item.endDate}
            </Text>

            <Text style={styles.description}> {item.description}</Text>

            <View style={styles.swipeButtonContainer}>
                <TouchableOpacity style={styles.backgroundSwipeButton}>
                    <FontAwesome name="close" size={35} color="#C398BC" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onLikeTest()} style={styles.backgroundSwipeButton}>
                    <FontAwesome name="heart" size={35} color="red" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 20,
    },
    cardStyle: {
        width: "80%",
        height: "85%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 7,
        padding: 10,
    },
    cardTitleStyle: {
        color: "#fff",
        fontSize: 28,
        marginBottom: 5,
    },
    swipeText: {
        fontSize: 18,
        textAlign: "center",
    },

    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 20,
    },

    containerQualifications: {
        width: "100%",
    },

    qualifications: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    qualification: {
        color: "#fff",
    },

    disponibilities: {
        fontSize: 20,
        marginVertical: 10,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },

    description: {
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
        fontSize: 19
    },

    swipeButtonContainer: {
        flexDirection: "row",
    },

    backgroundSwipeButton: {
        backgroundColor: "#fff",
        borderRadius: "50%",
        margin: 20,
        height: 80,
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
});
