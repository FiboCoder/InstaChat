import React, {useState} from "react";
import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import Constants  from "expo-constants";
import { AntDesign } from '@expo/vector-icons';
import { ChatItem } from "../../../components/ChatItem";
import { useNavigation } from "@react-navigation/native";

export default function Chats(props){

    let names = ['allan', 'david'];


    return(

        <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 30, backgroundColor: '#1565C0'}}>
                <Image style={{marginStart: 10, width: 50, height: 50}} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                <Text style={{marginStart: 10,  color: 'white', fontSize: 24, fontWeight: '700'}}>Conversas</Text>
                <TouchableOpacity style={{position: 'absolute', right: 0, marginEnd: 10}}>
                    <AntDesign  name="search1" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{height: '100%', padding: 26, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>

                <ScrollView>

                    {names.map((name, k)=>{

                        return <ChatItem key={k} navigation={props.navigationProp} text={name} profileImage={null}></ChatItem>
                    })


                    }
                    
                </ScrollView>
                
            </View>
        </View>
    );
}