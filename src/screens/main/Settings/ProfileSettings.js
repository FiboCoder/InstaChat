import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";


export const ProfileSettings = () =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <TouchableOpacity onPress={()=>{navigation.goBack()}}>

                    <AntDesign  name="arrowleft" size={30} color="#4A4A4A" />
                </TouchableOpacity>

                <TouchableOpacity>

                    <Foundation name="pencil" size={30} color="#4A4A4A" />
                </TouchableOpacity>
            </View>

            <View style={styles.subTopContainer}>

                <Pressable>
                    <View style={styles.profileImageContainer}>
                        <AntDesign name="user" size={40} color="white" />
                    </View>
                </Pressable>
                
            </View>

            <View style={styles.divider}></View>

            <View style={styles.usernameContainer}>

                <View style={styles.usernameIconContainer}>
                    <AntDesign  name="user" size={36} color="#4A4A4A" />
                </View>

                <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                    <View style={styles.username}>
                        <Text style={styles.usernameText}>Nome do Usuário</Text>
                        <TouchableOpacity>
                            <Foundation name="pencil" size={24} color="#4A4A4A" />
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.divider}></View>

                </View>
                               
            </View>


            <View style={styles.aboutMeContainer}>

                <View style={styles.aboutMeIconContainer}>
                    <Foundation name="lightbulb" size={36} color="black" />
                </View>

                <View style={{flex: 1, width: '100%', marginLeft: 20,}}>

                    <View style={styles.aboutMe}>
                        <Text style={styles.aboutMeText}>Sobre mim...</Text>
                        <TouchableOpacity>
                            <Foundation name="pencil" size={24} color="#4A4A4A" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider}></View>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        alignItems: 'center',
        padding: 16,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: 'white'
    },

    topContainer:{

        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    subTopContainer:{

        alignItems: 'center',
        justifyContent: 'center'
    },

    profileImageContainer:{

        height: 120,
        width: 120,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A4A4A4'
    },

    usernameContainer:{

        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    username:{

        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    usernameIconContainer:{

        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center'
    },

    usernameText:{},

    aboutMeContainer:{

        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'

    },

    aboutMe:{

        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    aboutMeIconContainer:{

        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center'
    },

    aboutMeText:{},

    divider:{

        width: '100%',
        height: 1,
        marginTop: 30,
        backgroundColor: '#e0e0e0'
    },
});

export default ProfileSettings;