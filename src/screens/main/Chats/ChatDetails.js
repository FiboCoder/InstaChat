import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ChatBoxMessageBlue, ChatBoxMessageLightGray } from '../../../components/ChatBoxItem';
import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../utils/firebase';

import { Message } from '../../../model/Message'
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { User } from '../../../model/User';


export default function ChatDetails(props){

    const navigation = useNavigation();
    const route = useRoute();

    const [contactData, getContactData] = useState(route.params.data);
    const [userData, getUserData] = useState('');

    //Message states
    const [messageContent, setMessageContent] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [meEmail, setMeEmail] = useState('');
    const [firstMessage, setFirstMessage] = useState(true);

    //State to controll screen updates
    const [refreshing, setRefreshing] = useState(true);

    

    //Function to recover messages list

    //Function to send a message
    const sendMessage = () =>{

        console.log(meEmail)


        let message = new Message();
        message.setMessage(messageContent);
        message.setStatus('waiting');
        message.setFrom(meEmail);
        message.setType('text');

        let messageObj = {

            content: messageContent,
            status: 'waiting',
            from: meEmail,
            type: 'text'
        }
        message.sendMessage(route.params.data.email, meEmail).then(result=>{

        });
        setMessageContent('');
        Keyboard.dismiss();

        
    }

    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                setMeEmail(user.email);

                const chatsQuery = query(collection(db, "users", user.email, "chats"));
                onSnapshot(chatsQuery, (chats)=>{

                    if(!chats.empty){
        
                        chats.forEach((chat)=>{

                            //Get messages if chat exists
        
                            if(chat.data().users.contactEmail == route.params.data.email && chat.data().users.meEmail == user.email){

                                let messagesArray = [];
                                const messagesQuery = query(collection(db, "users", user.email, "chats", chat.id, "messages"));
                                onSnapshot(messagesQuery, (messages)=>{

                                        setRefreshing(true);
                                        messagesArray = [];
                                        setRefreshing(false);
        
                                    if(!messages.empty){

                                        setRefreshing(true);
        
                                        messages.forEach(message=>{

                                            if(!message.data().from == user.email){

                                                const messageRef = doc(db, "users", user.email, "chats", chat.id, "messages", message.id);
                                                updateDoc(messageRef, {

                                                    status: 'received'
                                                });
                                            }
        
                                            messagesArray.push(message.data());
                                        });

                                        let sortedArray = messagesArray.sort((a, b)=>{

                                            return a.time - b.time;
                                        })
                                        setMessagesList(sortedArray);
                                        setRefreshing(false);
        
                                    }else{
        
                                        setMessagesList(messagesList);
                                        setRefreshing(true);
                                        setRefreshing(false);
                                    }
                                });
        
                            }else{
                            }
                        });
                    }else{
                    }

                });
            }else{


            }
        });

        
    }, []);


    let userName = 'Nome de usuário';
    let profileImage = '../../../../assets/images/mal.png';

    //Function to conditional rendering of the message box
    const renderMessageBox = ({item}) =>{
        
        if(item.from == meEmail){

            return <ChatBoxMessageBlue message={item}></ChatBoxMessageBlue>
        }else{

            return <ChatBoxMessageLightGray message={item}></ChatBoxMessageLightGray>

        }
    }

    return(

        <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

            <View style={{zIndex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: -10, backgroundColor: '#1565C0'}}>
                
                <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}}>

                    <AntDesign  name="arrowleft" size={26} color="white" />
                </TouchableOpacity>

                <View style={{alignItems: 'center', marginLeft: 96, marginRight: 96,}}>

                    <Text numberOfLines={1} style={{color: 'white', fontSize: 18, fontWeight: '600'}}>{userName}</Text>
                    <View style={{marginTop: 10}}>
                        {profileImage === '' ?
                            
                            <View style={{width: 80, height: 80, marginBottom: -40, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                                <FontAwesome5 style={{shadowColor: '#000000', elevation: 4}} name="user" size={30} color="white" />
                            </View>
                            :

                            <Image style={{width: 80, height: 80, marginBottom: -40}} source={require(profileImage)}></Image>
                            
                        }
                    </View>
                </View>

                <TouchableOpacity style={{position: 'absolute', right: 0, marginLeft: 10}}>

                    <Entypo name="dots-three-vertical" size={26} color="white" />
                </TouchableOpacity>

                
            </View>

            <View style={{flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>

                

                <View style={{flex: 1, marginBottom: 10, marginTop: 60, marginBottom: 4, marginLeft: 4, marginRight: 4, flexDirection: 'column'}}>
                    <FlatList inverted contentContainerStyle={{flexDirection: 'column-reverse', paddingLeft: 6, paddingRight: 6}} data={messagesList} renderItem={renderMessageBox} keyExtractor={(item)=>messagesList.indexOf(item)} refreshing={refreshing}/>
                </View>

                <View style={{marginBottom: 6, flexDirection: 'row', width: '100%'}}>

                    <View style={{
                        flex: 1, 
                        width: '100%', 
                        flexDirection: 'row', 
                        marginLeft: 4, 
                        marginRight: 2, 
                        borderRadius: 30, 
                        padding: 8, 
                        backgroundColor: '#D9D9D9', 
                        alignItems: 'center', 
                        shadowColor: '#000000', 
                        elevation: 3}}>

                        <TouchableOpacity style={{marginLeft: 6}}>

                            <Entypo  name="emoji-happy" size={24} color="#4B4B4B" />
                        </TouchableOpacity>
                        
                        <TextInput onSubmitEditing={Keyboard.dismiss} onChangeText={(message)=>setMessageContent(message)} style={{flex: 1, marginLeft: 10}} placeholder='Mensagem...'>{messageContent}</TextInput>

                        <TouchableOpacity style={{marginLeft: 6, marginRight: 6}}>
                            <Entypo name="attachment" size={24} color="#4B4B4B" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginRight: 8}}>
                            <Entypo name="camera" size={24} color="#4B4B4B" />
                        </TouchableOpacity>
                        
                    </View>

                    <View style={{marginRight: 4}}>

                        <TouchableOpacity

                            onPress={()=>{sendMessage()}}
                        
                            style={{
                                padding: 14, 
                                marginLeft: 2, 
                                borderRadius: 50, 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: '#1565C0',
                                shadowColor: '#000000',
                                elevation: 3}}>

                            <FontAwesome name="send" size={24} color="white" />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                
            </View>
        </View>
    );
}