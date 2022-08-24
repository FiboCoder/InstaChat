import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const ContactItem = () =>{

    return(

        <View style={{flex: 1, marginBottom: 24}}>
            <TouchableOpacity style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>

                <View style={{width: 58, height: 58, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                <AntDesign name="user" size={24} color="white" />

                </View>

                <View style={{marginLeft: 26, width: '100%'}}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: '#1E1E1E'}}>Nome de usuário</Text>
                    <Text style={{fontSize: 14, color: '#5E5E5E'}}>Sobre mim...</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    );
}