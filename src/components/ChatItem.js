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

        const contactRef = doc(db, "users", props.chat.users[0]);
        onSnapshot(contactRef, (contactData)=>{
    
            setContactData(contactData.data());
        });
    },[]);

    return(

        <View style={{flex: 1, marginBottom: 24}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('ChatDetails', {data: contactData})}} style={{flexDirection: 'row', alignItems: 'center',}}>
                <View>0

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
    );
}