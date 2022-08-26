import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const ContactItem = (props) =>{

    const navigation = useNavigation();

    return(

        <View style={{flex: 1, marginBottom: 24}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("ChatsApp", {screen: 'ChatDetails', params: {data: props.data}})}} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>

                {
                    props.data.profileImage !== ''

                    ?
                        <View style={{width: 58, height: 58, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF3000'}}>

                            <AntDesign name="user" size={24} color="white" />

                        </View>
                    :

                        <View style={{width: 58, height: 58, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                            <AntDesign name="user" size={24} color="white" />

                        </View>

                }
                

                <View style={{marginLeft: 26, width: '100%'}}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: '#1E1E1E'}}>{props.data.username}</Text>
                    <Text style={{fontSize: 14, color: '#5E5E5E'}}>{props.data.username}</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    );
}