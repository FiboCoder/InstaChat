import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants  from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import ModalImageOptions from "../../../components/ModalImageOptions";

const CreateGroup = (props) => {

    const navigation = useNavigation();

    const [step, setStep] = useState("first");

    const next = () =>{

        setStep("second");
    }

    const previous = () =>{

        setStep("first")
    }

    renderSteps = () =>{

        if(step == "first"){

            return <FlatList renderItem={props.renderContactItem} data={props.contactsList} keyExtractor={(item)=>props.contactsList.indexOf(item)} refreshing={props.refreshing} onRefresh={()=>{props.refreshing}}/>

        }else if(step == "second"){

            return <View style={styles.subMainContainer}>

                <Pressable onPress={()=>{props.getImageModal()}}>
                    {

                        props.image != ''

                            ?
                                <Image style={styles.imageProfileContainer} source={{uri: props.image}}/>
                            :
                                <View style={styles.iconProfileContainer}>
                                    <AntDesign name="user" size={40} color="white" />
                                </View>
                    }
                </Pressable>

                <View style={styles.textFields}>

                    <AntDesign  name="user" size={24} color="#4A4A4A" />    
                    <TextInput onChangeText={(val)=>props.setGroupName(val)} style={styles.textInput} placeholder="Nome do grupo" value={props.groupName}></TextInput>
                </View>

                <View style={styles.textFields}>

                    <Foundation name="lightbulb" size={24} color="black" />
                    <TextInput onChangeText={(val)=>props.setAboutGroup(val)} style={styles.textInput} placeholder="Sobre o grupo..." value={props.aboutGroup}></TextInput>
                </View>
            </View>
        }
    }

    const renderButtons = () =>{

        if(step == "first" & props.selectedQuantity > 0){

            return <TouchableOpacity onPress={()=>{next()}} style={styles.nextButtonContainer}>
                    <Text style={styles.nextButtonText}>Avançar</Text>
                </TouchableOpacity>
        }else if(step == "second" & props.selectedQuantity > 0){

            return <View style={styles.buttonsContainer}>

                    <TouchableOpacity onPress={()=>{previous()}} style={styles.previousButtonContainer}>
                        <Text style={styles.previousButtonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{props.saveGroup()}} style={styles.createGroupButtonContainer}>
                        <Text style={styles.createGroupButtonText}>Criar Grupo</Text>
                    </TouchableOpacity>
                </View>
        }
    }

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <View style={styles.topContainer}>

                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.goBackButton}>
                        <AntDesign  name="arrowleft" size={26} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.addContactText}>Criar Grupo</Text>

                </View>

                {
                props.selectedQuantity > 0

                    ?
                        <Text style={styles.headlineText}>{props.selectedQuantity} {props.selectedQuantity > 1 ? 'participantes' : 'participante'} {props.selectedQuantity > 1 ? 'selecionados' : 'selecionado'}.</Text>
                        
                    :
                        <Text style={styles.headlineText}>Selecione os participantes do grupo:</Text>

            }
            </View>
            
            <View style={styles.mainContainer}>

                {
                    renderSteps()
                }
                {
                    renderButtons()
                }
            </View>
        
            
            
            
            <ModalImageOptions
            
                setIsVisible={props.setIsVisible}
                isVisible={props.isVisible}

                getImageFromCamera={props.getImageFromCamera}
                getImageFromGallery={props.getImageFromGallery}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: '#1565C0'
    },

    headerContainer:{

        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: '#1565C0'
    },

    topContainer:{

        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    addContactText:{

        flex: 1, 
        fontSize: 26, 
        fontWeight: '700', 
        textAlign: 'center',
        color: 'white'
    },

    headlineText:{

        marginTop: 20, 
        marginBottom: 20,
        marginLeft: 20,
        color: 'white'
    },

    buttonsContainer:{

        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },

    previousButtonContainer:{

        marginTop: 20, 
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14,
        paddingBottom: 14, 
        borderRadius: 10, 
        borderWidth: 1,
        borderColor: '#2196F3',
    
    },

    nextButtonContainer:{

        width: "100%",
        marginTop: 40, 
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 14,
        paddingBottom: 14, 
        borderRadius: 30, 
        backgroundColor: '#2196F3', 
        shadowColor: '#000000', 
        elevation: 4
    
    },

    createGroupButtonContainer:{

        marginTop: 10, 
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 14,
        paddingBottom: 14, 
        borderRadius: 10, 
        backgroundColor: '#2196F3', 
        shadowColor: '#000000', 
        elevation: 4
    },

    previousButtonText:{

        alignSelf: 'center',
        color: '#2196F3',
        fontSize: 16, 
        fontWeight: '600'
    },

    nextButtonText:{

        alignSelf: 'center', 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '700'
    },

    createGroupButtonText:{
        
        alignSelf: 'center', 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '700'
    },

    mainContainer:{

        flex: 1,
        height: '100%',
        padding: 20,
        paddingTop: 30,
        backgroundColor: 'white',
        elevation: 4
    },

    subMainContainer:{

        flex: 1,
        height: '100%',
        alignItems: 'center'
    },  

    iconProfileContainer:{

        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: '#A4A4A4'
    },

    imageProfileContainer:{

        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },

    textInput:{

        marginStart: 12, 
        width: '100%'
    },

    textFields:{

        flexDirection: "row",
        backgroundColor: '#E6E6E6',
        marginTop: 14,
        marginStart: 20,
        marginEnd: 20,
        paddingStart: 14,
        paddingEnd: 10,
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: "center",
        borderRadius: 30
    },

})

export default CreateGroup;