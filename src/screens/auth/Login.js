import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

export default function Login(){

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

                }).catch(err=>{
        
                    setLoginError("Erro ao cadastrar usuário, tente novamente.");
                });
        
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

                <Text>Entrar</Text>
            </View>

            <View style={styles.textFields}>

                <FontAwesome name="envelope-o" size={20} color="#616161" />
                <TextInput onChangeText={(val)=>setEmail(val)} style={{marginStart: 12, width: '100%'}} placeholder="E-mail" value={email}></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#616161" />
                <TextInput secureTextEntry={true} onChangeText={(val)=>setPassword(val)} style={{marginStart: 8, width: '100%'}} placeholder="Senha" value={password}></TextInput>
            </View>


            <View style={{width: '100%', marginTop: 40, alignItems: 'center'}}>

            {loginError ? <Text style={{color: '#ff0000'}}>{loginError}</Text> : <Text style={{display: 'none'}}></Text>}

            <TouchableOpacity onPress={doLogin} style={{width: '100%', marginTop: 10, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#304FFE'}}>

                <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Entrar</Text>
            </TouchableOpacity>
            </View>

            <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>

                <Text>Não tem conta? </Text>
                <Text onPress={()=> navigation.navigate('RegisterApp')} style={{color: '#304FFE'}}>Cadastre-se</Text>
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