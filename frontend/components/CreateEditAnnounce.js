import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";


import Input from "./Input";
import UploadImage from "../components/UploadImage";
import globalStyle from "../styles/globalStyle";

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import PrimaryButton from "../components/PrimaryButton";
import ModalDatePicker from "../components/ModalDatePicker";
import ToggleButton from "../components/ToggleButton";
import config from "../config";
import { getToday } from "react-native-modern-datepicker";


export default function CreateEditAnnounce(props) {
    const user = useSelector((state) => state.users);
    console.log("nav ?",props.navigation.navigate)





    const [titleAnnounce, setTitleAnnounce] = useState("");
    const [placeAnnounce, setPlaceAnnounce] = useState("");
    const [descriptionAnnounce, setDescriptionAnnounce] = useState("");
    const [salaryAnnounce, setSalaryAnnounce] = useState("");
    const [counterChild, setCounterChild] = useState(0);
    const [counterAnim, setCounterAnim] = useState(0);

    const [tabLodgings, setTabLodgings] = useState([]);
    const [postLodgings, setPostLodgings] = useState([]);

    const [tabActivities, setTabActivities] = useState([]);
    const [postActivities, setPostActivities] = useState([]);

    const [startDate, setStartDate] = useState(getToday());
    const [endDate, setEndDate] = useState(getToday());

    const [imageUrl, setImageUrl] = useState("");


    useEffect(()=> {
    if(props.editing){
        setTitleAnnounce(props.title);
        setPlaceAnnounce(props.location);
        setDescriptionAnnounce(props.description);
        setSalaryAnnounce(props.salary);
        setCounterChild(props.childNumber);
        setCounterAnim(props.animNumber);
        setPostLodgings(props.lodgingtype);
        setPostActivities(props.activities);
        setStartDate(props.startDate);
        setEndDate(props.endDate);
        setImageUrl(props.photos[0])
    }
},[props]);

    const editForm = () => {
        if (
            !titleAnnounce ||
            !placeAnnounce ||
            !descriptionAnnounce ||
            !salaryAnnounce ||
            !counterChild ||
            !counterAnim ||
            !postLodgings ||
            !postActivities ||
            !startDate ||
            !endDate
        ) {
            toggleErrorMsg();
            console.log("Champ(s) manquant(s)");
            return;
        }       
        if (imageUrl === props.photos[0])
       {
            // Create new camp in DB when no picture
            const editedCamp = {
                idCamp: props._id,
                title: titleAnnounce,
                location: placeAnnounce,
                description: descriptionAnnounce,
                salary: salaryAnnounce,
                startDate: startDate,
                endDate: endDate,
                childNumber: counterChild,
                animNumber: counterAnim,
                activities: postActivities,
                lodgingtype: postLodgings,
            };
            fetch(`${config.URL_BACKEND}/camps/editCamp`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedCamp),
            })
                .then((response) => response.json())
                .then((data) => {
                    setIsActiveErrorTitle(false);
                    setIsActiveErrorPlace(false);
                    setIsActiveErrorDescription(false);
                    setIsActiveErrorSalary(false);
                    setIsActiveErrorPostLodgings(false);
                    setIsActiveErrorPostActivities(false);
                    setIsActiveErrorCounterChild(false);
                    setIsActiveErrorCounterAnim(false);
                    props.navigation('RecruiterHome')
                });
        } else {
            // Create new camp in DB when picture(s)
            const editedCamp = {
                idCamp: props._id,
                title: titleAnnounce,
                location: placeAnnounce,
                description: descriptionAnnounce,
                salary: salaryAnnounce,
                startDate: startDate,
                endDate: endDate,
                childNumber: counterChild,
                animNumber: counterAnim,
                activities: postActivities,
                lodgingtype: postLodgings,
            };
            const formData = new FormData();

            formData.append("editCamp", JSON.stringify(editedCamp));

            formData.append("photoFromFront", {
                uri: imageUrl,
                name: imageUrl.split("/ImagePicker/")[1],
                type: "image/jpeg",
            });

            fetch(`${config.URL_BACKEND}/camps/editCamp`, {
                method: "PUT",
                headers: { "Content-Type": "multipart/form-data" },
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                setIsActiveErrorTitle(false);
                setIsActiveErrorPlace(false);
                setIsActiveErrorDescription(false);
                setIsActiveErrorSalary(false);
                setIsActiveErrorPostLodgings(false);
                setIsActiveErrorPostActivities(false);
                setIsActiveErrorCounterChild(false);
                setIsActiveErrorCounterAnim(false);
                props.navigation('RecruiterHome')
            });
              
        }





    }


    const [isActiveErrorTitle, setIsActiveErrorTitle] = useState(false);
    const [isActiveErrorPlace, setIsActiveErrorPlace] = useState(false);
    const [isActiveErrorDescription, setIsActiveErrorDescription] =
        useState(false);
    const [isActiveErrorSalary, setIsActiveErrorSalary] = useState(false);
    const [isActiveErrorCounterChild, setIsActiveErrorCounterChild] =
        useState(false);
    const [isActiveErrorCounterAnim, setIsActiveErrorCounterAnim] =
        useState(false);
    const [isActiveErrorPostLodgings, setIsActiveErrorPostLodgings] =
        useState(false);
    const [isActiveErrorPostActivities, setIsActiveErrorPostActivities] =
        useState(false);
    const [isActiveErrorStartDate, setIsActiveErrorPostStartDate] =
        useState(false);
    const [isActiveErrorEndDate, setIsActiveErrorPostEndDate] = useState(false);

    const toggleErrorMsg = () => {
        if (!titleAnnounce) {
            setIsActiveErrorTitle(true);
        } else {
            setIsActiveErrorTitle(false);
        }

        if (!placeAnnounce) {
            setIsActiveErrorPlace(true);
        } else {
            setIsActiveErrorPlace(false);
        }

        if (!descriptionAnnounce) {
            setIsActiveErrorDescription(true);
        } else {
            setIsActiveErrorDescription(false);
        }

        if (!salaryAnnounce) {
            setIsActiveErrorSalary(true);
        } else {
            setIsActiveErrorSalary(false);
        }

        if (postLodgings.length < 1) {
            setIsActiveErrorPostLodgings(true);
        } else {
            setIsActiveErrorPostLodgings(false);
        }

        if (postActivities.length < 1) {
            setIsActiveErrorPostActivities(true);
        } else {
            setIsActiveErrorPostActivities(false);
        }

        if (!counterChild) {
            setIsActiveErrorCounterChild(true);
        } else {
            setIsActiveErrorCounterChild(false);
        }

        if (!counterAnim) {
            setIsActiveErrorCounterAnim(true);
        } else {
            setIsActiveErrorCounterAnim(false);
        }
    };

    const handleForm = () => {
        if (
            !titleAnnounce ||
            !placeAnnounce ||
            !descriptionAnnounce ||
            !salaryAnnounce ||
            !counterChild ||
            !counterAnim ||
            !postLodgings ||
            !postActivities ||
            !startDate ||
            !endDate
        ) {
            toggleErrorMsg();
            console.log("Champ(s) manquant(s)");
            return;
        }

        if (!imageUrl) {
            // Create new camp in DB when no picture
            const newCamp = {
                idRecruiter: user.mongoID,
                title: titleAnnounce,
                location: placeAnnounce,
                description: descriptionAnnounce,
                salary: salaryAnnounce,
                startDate: startDate,
                endDate: endDate,
                childNumber: counterChild,
                animNumber: counterAnim,
                activities: postActivities,
                lodgingtype: postLodgings,
            };
            fetch(`${config.URL_BACKEND}/camps/createCamp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCamp),
            })
                .then((response) => response.json())
                .then((data) => {
                    setIsActiveErrorTitle(false);
                    setIsActiveErrorPlace(false);
                    setIsActiveErrorDescription(false);
                    setIsActiveErrorSalary(false);
                    setIsActiveErrorPostLodgings(false);
                    setIsActiveErrorPostActivities(false);
                    setIsActiveErrorCounterChild(false);
                    setIsActiveErrorCounterAnim(false);
                    props.navigation('RecruiterHome')
                });
        } else {
            // Create new camp in DB when picture(s)
            const newCamp = {
                idRecruiter: user.mongoID,
                title: titleAnnounce,
                location: placeAnnounce,
                description: descriptionAnnounce,
                salary: salaryAnnounce,
                startDate: startDate,
                endDate: endDate,
                childNumber: counterChild,
                animNumber: counterAnim,
                activities: postActivities,
                lodgingtype: postLodgings,
            };
            const formData = new FormData();

            formData.append("newCamp", JSON.stringify(newCamp));

            formData.append("photoFromFront", {
                uri: imageUrl,
                name: imageUrl.split("/ImagePicker/")[1],
                type: "image/jpeg",
            });

            fetch(`${config.URL_BACKEND}/camps/createCamp`, {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setIsActiveErrorTitle(false);
                    setIsActiveErrorPlace(false);
                    setIsActiveErrorDescription(false);
                    setIsActiveErrorSalary(false);
                    setIsActiveErrorPostLodgings(false);
                    setIsActiveErrorPostActivities(false);
                    setIsActiveErrorCounterChild(false);
                    setIsActiveErrorCounterAnim(false);
                    props.navigation('RecruiterHome')
                });
        }
    };

    const handleImageUrl = (value) => {
        setImageUrl(value);
    };

    const handleTitleAnnounce = (value) => {
        setTitleAnnounce(value);
    };

    const handlePlaceAnnounce = (value) => {
        setPlaceAnnounce(value);
    };

    const handleDescriptionAnnounce = (value) => {
        setDescriptionAnnounce(value);
    };

    const handleSalaryAnnounce = (value) => {
        setSalaryAnnounce(value);
    };

    const handleCounterChild = (value) => {
        setCounterChild(value);
    };

    const handleCounterAnim = (value) => {
        setCounterAnim(value);
    };

    const getLodgings = () => {
        fetch(`${config.URL_BACKEND}/settings/lodgings`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    let newArray = data.data.map((data, i) => {
                        return { name: data.name, _id: data._id };
                    });
                    setTabLodgings(newArray);
                }
            });
    };

    const getActivities = () => {
        fetch(`${config.URL_BACKEND}/settings/activities`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    let newArray = data.data.map((data, i) => {
                        return { name: data.name, _id: data._id };
                    });
                    setTabActivities(newArray);
                }
            });
    };

    const handleActivitiesButtons = (data) => {
        if (data.state && !postActivities.some((e) => e === data.value)) {
            setPostActivities((prev) => [...prev, data.value]);
        } else if (!data.state && postActivities.some((e) => e === data.value)) {
            setPostActivities((prev) => prev.filter((e) => e !== data.value));
        }
    };



    const handleLodgingsButtons = (data) => {
        if (data.state && !postLodgings.some((e) => e === data.value)) {
            setPostLodgings((prev) => [...prev, data.value]);
        } else if (!data.state && postLodgings.some((e) => e === data.value)) {
            setPostLodgings((prev) => prev.filter((e) => e !== data.value));
        }
    };

    const recupDateFrom = (date) => {
        setStartDate(date);
    };

    const recupDateTo = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        getActivities();
        getLodgings();
    }, []);

    

    return (
        <KeyboardAvoidingView
            style={globalStyle.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                style={globalStyle.body}
                contentContainerStyle={globalStyle.scrollView}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <SafeAreaView style={globalStyle.safeAreaContainer}>
                        <StatusBar style="light" />

                        <View style={globalStyle.headerContainer}>
                            <Image
                                style={globalStyle.logo}
                                source={require("../assets/LogoMiniBlanc.png")}
                            />
                            <Text style={globalStyle.titleText}>
                                Mon annonce
                            </Text>
                            <Text> </Text>
                        </View>
                        <View>
                            <View style={globalStyle.contentContainer}>
                                <Input
                                    labelTxt="Titre de l'annonce *"
                                    placeholder="Super séjour cheval à Val d'Isère"
                                    onChangeText={(value) =>
                                        setTitleAnnounce(value)
                                    }
                                    defaultValue={titleAnnounce}
                                    

                                />
                                
                                <View
                                    style={
                                        isActiveErrorTitle &&
                                        styles.errorMessageContainer
                                    }
                                >
                                    <Text
                                        style={
                                            isActiveErrorTitle
                                                ? styles.errorTxt
                                                : styles.hideContent
                                        }
                                    >
                                        Champ requis *
                                    </Text>
                                </View>

                                <Input
                                    labelTxt="Lieu *"
                                    placeholder="Lieu"
                                    onChangeText={(value) =>
                                        handlePlaceAnnounce(value)
                                    }
                                    defaultValue={placeAnnounce}
                                   
                                />
                                <View
                                    style={
                                        isActiveErrorPlace &&
                                        styles.errorMessageContainer
                                    }
                                >
                                    <Text
                                        style={
                                            isActiveErrorPlace
                                                ? styles.errorTxt
                                                : styles.hideContent
                                        }
                                    >
                                        Champ requis *
                                    </Text>
                                </View>

                                <Input
                                    labelTxt="Description *"
                                    placeholder="Description"
                                    onChangeText={(value) =>
                                        handleDescriptionAnnounce(value)
                                    }
                                    multiline={true}
                                    defaultValue={descriptionAnnounce}
                                />
                                <View
                                    style={
                                        isActiveErrorDescription &&
                                        styles.errorMessageContainer
                                    }
                                >
                                    <Text
                                        style={
                                            isActiveErrorDescription
                                                ? styles.errorTxt
                                                : styles.hideContent
                                        }
                                    >
                                        Champ requis *
                                    </Text>
                                </View>

                                <Input
                                    labelTxt="Salaire (Brut / jour) *"
                                    placeholder="0"
                                    onChangeText={(value) =>
                                        handleSalaryAnnounce(value)
                                    }
                                    defaultValue={salaryAnnounce.toString()}
                                    
                                    type={"counter"}
                                    
                                />
                                <View
                                    style={
                                        isActiveErrorSalary &&
                                        styles.errorMessageContainer
                                    }
                                >
                                    <Text
                                        style={
                                            isActiveErrorSalary
                                                ? styles.errorTxt
                                                : styles.hideContent
                                        }
                                    >
                                        Champ requis *
                                    </Text>
                                </View>

                                <View style={styles.sectionContainer}>
                                    <Text style={styles.titleSection}>
                                        Ajouter une photo :
                                    </Text>
                                    <View style={styles.uploadImageWrapper}>
                                        <UploadImage
                                            onUpdate={handleImageUrl}
                                            defaultImage={imageUrl}
                                        />
                                    </View>
                                </View>

                                <View style={styles.sectionContainer}>
                                    <Text style={globalStyle.subtitle}>
                                        Types dactivités *
                                    </Text>
                                    <View style={styles.wrapper}>
                                        {tabActivities &&
                                            tabActivities.map((e) => {
                                                return (
                                                    <View key={e._id}>                                    
                                                        <ToggleButton
                                                       
                                                            isPressed={postActivities.some(
                                                                (el) => el === e.name
                                                            )}
                                                            textButton={e.name}
                                                            funcReverseData={(
                                                                data
                                                            ) =>
                                                                handleActivitiesButtons(
                                                                    data
                                                                )
                                                            }
                                                   
                                                        />
                                                    </View>
                                                );
                                            })}
                                    </View>
                                    <View
                                        style={
                                            isActiveErrorPostActivities &&
                                            styles.errorMessageContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                isActiveErrorPostActivities
                                                    ? styles.errorTxt
                                                    : styles.hideContent
                                            }
                                        >
                                            Champ requis *
                                        </Text>
                                    </View>

                                    <Text style={globalStyle.subtitle}>
                                        Types d'hebergements *
                                    </Text>
                                    <View style={styles.wrapper}>
                                        {tabLodgings &&
                                            tabLodgings.map((e) => {
                                                return (
                                                    <View key={e._id}>
                                                        <ToggleButton
                                                            isPressed={postLodgings.some(
                                                                (el) => el === e.name
                                                            )}
                                                            textButton={e.name}
                                                            funcReverseData={(
                                                                data
                                                            ) =>
                                                                handleLodgingsButtons(
                                                                    data
                                                                )
                                                            }
                                                            id={e._id}
                                                        />
                                                    </View>
                                                );
                                            })}
                                    </View>
                                    <View
                                        style={
                                            isActiveErrorPostLodgings &&
                                            styles.errorMessageContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                isActiveErrorPostLodgings
                                                    ? styles.errorTxt
                                                    : styles.hideContent
                                            }
                                        >
                                            Champ requis *
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.CenteredView }>
                                    <View style={styles.datePickers}>
                                        <Text style={styles.labelDatePicker}>
                                            Disponibilités*
                                        </Text>
                                        <View
                                            style={styles.containerDatePickers}
                                        >
                                            <View style={styles.datePicker}>
                                                <Text
                                                    style={
                                                        styles.labelCalendar
                                                    }
                                                >
                                                    Date de début*
                                                </Text>
                                                <ModalDatePicker
                                                    titleModal="Date de début"
                                                    current={startDate}
                                                    selectedDate={startDate}                                                 
                                                
                                                    recupDate={(dateFrom) =>
                                                        recupDateFrom(dateFrom)
                                                    }
                                                />
                                            </View>
                                            <View style={styles.datePicker}>
                                                <Text
                                                    style={
                                                        styles.labelCalendar
                                                    }
                                                >
                                                    Date de fin*
                                                </Text>
                                                <ModalDatePicker
                                                    titleModal="Date de fin"
                                                    currentDate={endDate}
                                                    selectedDate={endDate}
                                                 
                                                    recupDate={(dateTo) =>
                                                        recupDateTo(dateTo)
                                                    }
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.dispoDates}>
                                            <Text style={styles.date}>
                                                Du {startDate}
                                            </Text>
                                            <Text style={styles.date}>
                                                au {endDate}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.sectionContainer}>
                                    <View style={styles.wrapper}>
                                        <Input
                                            labelTxt="Nombre d'enfant(s) *"
                                            onChangeText={(value) =>
                                                handleCounterChild(value)
                                            }
                                            defaultValue={counterChild.toString()}
                                            
                                            type={"counter"}
                                        />
                                    </View>
                                    <View
                                        style={
                                            isActiveErrorCounterChild &&
                                            styles.errorMessageContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                isActiveErrorCounterChild
                                                    ? styles.errorTxt
                                                    : styles.hideContent
                                            }
                                        >
                                            Champ requis *
                                        </Text>
                                    </View>

                                    <View style={styles.wrapper}>
                                        <Input
                                            labelTxt="Nombre d'animateur(s) *"
                                            onChangeText={(value) =>
                                                handleCounterAnim(value)
                                            }
                                            defaultValue={counterAnim.toString()}
                                            
                                            type={"counter"}
                                        />
                                    </View>
                                    <View
                                        style={
                                            isActiveErrorCounterAnim &&
                                            styles.errorMessageContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                isActiveErrorCounterAnim
                                                    ? styles.errorTxt
                                                    : styles.hideContent
                                            }
                                        >
                                            Champ requis *
                                        </Text>
                                    </View>
                                </View>
                                <PrimaryButton
                                actionOnPress= {props.editing ?  editForm : handleForm }
                                    textBtn= {props.editing ? "Enregistrer les changements" : "Publier une annonce"}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#281C47",
    },

    scrollView: {
        flex: 1,
        backgroundColor: "#281C47",
    },

    logoContainer: {
        justifyContent: "center",
        width: "100%",
        marginHorizontal: 30,
    },

    contentContainer: {
        margin: 25,
    },

    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    safeAreaContainer: {
        flex: 1,
    },

    titleSection: {
        fontSize: 20,
        color: "#FFF",
        marginBottom: 10,
    },

    sectionContainer: {
        marginBottom: 30,
    },

    uploadImageWrapper: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    dateContainer: {
        // flexDirection: "row",
        // alignItems: "center",
    },

    date: {
        marginLeft: 20,
        color: "#FFF",
        fontSize: 20,
    },

    counter: {
        color: "#FFF",
        fontSize: 20,
        marginHorizontal: 10,
    },

    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },

    choiceLabel: {
        color: "#281c47",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 20,
        backgroundColor: "#FAD4D8",
        borderRadius: 10,
        padding: 10,
    },

    CenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
      },

    labelCalendar: {
        color:'#fff',
        fontSize: 16,
        
        marginBottom: 25,
      },

    containerDatePickers: {
        marginTop: 20,
        flexDirection: "row",
        height: 80,
        width: "100%",
    },

    datePickers: {
        backgroundColor:'#53496B',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: "#fff",
        borderRadius: 5,
        height: 200,
        marginBottom: 20,
        width: "100%",
        padding: 5,
        color: "#fff",
    
      },

      labelDatePicker: {
        color: "#fff",
        fontSize: 14,
        
        top: -6,
        zIndex: 100,
        backgroundColor: "#53496B",
        position:'absolute',
        paddingHorizontal: 3,
        
    },

    datePicker: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        width: "35%",
    },

    dispoDates: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 40,
    },

    date: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        margin: 10,
    },

    errorMessageContainer: {
        backgroundColor: "red",
        width: "100%",
        height: 20,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 2,
        justifyContent: "center",
    },

    errorTxt: {
        color: "#fff",
    },

    hideContent: {
        display: "none",
    },
});
