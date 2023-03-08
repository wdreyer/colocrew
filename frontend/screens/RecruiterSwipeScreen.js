// React Native Swipeable Card View UI like Tinder
// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

// import React in our code
import React, { useEffect, useState } from "react";
import "../components/SwipeableCard";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";

import globalStyle from "../styles/globalStyle";
import config from "../config";

// const DEMO_CONTENT = [
//     {
//         id: "1",
//         cardTitle: "John Doe",
//         avatarImage: "../assets/hasbulla.jpg",
//         qualifications: ["Bafa", "Surveillant de Baignade"],
//         startDate: "03/07/2023",
//         endDate: "17/07/2023",
//         description:
//             "Je suis William, animateur grave chaud, embauchez moi svp, j’ai pas d’argent, je dois rembourser ma formation à la capsule",
//     },
//     {
//         id: "2",
//         cardTitle: "John Doe",
//         avatarImage: "../assets/MathiasAvatar.png",
//         qualifications: ["Bafa", "BAFD"],
//         startDate: "03/07/2023",
//         endDate: "17/07/2023",
//         description:
//             "Je suis William, animateur grave chaud, embauchez moi svp, j’ai pas d’argent, je dois rembourser ma formation à la capsule",
//     },
//     {
//         id: "3",
//         cardTitle: "John Doe",
//         avatarImage: "../assets/MathiasAvatar.png",
//         qualifications: ["Bafa", "Autre"],
//         startDate: "03/07/2023",
//         endDate: "17/07/2023",
//         description:
//             "Je suis William, animateur grave chaud, embauchez moi svp, j’ai pas d’argent, je dois rembourser ma formation à la capsule",
//     },
// ].reverse();

export default RecruiterSwipeScreen = () => {
    const [noMoreCard, setNoMoreCard] = useState(false);
    // const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
    const [swipeDirection, setSwipeDirection] = useState("--");
    const [candidates, setCandidates] = useState([])


    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = () => {
        fetch(`${config.URL_BACKEND}/applications`)
            .then((rs) => rs.json())
            .then((res) => {
                setCandidates(res.data);
            });
    };

    const removeCard = (id) => {
        candidates.splice(
            candidates.findIndex((item) => item._id == id),
            1
        );
        setCandidates(candidates);
        if (candidates.length == 0) {
            setNoMoreCard(true);
        }
    };

    const lastSwipedDirection = (swipeDirection) => {
        setSwipeDirection(swipeDirection);
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.headerContainer}>
                <Image
                    style={globalStyle.logo}
                    source={require("../assets/LogoMiniBlanc.png")}
                />
            </View>
            {/* <Text style={styles.swipeText}>
                Last Card Swipe Direction was{"\n"}
                {swipeDirection}
            </Text> */}
            <View style={styles.container}>
                {candidates && candidates.map((item, key) => (

                    <SwipeableCard
                        key={key}
                        item={item}
                        removeCard={() => removeCard(item._id)}
                        swipedDirection={lastSwipedDirection}
                    />
                ))}
                {noMoreCard ? (
                    <Text style={{ fontSize: 22, color: "#fff" }}>
                        No Cards Found.
                    </Text>
                ) : null}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#281C47",
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginRight: 20,
        marginTop: 20,
        height: 100,
    },

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
        color: "#fff",
    },
});
