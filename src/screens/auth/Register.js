import React, { useState } from "react";

import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, Pressable} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import ModalImageOptions from "../../components/ModalImageOptions";

const Register = (props) =>{

    const navigation = useNavigation();

    const [step, setStep] = useState("first");

    next = () =>{

        setStep("second");
    }

    previous = () =>{

        setStep("first");
        
    }

    renderSteps = () =>{

        if(step == "first"){

            return (

                <>
                    <Image resizeMode={'center'} resizeMethod={'auto'} source={require('../../../assets/images/logo_text.png')}></Image>

                    <View>

                        <Text style={styles.title}>Cadastre-se</Text>
                    </View>

                    <View style={styles.textFields}>

                        <FontAwesome name="envelope-o" size={20} color="#5E5E5E" />
                        <TextInput onChangeText={(val)=>props.setEmail(val)} style={styles.textInput} placeholder="E-mail" value={props.email}></TextInput>
                    </View>

                    <View style={styles.textFields}>

                        <AntDesign name="lock" size={24} color="#5E5E5E" />
                        <TextInput secureTextEntry={true} onChangeText={(val)=>props.setPassword(val)} style={styles.textInput} placeholder="Senha" value={props.password}></TextInput>
                    </View>

                    <View style={styles.textFields}>

                        <AntDesign name="lock" size={24} color="#5E5E5E" />
                        <TextInput secureTextEntry={true} onChangeText={(val)=>props.setConfirmPassword(val)} style={styles.textInput} placeholder="Confirmar senha" value={props.confirmPassword}></TextInput>
                    </View>

                    {props.registerError ? <Text style={{marginTop: 20, color: '#ff0000'}}>{props.registerError}</Text> : <Text style={{display: 'none'}}></Text>}

                    <View style={styles.buttonsContainer}>

                        
                        <TouchableOpacity onPress={()=>{next()}} style={styles.nextButtonContainer}>

                            <Text style={styles.nextButtonText}>Avançar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )


        }else if(step == "second"){

            return (

                <>
                    <Image resizeMode={'center'} resizeMethod={'auto'} source={require('../../../assets/images/logo_text.png')}></Image>

                    <View>

                        <Text style={styles.title}>Cadastre-se</Text>
                    </View>

                    <Pressable onPress={()=>{props.getImageModal()}}>

                        {

                            props.image != ''

                                ?
                                    <Image style={styles.imageProfileContainer} source={{uri: props.image}}></Image>
                                    
                                :
                                    <View style={styles.iconProfileContainer}>
                                        <AntDesign name="user" size={40} color="white" />
                                    </View>

                        }

                        

                    </Pressable>

                    <View style={styles.textFields}>

                        <FontAwesome name="envelope-o" size={20} color="#5E5E5E" />
                        <TextInput onChangeText={(val)=>props.setUsername(val)} style={styles.textInput} placeholder="Nome de usuário" value={props.username}></TextInput>
                    </View>

                    <View style={styles.textFields}>

                        <FontAwesome name="envelope-o" size={20} color="#5E5E5E" />
                        <TextInput onChangeText={(val)=>props.setAboutMe(val)} style={styles.textInput} placeholder="Sobre mim..." value={props.aboutMe}></TextInput>
                    </View>


                    {props.registerError ? <Text style={{color: '#ff0000'}}>{props.registerError}</Text> : <Text style={{display: 'none'}}></Text>}

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity onPress={()=>{previous()}} style={styles.previousButtonContainer}>

                            <Text style={styles.previousButtonText}>Voltar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>{props.register()}} style={styles.registerButtonContainer}>

                            <Text style={styles.registerButtonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
    }

    return(

        <View style={styles.container}>

            <View style={styles.mainContainer}>

                {

                    renderSteps()
                }

                <View style={styles.bottomContainer}>

                    <Text style={{fontSize: 16}}>Já tem conta? </Text>
                    <Text onPress={()=> navigation.navigate('LoginScreen')} style={{color: '#304FFE', fontSize: 16}}>Entrar</Text>
                    <Text style={{fontSize: 16}}>.</Text>

                </View>

            </View>

            <ModalImageOptions

                isVisible={props.isVisible}
                setIsVisible={props.setIsVisible}
                getImageFromCamera={props.getImageFromCamera}
                getImageFromGallery={props.getImageFromGallery}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1
    },

    mainContainer:{

        flex:1,
        height: '100%',
        paddingBottom: 10,
        paddingStart: 14,
        paddingEnd: 10,
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white"

    },

    title:{

        marginTop: 30,
        marginBottom: 20, 
        color: '#1565C0', 
        fontSize: 22, 
        fontWeight: '800'
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

    buttonsContainer:{

        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, 
        alignItems: 'center', 
        paddingStart: 5, 
        paddingEnd: 5
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

    registerButtonContainer:{

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

    registerButtonText:{
        
        alignSelf: 'center', 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '700'
    },

    bottomContainer:{
        
        marginTop: 50, 
        alignSelf: 'center', 
        flexDirection: 'row'
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
    }

    
});

export default Register;