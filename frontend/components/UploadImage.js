import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import Svg, { Path } from "react-native-svg";

import * as ImagePicker from "expo-image-picker";

export default function UploadImage(props) {
    const [hasPermission, setHasPermission] = useState(false);
    const [image, setImage] = useState("");
    const [defaultImage, setDefaultImage] = useState('');


    useEffect(()=> {
        if(props.defaultImage){
            setDefaultImage(props.defaultImage)

        }
        },[props]);

        console.log(defaultImage)

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photo,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            props.onUpdate(result.assets[0].uri);
        }
    };

    const deleteImage = () => {
        setImage('')
        setDefaultImage('')
        props.onUpdate('');
    }

    if (!hasPermission) {
        return (
            <View>
                <Text>Autorisation requise</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            onPress={() => pickImage()}
        >
            {image || props.defaultImage ? (
                <Svg
                    onPress={() => deleteImage()}
                    style={styles.addButton}
                    viewBox="0 0 24 24"
                    width="35"
                    height="35"
                    fill="#FAD4D8"
                >
                    <Path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
                </Svg>
            ) : (
                <Svg
                    onPress={() => pickImage()}
                    style={styles.addButton}
                    viewBox="0 0 24 24"
                    width="35"
                    height="35"
                    fill="#FAD4D8"
                >
                    <Path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </Svg>
            )}

            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
                source={
                    defaultImage
                        ? { uri: defaultImage }
                        : !image
                        ? require("../assets/placeholderImage.jpg")
                        : { uri: image }
                }
            ></ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        margin: 10,
    },

    imageBackground: {
        width: 80,
        height: 80,
        borderRadius: 5,
        overflow: "hidden",
    },

    addButton: {
        top: 10,
        left: 65,
        zIndex: 100,
    },
});
