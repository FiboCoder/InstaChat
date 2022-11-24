import React, {useState} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import LoadingBar from "../../../components/LoadingBar";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function Settings(props){

    console.log(props.userData.data())

    const navigation = useNavigation();

    return(

        <View style={{flex: 1}}>
            <View style={{paddingTop: Constants.statusBarHeight,  backgroundColor: '#1565C0'}}>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 30, backgroundColor: '#1565C0'}}>
                    <Image style={{marginStart: 10, width: 50, height: 50}} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                    <Text style={{marginStart: 10,  color: 'white', fontSize: 24, fontWeight: '700'}}>Configurações</Text>
                    <TouchableOpacity style={{position: 'absolute', right: 0, marginEnd: 10}}>
                        <AntDesign  name="search1" size={26} color="white" />
                    </TouchableOpacity>
                </View>

                
                <View style={styles.mainContainer}>

                    <TouchableOpacity onPress={()=>{navigation.navigate("ProfileSettingsScreen", {userData: props.userData})}}>

                        <View style={styles.userContainer}>

                            {

                                props.userData && props.userData.data().profileImage != ""
                                    
                                    ?
                                        <Image style={styles.profileImage} resizeMode={"cover"} source={{uri: props.userData.data().profileImage}}/>
                                    :
                                        <View style={styles.profileImageContainer}>
                                            <AntDesign name="user" size={34} color="white" />
                                        </View>
                            }

                            

                            <View style={styles.profileDataContainer}>

                                <Text style={styles.username}>{props.userData && props.userData.data().username != "" ? props.userData.data().username : "Nome do usuário" }</Text>
                                <Text numberOfLines={2} style={styles.aboutMe}>{props.userData && props.userData.data().aboutMe != "" ? props.userData.data().aboutMe : "Sobre mim..."}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    <View style={styles.divider}/>

                    <TouchableOpacity onPress={()=>{navigation.navigate("PersonalInfoSettingsScreen", {userData: props.userData})}}>

                        <View style={styles.personalInfoContainer}>

                            <View style={styles.personalInfoIconContainer}>
                                <AntDesign name="user" size={26} color="#4A4A4A" />
                            </View>

                            <View style={styles.personalInfoDataContainer}>

                                <Text style={styles.title}>Informações Pessoais</Text>
                                <Text style={styles.subtitle}>Conversas</Text>
                                <View style={styles.divider}/>

                            </View>

                        </View>

                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{navigation.navigate("ChatsSettingsScreen")}}>

                        <View style={styles.chatsContainer}>

                            <View style={styles.chatsIconContainer}>
                                <Ionicons name="chatbox" size={46} color="#4A4A4A" />
                            </View>

                            <View style={styles.chatsDataContainer}>

                                <Text style={styles.title}>Conversas</Text>
                                <Text style={styles.subtitle}>Vizualização, mídia, controles</Text>
                                <View style={styles.divider}/>

                            </View>
                        </View>
                    </TouchableOpacity>

                    
                </View>
            </View>

            { props.loading ? <LoadingBar/> : null }
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer:{

        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 26,
        backgroundColor: 'white'

    },

    userContainer:{

        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    profileImage:{

        height: 80,
        width: 80,
        borderRadius: 100

    },

    profileImageContainer:{

        borderRadius: 50,
        height: 80,
        width: 80,
        backgroundColor: '#A4A4A4',
        alignItems: 'center',
        justifyContent: 'center'
    },

    profileDataContainer:{

        flex: 1,
        marginLeft: 36
    },

    username:{

        fontSize: 18,
        fontWeight: '700',
        color: '#4A4A4A'
    },

    aboutMe:{

        marginTop: 6,
        color: '#4A4A4A'
    },

    divider:{

        height: 1,
        marginTop: 20,
        backgroundColor: '#e0e0e0'
    },

    personalInfoContainer:{

        width: '100%',
        marginTop: 26,
        flexDirection: 'row',
        alignItems: 'center'
    },

    personalInfoIconContainer:{

        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#4A4A4A',
        justifyContent: 'center',
        alignItems: 'center'
    },

    personalInfoDataContainer:{

        flex: 1,
        marginLeft: 30
    },

    chatsContainer:{

        width: '100%',
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },

    chatsIconContainer:{

        width: 54,
        height: 54,
        borderRadius: 50,
        borderColor: '#4A4A4A',
        justifyContent: 'center',
        alignItems: 'center'
    },

    chatsDataContainer:{

        flex: 1,
        marginLeft: 30
    },

    title:{

        fontSize: 16,
        fontWeight: '700',
        color: '#4A4A4A'
    },
    subtitle:{

        color: '#4A4A4A'
    }
});