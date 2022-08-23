import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants  from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export default function AddContact(){

    const navigation = useNavigation();

    const addContact = () =>{

        
    }

    return(

        <View style={{flex: 1, paddingTop: Constants.statusBarHeight+30, paddingLeft: 20, paddingRight: 20, backgroundColor: 'white'}}>

            <Text style={{fontSize: 26, fontWeight: '700'}}>Adiconar Contato</Text>
            <Text style={{marginTop: 40, marginBottom: 20}}>Insira abaixo o e-mail do contato:</Text>
            <TextInput style={{width: '100%', backgroundColor: '#E6E6E6', padding: 12, borderRadius: 30}} placeholder="E-mail..."></TextInput>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginRight: 20, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#2196F3'}}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{addContact}} style={{backgroundColor: '#2196F3', padding: 10, borderRadius: 10}}>
                    <Text style={{color: 'white', fontWeight: '600'}}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}