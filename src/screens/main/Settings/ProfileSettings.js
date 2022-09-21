import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import ModalImageOptions from "../../../components/ModalImageOptions";
import ModalText from "../../../components/ModalText";


export const ProfileSettings = (props) =>{

    const navigation = useNavigation();

    const renderModal = () =>{

        if(props.modalRoute == "Image"){

            return <ModalImageOptions 
                        setIsVisible={props.setIsVisible} 
                        isVisible={props.isVisible} 
                        getImageFromCamera={props.getImageFromCamera}
                        getImageFromGallery={props.getImageFromGallery}
                    />
        }else if(props.modalRoute == "Username"){

            return <ModalText

                        setIsVisible={props.setIsVisible}
                        isVisible={props.isVisible}
                        modalTextData={props.changeUsernameData}
                        saveName={props.saveName}
                        route={"Username"}
                    />
        }else if(props.modalRoute == "AboutMe"){

            return <ModalText

                        setIsVisible={props.setIsVisible}
                        isVisible={props.isVisible}
                        modalTextData={props.changeAboutMeData}
                        saveAboutMe={props.saveAboutMe}
                        route={"AboutMe"}

                    />
        }
    }

    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <TouchableOpacity onPress={()=>{navigation.goBack()}}>

                    <AntDesign  name="arrowleft" size={30} color="#4A4A4A" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{props.getImageModal()}}>

                    <Foundation name="pencil" size={30} color="#4A4A4A" />
                </TouchableOpacity>
            </View>

            <View style={styles.subTopContainer}>


                <Pressable>
                    {
                        props.userData.data().profileImage != ""

                            ?

                                <Image source={{uri: props.userData.data().profileImage}} style={styles.profileImage}/>
                            :

                                <View style={styles.profileImageContainer}>
                                    <AntDesign name="user" size={40} color="white" />
                                </View>
                    }
                    
                </Pressable>
                
            </View>

            <View style={styles.divider}></View>

            <View style={styles.usernameContainer}>

                <View style={styles.usernameIconContainer}>
                    <AntDesign  name="user" size={36} color="#4A4A4A" />
                </View>

                <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{props.userData.data().username != "" ? props.userData.data().username : "Nome do usuário"}</Text>
                        <TouchableOpacity onPress={()=>{props.changeUsernameText()}}>
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
                        <Text numberOfLines={2} style={styles.aboutMeText}>{props.userData.data().aboutMe != "" ? props.userData.data().aboutMe : "Sobre mim..."}</Text>
                        <TouchableOpacity onPress={()=>{props.changeAboutMeText()}}>
                            <Foundation name="pencil" size={24} color="#4A4A4A" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider}></View>

                </View>

            </View>

            {

                renderModal()
                
            }

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

    profileImage:{

        height: 120, 
        width: 120,
        borderRadius: 100
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