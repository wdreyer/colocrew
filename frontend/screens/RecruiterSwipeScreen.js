// React Native Swipeable Card View UI like Tinder
// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

// import React in our code
import React, { useEffect, useState } from "react";
import "../components/SwipeableCardCandidate";
import { useSelector } from "react-redux";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";

import globalStyle from "../styles/globalStyle";
import config from "../config";

export default RecruiterSwipeScreen = () => {
    const [noMoreCard, setNoMoreCard] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState("--");
    const [candidates, setCandidates] = useState([]);

    const user = useSelector((state) => state.users);
    const userId = user.mongoID;

    console.log(user)
    

    useEffect(() => {
        getApplicationsByIdRecruiter();
    }, []);

    const getApplicationsByIdRecruiter = () => {
        fetch(`${config.URL_BACKEND}/applications/getApplicationsByUserCompatible/${userId}`)
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
                {candidates &&
                    candidates.map((item, key) => (
                        <SwipeableCard
                            key={key}
                            item={item}
                            removeCard={() => removeCard(item._id)}
                            swipedDirection={lastSwipedDirection}
                        />
                    ))}
                {noMoreCard ? (
                    <Text style={{ fontSize: 22, color: "#fff" }}>
                        Aucune proposition disponible.
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
