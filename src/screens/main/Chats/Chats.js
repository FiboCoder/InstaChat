import React, {useEffect, useState} from "react";
import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import Constants  from "expo-constants";
import { AntDesign } from '@expo/vector-icons';
import { ChatItem } from "../../../components/ChatItem";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Chats(props){

    let names = ['allan', 'david'];

    const [chatsList, setChatsList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                let chatsArray = [];

                const chatsQuery = collection(db, "users", user.email, "chats");
                onSnapshot(chatsQuery, (chats)=>{

                    setRefreshing(true);
                    chatsArray = [];
                    setRefreshing(false);

                    if(!chats.empty){

                        setRefreshing(true);

                        chats.forEach(chat=>{

                            chatsArray.push(chat.data());
                        });

                        setChatsList(chatsArray);
                        setRefreshing(false);
                    }else{


                    }
                });


            }else{


            }
        });
    },[]);

    const renderChatItem = ({item}) =>{

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

            <View style={{height: '100%', padding: 26, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>

                <View style={{flex: 1, marginBottom: 10, marginTop: 60, marginBottom: 4, marginLeft: 4, marginRight: 4, flexDirection: 'column'}}>
                    <FlatList inverted contentContainerStyle={{flexDirection: 'column-reverse', paddingLeft: 6, paddingRight: 6}} data={chatsList} renderItem={renderChatItem} keyExtractor={(item)=>messagesList.indexOf(item)} refreshing={refreshing}/>
                </View>
                
            </View>
        </View>
    );
}