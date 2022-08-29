import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useState, useContext, createContext } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigation } from "@react-navigation/native";

export default function Login(props){


    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const doLogin = ()=>{

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                setLoginError('');
    
                signInWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
    
                    const user = userCredeantial.user;

                    setEmail('');
                    setPassword('');
                    props.signIn({email});
                    console.log("SUCESSO"+user.uid)

                }).catch(err=>{
        
                    console.log(err)
                    setLoginError("Erro ao fazer login, tente novamente.");
                });
        
            }else{
    
                setLoginError("Preencha o campo Senha.");
                
            }
        }else{

            setLoginError("Preencha o campo E-mail.");

        }
    }

    /*const doLoginWithGoogle = ()=>{

    }

    const doLoginWithFacebook = ()=>{

    }*/

    return(

        <View style={styles.mainContainer}>

            <Image resizeMode={'center'} resizeMethod={'auto'} source={require('../../../assets/images/logo_text.png')}></Image>

            <View>

                <Text style={{marginTop: 30, marginBottom: 20, color: '#1565C0', fontSize: 22, fontWeight: '800'}}>Entrar</Text>
            </View>

            <View>

                <View style={styles.textFields}>

                    <FontAwesome name="envelope-o" size={20} color="#616161" />
                    <TextInput onChangeText={(val)=>setEmail(val)} style={{marginStart: 12, width: '100%'}} placeholder="E-mail" value={email}></TextInput>
                </View>

                <View style={styles.textFields}>

                    <AntDesign name="lock" size={24} color="#616161" />
                    <TextInput secureTextEntry={true} onChangeText={(val)=>setPassword(val)} style={{marginStart: 8, width: '100%'}} placeholder="Senha" value={password}></TextInput>
                </View>

                <View>

                    <Text style={{

                        alignSelf: 'flex-end',
                        marginTop: 10,
                        marginEnd: 30

                    }}>Esqueceu a senha ?</Text>
                </View>
            </View>

            


            <View style={{width: '100%', marginTop: 30, alignItems: 'center', paddingStart: 5, paddingEnd: 5}}>

                {loginError ? <Text style={{color: '#ff0000'}}>{loginError}</Text> : <Text style={{display: 'none'}}></Text>}
                
                <TouchableOpacity onPress={doLogin} style={{

                    width: '100%', 
                    marginTop: 10, 
                    paddingStart: 10,
                    paddingEnd: 10,
                    paddingTop: 14,
                    paddingBottom: 14, 
                    borderRadius: 30, 
                    backgroundColor: '#2196F3', 
                    shadowColor: '#000000', 
                    elevation: 4}}>

                    <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '700'}}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 30, marginBottom: 30}}>

                <Text style={{fontSize: 16}}>ou acesse com</Text>
            </View>
            {/*
            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity onPress={doLoginWithGoogle} style={{marginEnd: 30, borderRadius: 50, backgroundColor: 'white'}}>

                    <Image style={{backgroundColor: 'white', width: 56, height: 56}} resizeMode={'cover'} resizeMethod={'resize'} source={require('../../../assets/images/google144x144.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={{marginStart: 30}}>

                    <Image style={{backgroundColor: 'white', width: 58, height: 58}} resizeMode={'cover'} resizeMethod={'resize'} source={require('../../../assets/images/facebook144x144.png')}></Image>
                </TouchableOpacity>
            </View>
                */}

            <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>

                <Text style={{fontSize: 16}}>Não tem conta? </Text>
                <Text onPress={()=> navigation.navigate('Register')} style={{color: '#304FFE', fontSize: 16}}>Cadastre-se</Text>
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
    }
})