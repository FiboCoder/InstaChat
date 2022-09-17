import React, {useEffect, useState} from "react";
import { Image, View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Constants  from "expo-constants";
import { AntDesign } from '@expo/vector-icons';
import { ChatItem } from "../../../components/ChatItem";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Chats(){

    const [chatsList, setChatsList] = useState([]);


    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                const chatsQuery = collection(db, "users", user.email, "chats");
                onSnapshot(chatsQuery, (chats)=>{

                    if(!chats.empty){

                        let chatsArray = [];

                        chats.forEach(chat=>{

                            chatsArray.push(chat);
                        });

                        setChatsList(chatsArray);
                        
                    }else{

                        setChatsList([]);
                    }
                });


            }else{

                setChatsList([]);
            }
        });
    },[]);

    const renderChatItem = ({item}) =>{

        console.log(item.id)
        return <ChatItem chat={item} ></ChatItem>
    }


    return(

        <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 30, backgroundColor: '#1565C0'}}>
                <Image style={{marginStart: 10, width: 50, height: 50}} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                <Text style={{marginStart: 10,  color: 'white', fontSize: 24, fontWeight: '700'}}>Conversas</Text>
                <TouchableOpacity style={{position: 'absolute', right: 0, marginEnd: 10}}>
                    <AntDesign  name="search1" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{height: '100%', padding: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>

                <View style={{flex: 1, marginBottom: 10, marginTop: 20, marginBottom: 4, marginLeft: 4, marginRight: 4, flexDirection: 'column'}}>
                    <FlatList data={chatsList} renderItem={renderChatItem} keyExtractor={(item)=>chatsList.indexOf(item)}/>
                </View>
                
            </View>
        </View>
    );
}