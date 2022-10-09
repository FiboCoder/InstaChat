import React, {} from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Constants from 'expo-constants';

const Login = (props) =>{


    const navigation = useNavigation();

    return(

        <View style={styles.mainContainer}>

            <Image resizeMode={'center'} resizeMethod={'auto'} source={require('../../../assets/images/logo_text.png')}></Image>

            <View>

                <Text style={styles.title}>Entrar</Text>
            </View>

            <View>

                <View style={styles.textFields}>

                    <FontAwesome name="envelope-o" size={20} color="#616161" />
                    <TextInput onChangeText={(text)=>props.setEmail(text)} style={styles.textInput} placeholder="E-mail" value={props.email}></TextInput>
                </View>

                <View style={styles.textFields}>

                    <AntDesign name="lock" size={24} color="#616161" />
                    <TextInput secureTextEntry={true} onChangeText={(text)=>props.setPassword(text)} style={styles.textInput} placeholder="Senha" value={props.password}></TextInput>
                </View>

                {/*<View>

                    <Text style={styles.forgetPasswordText}>Esqueceu a senha ?</Text>
                </View>*/}
            </View>

            <View style={styles.buttonContainer}>

                {props.loginError ? <Text style={{color: '#ff0000'}}>{props.loginError}</Text> : <Text style={{display: 'none'}}></Text>}
                
                <TouchableOpacity onPress={props.login} style={styles.tbButtonContainer}>

                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>

                <Text style={{fontSize: 16}}>Não tem conta? </Text>
                <Text onPress={()=> navigation.navigate('RegisterScreen')} style={{color: '#304FFE', fontSize: 16}}>Cadastre-se</Text>
                <Text style={{fontSize: 16}}>.</Text>

            </View>
        </View>
);
}

const styles = StyleSheet.create({

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

    forgetPasswordText:{

        alignSelf: 'flex-end',
        marginTop: 10,
        marginEnd: 30

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

    loginButtonText:{

        alignSelf: 'center', 
        color: 'white', 
        fontSize: 20, 
        fontWeight: '700'
    },

    bottomContainer:{

        alignSelf: 'center', 
        flexDirection: 'row', 
        marginTop: 10
    }
});

export default Login;