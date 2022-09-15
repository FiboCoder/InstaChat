import React, { useState } from "react";
import { LogBox, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants  from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../model/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { AntDesign } from '@expo/vector-icons';


export default function AddContact(){

    LogBox.ignoreAllLogs(true);


    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addContact = () =>{

        let meEmail = '';

        onAuthStateChanged(auth, (user)=>{

            if(user){

                meEmail = user.email;

                if(email == meEmail){

                    errorMessage('Você não pode adicionar a si mesmo como um contato!')
                }else{

                    User.addContact(email, meEmail).then(result=>{
        
                        navigation.goBack()
                    });
                }

            }else{

                errorMessage('Erro ao adicionar contato, tente novamente!')
            }

        });


        
    }

    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.goBackButton}>
                    <AntDesign  name="arrowleft" size={26} color="black" />
                </TouchableOpacity>

                <Text style={styles.addContactText}>Adiconar Contato</Text>
            </View>
            
            <Text style={styles.headlineText}>Insira abaixo o e-mail do contato:</Text>
            
            {errorMessage ? <Text style={{color: '#ff0000'}}>{errorMessage}</Text> : <Text style={{display: 'none'}}></Text>}
            
            <TextInput onChangeText={(email)=>{setEmail(email)}} style={styles.textInput} placeholder="E-mail..."></TextInput>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.cancelButton}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{addContact()}} style={styles.confirmButton}>
                    <Text style={{color: 'white', fontWeight: '600'}}>Adicionar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container:{

        flex: 1, 
        paddingTop: Constants.statusBarHeight+30, 
        paddingLeft: 20, 
        paddingRight: 20, 
        backgroundColor: 'white'
    },

    topContainer:{

        flexDirection: 'row',
        alignItems: 'center'
    },

    addContactText:{

        flex: 1, 
        fontSize: 26, 
        fontWeight: '700', 
        textAlign: 'center'
    },

    headlineText:{

        marginTop: 40, 
        marginBottom: 20
    },

    textInput:{

        width: '100%', 
        backgroundColor: '#E6E6E6', 
        padding: 12, 
        borderRadius: 30, 
        marginTop: 10
    },

    buttonsContainer:{

        flexDirection: 'row', 
        alignSelf: 'flex-end', 
        alignItems: 'center', 
        marginTop: 30
    },

    cancelButton:{

        marginRight: 20, 
        padding: 10, 
        borderRadius: 10,
    },

    confirmButton:{

        backgroundColor: '#2196F3', 
        padding: 10, 
        borderRadius: 10,
        elevation: 4
    }
})