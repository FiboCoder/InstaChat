import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import { collection, addDoc } from "firebase/firestore";
import { User } from "../../model/User";
import { auth } from "../../utils/firebase";


const Register = () =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.mainContainer}>

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

            <View style={styles.buttonContainer}>

                {props.loginError ? <Text style={{color: '#ff0000'}}>{props.loginError}</Text> : <Text style={{display: 'none'}}></Text>}
                
                <TouchableOpacity onPress={props.register} style={styles.tbButtonContainer}>

                    <Text style={styles.registerButtonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>

                <Text style={{fontSize: 16}}>Já tem conta? </Text>
                <Text onPress={()=> navigation.navigate('Login')} style={{color: '#304FFE', fontSize: 16}}>Entrar</Text>
                <Text style={{fontSize: 16}}>.</Text>

            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1
    },

    mainContainer:{

        flex:1,
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

    buttonContainer:{

        width: '100%', 
        marginTop: 30, 
        alignItems: 'center', 
        paddingStart: 5, 
        paddingEnd: 5
    },

    tbButtonContainer:{

        width: '100%', 
        marginTop: 10, 
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 14,
        paddingBottom: 14, 
        borderRadius: 30, 
        backgroundColor: '#2196F3', 
        shadowColor: '#000000', 
        elevation: 4
    
    },

    registerButtonText:{
        
        alignSelf: 'center', 
        color: 'white', 
        fontSize: 20, 
        fontWeight: '700'
    },

    bottomContainer:{
        
        marginTop: 50, 
        alignSelf: 'center', 
        flexDirection: 'row'
    },

    
});

export default Register;