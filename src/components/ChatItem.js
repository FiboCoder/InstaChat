import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

export const ChatItem = (props)=>{

    const navigation = useNavigation();

    const [contactData, setContactData] = useState([]);
    
    useEffect(()=>{

        const contactRef = doc(db, "users", props.chat.data().users[0]);
        onSnapshot(contactRef, (contactData)=>{
    
            setContactData(contactData.data());
        });
    },[]);

    const render = () => {

        if(props.chat.type == "single"){

            return <View style={{flex: 1}}>

                        <TouchableOpacity onPress={()=>{navigation.navigate('ChatDetails', {data: props.chat, contactInfo: contactData})}} style={{flexDirection: 'row', alignItems: 'center',}}>
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
                                    <Text style={{color: '#5E5E5E'}}>Last Message</Text>
                                </View>

                                <View style={{alignSelf: 'flex-start'}}>
                                    
                                    <Text style={{color: '#1E1E1E', fontSize: 14}}>00:00 AM</Text>

                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
        }else{

            return <View style={{flex: 1}}>

                        <TouchableOpacity onPress={()=>{navigation.navigate('ChatDetails', {data: props.chat})}} style={{flexDirection: 'row', alignItems: 'center',}}>
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
                                    <Text style={{color: '#5E5E5E'}}>Last Message</Text>
                                </View>

                                <View style={{alignSelf: 'flex-start'}}>
                                    
                                    <Text style={{color: '#1E1E1E', fontSize: 14}}>00:00 AM</Text>

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