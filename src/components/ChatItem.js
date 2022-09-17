import React, { useEffect, useState } from "react";
import { TabRouter, useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Format } from '../utils/Format';

export const ChatItem = (props)=>{

    const navigation = useNavigation();

    const [contactData, setContactData] = useState([]);

    if(props.chat.data().type == "single"){

        const contactRef = doc(db, "users", props.chat.data().users[0]);
        onSnapshot(contactRef, (contactData)=>{
    
            setContactData(contactData.data());
        });
    }else{


    }

    const render = () => {

        if(props.chat.data().type == "single"){

            return <View style={{flex: 1}}>

                        <TouchableOpacity onPress={()=>{navigation.navigate('ChatDetails', {data: props.chat.data(), chatId: props.chat.id, contactData: contactData, route: "Chat_Single"})}} style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View>
                                    {
                                    
                                        contactData.profileImage == '' 
                                        
                                        ?
                                        
                                            <View style={{width: 58, height: 58, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                                                <FontAwesome5 name="user" size={24} color="white" />
                                            </View>
                                        :

                                            <Image style={{width: 58, height: 58}} source={{uri: contactData.profileImage}}></Image>
                                    
                                    }
                            </View>
                    

                            <View style={{flex: 1,flexDirection: 'row', marginStart: 16}}>
                                <View style={{flex: 1, marginRight: 20}}>

                                    <Text numberOfLines={1} style={{color: '#1E1E1E', fontSize: 18, fontWeight: '700'}}>{contactData.username}</Text>
                                    <Text style={{color: '#5E5E5E'}}>{props.chat.data().lastMessage.content}</Text>
                                </View>

                                <View style={{alignSelf: 'flex-start'}}>
                                    
                                    <Text style={{color: '#1E1E1E', fontSize: 14}}>{Format.timeStampToTime(props.chat.data().lastMessage.time)}</Text>

                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
        }else{

            return <View style={{flex: 1}}>

                        <TouchableOpacity onPress={()=>{navigation.navigate('ChatDetails', {data: props.chat.data(), chatId: props.chat.id, route: "Chat_Group"})}} style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View>
                                    {
                                    
                                        props.chat.data().groupProfileImage == '' 
                                        
                                        ?
                                        
                                            <View style={{width: 58, height: 58, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                                                <FontAwesome5 name="user" size={24} color="white" />
                                            </View>
                                        :

                                            <Image style={{width: 58, height: 58}} source={{uri: props.chat.data().groupProfileImage}}></Image>
                                    
                                    }
                            </View>
                    

                            <View style={{flex: 1,flexDirection: 'row', marginStart: 16}}>
                                <View style={{flex: 1, marginRight: 20}}>

                                    <Text numberOfLines={1} style={{color: '#1E1E1E', fontSize: 18, fontWeight: '700'}}>{props.chat.data().groupName ? props.chat.data().groupName : "Nome do grupo"}</Text>
                                    <Text style={{color: '#5E5E5E'}}>{props.chat.data().lastMessage.content}</Text>
                                </View>

                                <View style={{alignSelf: 'flex-start'}}>
                                    
                                    <Text style={{color: '#1E1E1E', fontSize: 14}}>{Format.timeStampToTime(props.chat.data().lastMessage.time)}</Text>

                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
        }
    }

    return(

        <View style={{flex: 1, marginBottom: 24}}>
            {render()}
        </View>
    );
}