// React Native Swipeable Card View UI like Tinder
// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

// import React in our code
import React, { useState } from "react";
import "../components/SwipeableCard";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const DEMO_CONTENT = [
    {
        id: "1",
        cardTitle: "John Doe",
        avatarImage: "../assets/hasbulla.jpg",
        qualifications: ["Bafa", "Surveillant de Baignade"],
        startDate: "03/07/2023",
        endDate: "17/07/2023",
        description:
            "Je suis William, animateur grave chaud, embauchez moi svp, j’ai pas d’argent, je dois rembourser ma formation à la capsule",
    },
    {
        id: "2",
        cardTitle: "John Doe",
        avatarImage: "../assets/MathiasAvatar.png",
        qualifications: ["Bafa", "BAFD"],
        startDate: "03/07/2023",
        endDate: "17/07/2023",
        description:
            "Je suis William, animateur grave chaud, embauchez moi svp, j’ai pas d’argent, je dois rembourser ma formation à la capsule",
    },
    {
        id: "3",
        cardTitle: "John Doe",
        avatarImage: "../assets/MathiasAvatar.png",
        qualifications: ["Bafa", "Autre"],
        startDate: "03/07/2023",
        endDate: "17/07/2023",
        description:
            "Je suis William, animateur grave chaud, embauchez moi svp, j’ai pas d’argent, je dois rembourser ma formation à la capsule",
    },
].reverse();

export default RecruiterSwipeScreen = () => {
    const [noMoreCard, setNoMoreCard] = useState(false);
    const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
    const [swipeDirection, setSwipeDirection] = useState("--");

    const removeCard = (id) => {
        sampleCardArray.splice(
            sampleCardArray.findIndex((item) => item.id == id),
            1
        );
        setSampleCardArray(sampleCardArray);
        if (sampleCardArray.length == 0) {
            setNoMoreCard(true);
        }
    };

    const lastSwipedDirection = (swipeDirection) => {
        setSwipeDirection(swipeDirection);
    };

    const onLikeTest = () => {
        console.log("liked");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.swipeText}>
                Last Card Swipe Direction was{"\n"}
                {swipeDirection}
            </Text>
            <View style={styles.container}>
                {sampleCardArray.map((item, key) => (
                    <SwipeableCard
                        key={key}
                        item={item}
                        removeCard={() => removeCard(item.id)}
                        swipedDirection={lastSwipedDirection}
                        onLike={onLikeTest}
                    />
                ))}
                {noMoreCard ? (
                    <Text style={{ fontSize: 22, color: "#000" }}>
                        No Cards Found.
                    </Text>
                ) : null}
            </View>
        </SafeAreaView>
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
        width: "75%",
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 7,
    },
    cardTitleStyle: {
        color: "#fff",
        fontSize: 24,
    },
    swipeText: {
        fontSize: 18,
        textAlign: "center",
    },
});
