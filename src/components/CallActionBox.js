import { StyleSheet, View, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from "react";

export const CallActionBox = () =>{

    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);

    const onReverseCamera = () =>{

        console.warn("REVERSE CAMERA");
    }

    const onToggleCamera = () =>{

        console.warn("TOGGLE CAMERA");
        setIsCameraOn(!isCameraOn);

    }

    const onToggleMicrophone = () =>{

        console.warn("TOGGLE MICROPHONE");
        setIsMicrophoneOn(!isMicrophoneOn);

    }

    const onHangup = () =>{

        console.warn("HANGUP");

    }

    return(

        <View style={styles.buttonsContainer}>

            <Pressable onPress={()=>{onReverseCamera()}} style={styles.iconButtonContainer}>
                <Ionicons name="ios-camera-reverse" size={24} color="white" />
            </Pressable>
                
            <Pressable onPress={()=>{onToggleCamera()}} style={styles.iconButtonContainer}>

                {

                    isCameraOn 

                        ?
                            <MaterialCommunityIcons name="camera-off" size={24} color="white"/>
                        :
                            <FontAwesome5 name="camera" size={24} color="white"/>
                }
            </Pressable>

            <Pressable onPress={()=>{onToggleMicrophone()}} style={styles.iconButtonContainer}>
                <MaterialCommunityIcons name={isMicrophoneOn ? "microphone-off" : "microphone"} size={24} color="white" />
            </Pressable>

            <Pressable onPress={()=>{onHangup()}} style={[styles.iconButtonContainer, {backgroundColor: 'red'}]}>
                <MaterialIcons name="call-end" size={24} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    buttonsContainer:{

        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2196F3',
        width: '100%',
        padding: 26,
        paddingBottom: 40,
        backgroundColor: '#333333',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        
    },

    iconButtonContainer:{

        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50,
    }
});