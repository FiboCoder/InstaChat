import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo-constants';

const IncomingCall = () =>{

    const onDecline = () =>{

        console.warn("On Decline Pressed");
    }

    const onAccept = () =>{

        console.warn("On Accept Pressed");
    }

    return(

        <View style={styles.container}>

            <ImageBackground style={styles.background} source={require('../../../assets/images/incomingcall_background.png')}>

                <View style={styles.topContainer}>

                    <AntDesign  name="arrowleft" size={26} color="white" />

                    <Text style={styles.username}>Name</Text>
                    <Text >Instachat Video</Text>

                </View>


                <View style={styles.buttonsContainer}>

                    <MaterialCommunityIcons name="message" size={24} color="black" />

                    {/* DECLINE BUTTON */}

                    <Pressable onPress={()=>{onDecline()}}>
                        <View>

                            <View style={[styles.iconButtonContainer, {backgroundColor: 'red'}]}>
                                <AntDesign name="close" size={32} color="black" />
                            </View>
                            <Text style={styles.iconText}>Recusar</Text>
                        </View>
                    </Pressable>

                    {/* ACCEPT BUTTON */}

                    <Pressable onPress={()=>{onAccept()}}>
                        <View>

                            <View style={[styles.iconButtonContainer, {backgroundColor: '#2196F3'}]}>
                                <Ionicons name="checkmark-sharp" size={32} color="black" />
                            </View>
                            <Text style={styles.iconText}>Aceitar</Text>
                        </View>
                    </Pressable>
                </View>

            </ImageBackground>

        </View>
    );

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        width: '100%',
        height: '100%'
    },

    background:{

        flex: 1,
    },

    topContainer:{

        height: '100%'
    },

    username:{

        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },

    buttonsContainer:{

        width: '100%',
        justifyContent: 'space-between'
    },

    iconsRow:{

        justifyContent: 'center'
    },

    iconButtonContainer:{

        padding: 10,
        borderRadius: 50
    },

    iconText:{

        merginTop: 10,
        color: 'white',
        fontSize: 16
    }


});

export default IncomingCall;