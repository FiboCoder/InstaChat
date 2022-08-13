import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from "../../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';


export default function Register(){

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const doAuth = ()=>{

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                if(confirmPassword.toString() !== ''){

                    if(password.toString() === confirmPassword.toString()){

                        setLoginError("");
            
                        createUserWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
            
                            const user = userCredeantial.user;

                            setEmail('');
                            setPassword('');
                            setConfirmPassword('');

                            navigation.navigate('LoginApp')

                        }).catch(err=>{
                
                            setLoginError("Erro ao cadastrar usuário, tente novamente.");
                        });
            
                    }else{
            
                        setLoginError("As senhas digitadas não conferem!");
                    }
                }else{
        
                    setLoginError("Preencha o campo Confirmar Senha.");
                    
                }
            }else{
    
                setLoginError("Preencha o campo Senha.");
                
            }
        }else{

            setLoginError("Preencha o campo E-mail.");
        }
    }

    return(

        <View style={styles.mainContainer}>

            <Image resizeMode={'center'} resizeMethod={'auto'} source={require('../../../assets/images/logo_text.png')}></Image>

            <View>

                <Text style={{marginTop: 30, marginBottom: 20, color: '#1565C0', fontSize: 22, fontWeight: '800'}}>Cadastre-se</Text>
            </View>

            <View style={styles.textFields}>

                <FontAwesome name="envelope-o" size={20} color="#5E5E5E" />
                <TextInput onChangeText={(val)=>setEmail(val)} style={{marginStart: 12, width: '100%'}} placeholder="E-mail" value={email}></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#5E5E5E" />
                <TextInput secureTextEntry={true} onChangeText={(val)=>setPassword(val)} style={{marginStart: 8, width: '100%'}} placeholder="Senha" value={password}></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#5E5E5E" />
                <TextInput secureTextEntry={true} onChangeText={(val)=>setConfirmPassword(val)} style={{marginStart: 8, width: '100%'}} placeholder="Confirmar senha" value={confirmPassword}></TextInput>
            </View>

            <View style={{width: '100%', marginTop: 30, alignItems: 'center', paddingStart: 5, paddingEnd: 5}}>

                {loginError ? <Text style={{color: '#ff0000'}}>{loginError}</Text> : <Text style={{display: 'none'}}></Text>}
                
                <TouchableOpacity onPress={doAuth} style={{

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

                    <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '700'}}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', bottom: 0, marginBottom: 10, alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>

                <Text style={{fontSize: 16}}>Já tem conta? </Text>
                <Text onPress={()=> navigation.navigate('LoginApp')} style={{color: '#304FFE', fontSize: 16}}>Entrar</Text>
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