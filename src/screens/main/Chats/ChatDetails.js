import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Keyboard, PermissionsAndroid, Modal, TouchableWithoutFeedback, ImageBackground, StyleSheet, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ChatBoxMessageBlue, ChatBoxMessageLightGray, ImageBoxBlue, ImageBoxLightGray } from '../../../components/MessageBoxItem';
import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../utils/firebase';

import { Message } from '../../../model/Message'
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { Camera } from 'expo-camera';
import { Format } from '../../../utils/Format';
import { mediaDevices, MediaStream } from 'react-native-webrtc';
import CallsUtils from '../../../utils/CallsUtils';


export default function ChatDetails(props){

    const navigation = useNavigation();
    const route = useRoute();

    //Permissions
    const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();

    //Message states
    const [messageContent, setMessageContent] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [meEmail, setMeEmail] = useState('');
    const [chatId, setChatId] = useState();

    const [modalVisibility, setModalVisibility] = useState(false);
    const [menuModalVisibility, setMenuModalVisibility] = useState(false);
    const [item, setItem] = useState(false);

    //Video call states
    const [localStream, setLocalStream] = useState(MediaStream | null);
    const [remoteStream, setRemoteStream] = useState(MediaStream | null);
    //Request permissions
    const requestCameraPermission = async () =>{

        if(cameraPermission.granted){

            if(route.params.contactData){

                navigation.navigate('CameraChatsApp', {

                    contactEmail: route.params.contactData.email,
                    meEmail: meEmail,
                    chatId: chatId
                });
            }else{

                navigation.navigate('CameraChatsApp', {

                    contactEmail: route.params.data.id,
                    meEmail: meEmail,
                    chatId: chatId
                });
            }

            
        }else{

            setCameraPermission();
        }
    }

    //Function to send a message
    const sendMessage = () =>{

        if(messageContent == ''){


        }else{

            let message = new Message();
            message.setMessage(messageContent);
            message.setStatus('waiting');
            message.setFrom(meEmail);
            message.setType('text');

            if(route.params.contactData){

                message.sendMessage(route.params.contactData.email, meEmail, "").then(result=>{
    
                });
                setMessageContent('');
                Keyboard.dismiss();
            }else{

                if(route.params.data.data().type == "single"){

                    message.sendMessage("", "", route.params.data.id).then(result=>{
    
                    });
                    setMessageContent('');
                    Keyboard.dismiss();
                }else{

                    message.sendMessage(meEmail, route.params.data).then(result=>{
    
                    });
                    setMessageContent('');
                    Keyboard.dismiss();
                }

                
            }
    
            
            
        }
    }

    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                setMeEmail(user.email);

                //Listen 'Chats'
                const chatsQuery = query(collection(db, "users", user.email, "chats"));
                onSnapshot(chatsQuery, (chats)=>{

                    if(!chats.empty){
        
                        chats.forEach((chat)=>{

                            //Get messages if chat exists

                            if(route.params.contactData){

                                if(chat.data().users[0] == route.params.contactData.email && chat.data().users[1] == user.email){

                                    setChatId(chat.id);
    
                                    //Listen 'Messages'
                                    const messagesQuery = query(collection(db, "users", user.email, "chats", chat.id, "messages"));
                                    onSnapshot(messagesQuery, (messages)=>{
    
                                        let messagesArray = [];
            
                                        if(!messages.empty){
    
                                            messages.forEach((message, index)=>{
    
                                                //Check if message is from contact
                                                if(message.data().from !== user.email){
    
                                                    //Check if status is 'sent' and update status from contact to 'received'
                                                    if(message.data().status === 'sent'){
    
                                                        const messageRef = doc(db, "users", message.data().from, "chats", chat.id, "messages", message.id);
                                                        updateDoc(messageRef, {
        
                                                            status: 'received'
                                                        }).then(result=>{
    
                                                        });
                                                    }
    
                                                    messagesArray.push(message.data());
    
                                                }else{
    
                                                    messagesArray.push(message.data());
                                                }
                                                
                                            });
    
                                            //Sort messages by timestamp
                                            let sortedArray = messagesArray.sort((a, b)=>{
    
                                                return a.time - b.time;
                                            })
                                            setMessagesList(sortedArray);
            
                                        }else{
            
                                            setMessagesList([]);
                                        }
                                    });
            
                                }else{
    
                                    setMessagesList([]);
                                }
                            }else{

                                if(chat.id == route.params.data.id){

                                    setChatId(chat.id);
    
                                    //Listen 'Messages'
                                    const messagesQuery = query(collection(db, "users", user.email, "chats", chat.id, "messages"));
                                    onSnapshot(messagesQuery, (messages)=>{
    
                                        let messagesArray = [];
            
                                        if(!messages.empty){
    
                                            messages.forEach((message, index)=>{
    
                                                //Check if message is from contact
                                                if(message.data().from !== user.email){
    
                                                    //Check if status is 'sent' and update status from contact to 'received'
                                                    if(message.data().status === 'sent'){
    
                                                        const messageRef = doc(db, "users", message.data().from, "chats", chat.id, "messages", message.id);
                                                        updateDoc(messageRef, {
        
                                                            status: 'received'
                                                        }).then(result=>{
    
                                                        });
                                                    }
    
                                                    messagesArray.push(message.data());
    
                                                }else{
    
                                                    messagesArray.push(message.data());
                                                }
                                                
                                            });
    
                                            //Sort messages by timestamp
                                            let sortedArray = messagesArray.sort((a, b)=>{
    
                                                return a.time - b.time;
                                            })
                                            setMessagesList(sortedArray);
            
                                        }else{
            
                                            setMessagesList([]);
                                        }
                                    });
            
                                }else{
    
                                    setMessagesList([]);
                                }
                            }
                        });
                    }else{

                        setMessagesList([]);
                    }

                });
            }else{


            }
        });

        
    }, []);

    const openVoiceCallScreen = () => {

        console.log("Voice call");
        setMenuModalVisibility(false);

    }

    const openVideoCallScreen = () => {

        console.log("Video call");
        setMenuModalVisibility(false);
    }

    //Function to conditional rendering of the message box
    const renderMessageBox = ({item}) =>{
        
        if(item.from == meEmail && item.type == 'text'){

            return <ChatBoxMessageBlue message={item}></ChatBoxMessageBlue>

        }else if(item.from == meEmail && item.type == 'photo'){

            return <Pressable onPress={()=>{setModalVisibility(true), setItem(item)}}><ImageBoxBlue message={item}></ImageBoxBlue></Pressable> 

        }else if(item.from == route.params.data.data().email && item.type == 'text'){

            return <Pressable onPress={()=>{setModalVisibility(true), setItem(item)}}><ChatBoxMessageLightGray message={item}></ChatBoxMessageLightGray></Pressable>

        }else if(item.from == route.params.data.data().email && item.type == 'photo'){

            return <ImageBoxLightGray message={item}></ImageBoxLightGray>

        }
    }

    const renderProfileImage = () => {

        if(route.params.data.data().type == "single"){

            if(route.params.data.data().profileImage == ''){

                return <View style={{width: 80, height: 80, marginBottom: -40, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                    <FontAwesome5 style={{shadowColor: '#000000', elevation: 4}} name="user" size={30} color="white" />
                </View>
            }else{

                return <Image style={{width: 80, height: 80, marginBottom: -40}} source={{uri: route.params.data.data().profileImage}}></Image>
            }
        }else{

            if(route.params.data.data().groupProfileImage == ''){

                return <View style={{width: 80, height: 80, marginBottom: -40, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                    <FontAwesome5 style={{shadowColor: '#000000', elevation: 4}} name="user" size={30} color="white" />
                </View>
            }else{

                return <Image style={{width: 80, height: 80, marginBottom: -40}} source={{uri: route.params.data.data().groupProfileImage}}></Image>
            }
        }
    }

    return(

        <View style={{flex: 1}}>

            {
                modalVisibility
                    ?
                    <View style={{flex: 1}}>
                        <Modal visible={true} animationType="slide">
                            
                            <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: item.content}}>
                                <View style={{flexDirection: 'row', width: '100%', paddingTop: 6, paddingBottom: 6, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                                    <TouchableOpacity onPress={()=>{setModalVisibility(false)}} style={[styles.buttonContainer, {marginLeft: 4, marginTop: 6}]}>
                                        <AntDesign name="close" size={28} color="white" />
                                    </TouchableOpacity>
                                    <View>
                                        
                                    </View>
                                </View>
                            </ImageBackground>
                        </Modal>
                    </View>
                    :
                    null
            }

            <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

                <View style={{zIndex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: -10, backgroundColor: '#1565C0'}}>
                    
                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.buttonContainer, {position: 'absolute', left: 0, marginLeft: 4}]}>

                        <AntDesign  name="arrowleft" size={26} color="white" />
                    </TouchableOpacity>

                    <View style={{alignItems: 'center', marginLeft: 96, marginRight: 96,}}>

                        <Text numberOfLines={1} style={{color: 'white', fontSize: 18, fontWeight: '600'}}>{route.params.data.data().type == "single" ? route.params.data.data().username : route.params.data.data().groupName}</Text>
                        <View style={{marginTop: 10}}>

                            {
                                renderProfileImage()
                            }
                        </View>
                    </View>

                    
                        <TouchableOpacity onPress={()=>{setMenuModalVisibility(true)}} style={[styles.buttonContainer, {position: 'absolute', right: 0, marginLeft: 4}]}>

                            <Entypo name="dots-three-vertical" size={26} color="white" />
                        </TouchableOpacity>

                        <Modal

                            animationType="fade"
                            transparent={true}
                            visible={menuModalVisibility}
                            onRequestClose={()=>{

                                setMenuModalVisibility(false)
                            }}>

                                <View  style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onTouchEnd={()=>{setMenuModalVisibility(false)}}>

                                    <View style={[styles.menuModalContainer]}>

                                        <TouchableOpacity onPress={()=>{openVoiceCallScreen()}} style={styles.menuItemContainer}>
                                            <Ionicons name="call" size={24} color="#4B4B4B" />
                                            <Text style={styles.menuItemText}>Chamada de voz</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>{openVideoCallScreen()}} style={[styles.menuItemContainer, {marginTop: 24}]}>
                                            <FontAwesome name="video-camera" size={24} color="#4B4B4B" />
                                            <Text style={styles.menuItemText}>Chamada de vídeo</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                

                        </Modal>
                    
                    

                    
                </View>

                <View style={{flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>

                    

                    <View style={{flex: 1, marginBottom: 10, marginTop: 60, marginBottom: 4, marginLeft: 4, marginRight: 4, flexDirection: 'column'}}>
                        <FlatList inverted contentContainerStyle={{flexDirection: 'column-reverse', paddingLeft: 6, paddingRight: 6}} data={messagesList} renderItem={renderMessageBox} keyExtractor={(item)=>messagesList.indexOf(item)}/>
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

                            <TouchableOpacity onPress={()=>{requestCameraPermission()}} style={{marginRight: 8}}>
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

            
        </View>
    );
}

const styles = StyleSheet.create({

    buttonContainer:{

        padding: 6,
        borderradius: 50
    },

    menuModalContainer:{

        position: 'absolute',
        right: 0,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 16,
        elevation: 10,

    },
    menuItemContainer:{

        flexDirection: 'row',
        alignItems: 'center'
    },
    menuItemText:{

        marginLeft: 10
    }
})