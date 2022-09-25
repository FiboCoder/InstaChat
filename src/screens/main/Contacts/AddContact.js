import React, {  } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { AntDesign } from '@expo/vector-icons';

import Constants  from "expo-constants";
import { useNavigation } from "@react-navigation/native";


export default function AddContact(props){

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.goBackButton}>
                    <AntDesign  name="arrowleft" size={26} color="black" />
                </TouchableOpacity>

                <Text style={styles.addContactText}>Adiconar Contato</Text>
            </View>
            
            <Text style={styles.headlineText}>Insira abaixo o e-mail do contato:</Text>
            
            {props.errorMessage ? <Text style={{color: '#ff0000'}}>{props.errorMessage}</Text> : <Text style={{display: 'none'}}></Text>}
            
            <TextInput onChangeText={(email)=>{props.setEmail(email)}} style={styles.textInput} placeholder="E-mail..." value={props.email}></TextInput>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.cancelButton}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{props.addContact()}} style={styles.confirmButton}>
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