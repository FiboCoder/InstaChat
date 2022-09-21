import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export const PersonalInfoSettings = (props) =>{

    const navigation = useNavigation();


    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <TouchableOpacity onPress={()=>{navigation.goBack()}}>

                    <AntDesign  name="arrowleft" size={30} color="white" />
                </TouchableOpacity>

                <Text style={styles.personalInformationText}>Informações Pessoais</Text>
            </View>

            <View style={styles.mainContainer}>

                <View style={styles.emailContainer}>

                    <View style={styles.emailIconContainer}>
                        <FontAwesome5 name="envelope" size={36} color="#4A4A4A" />
                    </View>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <View style={styles.email}>
                            <Text style={styles.emailText}>{props.userData.data().email != "" ? props.userData.data().email : "E-mail..."}</Text>
                            <TouchableOpacity>
                                <Foundation name="pencil" size={24} color="#4A4A4A" />
                            </TouchableOpacity>
                        </View> 
                        <View style={styles.divider}></View>

                    </View>
                        
                </View>

                <View style={styles.passContainer}>

                    <View style={styles.passIconContainer}>
                        <Entypo name="lock" size={40} color="#4A4A4A" />
                    </View>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <View style={styles.pass}>
                            <Text style={styles.passText}>Senha</Text>
                            <TouchableOpacity>
                                <Foundation name="pencil" size={24} color="#4A4A4A" />
                            </TouchableOpacity>
                        </View> 
                        <View style={styles.divider}></View>

                    </View>
                        
                </View>
            </View>

            

        </View>

    );


}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: 'white'
    },

    topContainer:{

        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: 20,
        backgroundColor: '#1565C0'
    },

    mainContainer:{

        flex: 1,
        padding: 16,
        paddingTop: 20
    },

    personalInformationText:{

        marginLeft: 30,
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
    },

    emailContainer:{

        flexDirection: 'row',
        alignItems: 'center'
    },

    email:{

        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    emailIconContainer:{

        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center'
    },

    emailText:{

    },

    passContainer:{

        flexDirection: 'row',
        alignItems: 'center'
    },

    pass:{

        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    passIconContainer:{

        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center'
    },

    passText:{

    },

    divider:{

        width: '100%',
        height: 1,
        marginTop: 30,
        backgroundColor: '#e0e0e0'
    }
});