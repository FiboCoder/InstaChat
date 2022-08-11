import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from "../../utils/firebase";
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

            <View>

                <Text>Cadastrar</Text>
            </View>

            <View style={styles.textFields}>

                <FontAwesome name="envelope-o" size={20} color="#616161" />
                <TextInput onChangeText={(val)=>setEmail(val)} style={{marginStart: 12, width: '100%'}} placeholder="E-mail" value={email}></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#616161" />
                <TextInput secureTextEntry={true} onChangeText={(val)=>setPassword(val)} style={{marginStart: 8, width: '100%'}} placeholder="Senha" value={password}></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#616161" />
                <TextInput secureTextEntry={true} onChangeText={(val)=>setConfirmPassword(val)} style={{marginStart: 8, width: '100%'}} placeholder="Confirmar senha" value={confirmPassword}></TextInput>
            </View>

            <View style={{width: '100%', marginTop: 40, alignItems: 'center'}}>

                {loginError ? <Text style={{color: '#ff0000'}}>{loginError}</Text> : <Text style={{display: 'none'}}></Text>}
                
                <TouchableOpacity onPress={doAuth} style={{width: '100%', marginTop: 10, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#304FFE'}}>

                    <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>

                <Text>Já tem conta? </Text>
                <Text onPress={()=> navigation.navigate('LoginApp')} style={{color: '#304FFE'}}>Entrar</Text>
                <Text>.</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer:{

        flex:1,
        marginTop: Constants.statusBarHeight,
        padding: 10,
        backgroundColor: "white"

    },

    textFields:{

        flexDirection: "row",
        backgroundColor: 'white',
        marginTop: 20,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 1,
        elevation: 6
    }
})