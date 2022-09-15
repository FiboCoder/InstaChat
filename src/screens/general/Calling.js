import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { CallActionBox } from '../../components/CallActionBox';
import  Constants  from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RTCView } from 'react-native-webrtc';


const Calling = () =>{

    const navigation = useNavigation();
    const route = useRoute();

    console.log("LOCALSTREAM"+route.params.localStream)

    return(
        <View style={styles.container}>

            {route.params.localStream != null
            ?
            <View>
                <RTCView mirror={true} objectFit={'cover'} streamURL={route.params.localStream.toURL()}></RTCView>
            </View>
            
            :
            <View></View>
            }
            


                <View style={styles.topContainer}>

                    <TouchableOpacity style={{borderRadius: 50, padding: 10}}>
                        <AntDesign onPress={()=>{navigation.goBack()}}  name="arrowleft" size={26} color="white" />
                    </TouchableOpacity>

                    <View style={styles.userInfo}>

                        {

                            route.params.contactData.profileImage == ''

                                ?

                                    <View style={styles.profileImage}>
                                        <FontAwesome5 style={{shadowColor: '#000000', elevation: 4}} name="user" size={30} color="#4A4A4A" />
                                    </View>
                                :

                                    <Image style={{width: 80, height: 80}} source={{uri: route.params.contactData.profileImage}}></Image>
                        }
                        
                        <Text style={styles.text}>{route.params.contactData.username}</Text>
                        <Text style={[styles.text, {fontSize: 16, fontWeight: 'normal', marginTop: 10}]}>Chamando</Text>
                    </View>
                </View>

                <CallActionBox/>


        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        width: '100%',
        height: '100%'
    },

    cameraPreview:{

        flex: 1,
        height: '100%',
        backgroundColor: '#2196F3',
        alignItems: 'center'
    },

    topContainer:{

        flex: 1,
        width: '100%',
        paddingTop: Constants.statusBarHeight + 10
    },

    userInfo:{

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    profileImage:{

        width: 80, 
        height: 80, 
        borderRadius: 50, 
        backgroundColor: 'white', 
        alignItems: "center", 
        justifyContent: 'center'
    },

    text:{

        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },

    buttonsContainer:{

        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
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

export default Calling;