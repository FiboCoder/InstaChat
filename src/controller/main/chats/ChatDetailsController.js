import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatDetails from "../../../screens/main/Chats/ChatDetails";
import { auth, db } from "../../../utils/firebase";
import { Message } from "../../../model/Message";
import { Keyboard } from "react-native";

const ChatDetailsController = (props) =>{

    const navigation = useNavigation();
    const route = useRoute();

    //Permissions
    const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();

    const [snapshot, setSnapShot] = useState();

    //Message states
    const [messageContent, setMessageContent] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [meEmail, setMeEmail] = useState('');
    const [chatId, setChatId] = useState();

    const [modalVisibility, setModalVisibility] = useState(false);
    const [menuModalVisibility, setMenuModalVisibility] = useState(false);
    const [item, setItem] = useState(false);

    //Request permissions
    const requestCameraPermission = async () =>{

        if(cameraPermission.granted){

            if(route.params.route == "Contact_List"){

                navigation.navigate("ChatsApp", {
                    
                    screen: "CameraChatsApp",

                    params:{

                        contactEmail: route.params.contactData.email,
                        meEmail: route.params.meEmail,
                        chatId: chatId,
                        route: "Contact_List"
                    }
                });
            }else if(route.params.route == "Chat_Single"){

                navigation.navigate("ChatsApp", {
                    
                    screen: "CameraChatsApp",

                    params:{
                        
                        contactEmail: route.params.contactData.email,
                        meEmail: route.params.meEmail,
                        chatId: chatId,
                        route: "Chat_Single"
                    }
                });

            }else if(route.params.route == "Chat_Group"){

                navigation.navigate("ChatsApp", {
                    
                    screen: "CameraChatsApp",

                    params:{
                        
                        contactEmail: route.params.contactData.email,
                        meEmail: route.params.meEmail,
                        chatId: chatId,
                        route: "Chat_Group"
                    }
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
            message.setFrom(route.params.meEmail);
            message.setType('text');

            if(route.params.route == "Contact_List"){

                message.sendMessage(route.params.contactData.email, route.params.meEmail, "", "Contact_List").then(result=>{
    
                });
                setMessageContent('');
                Keyboard.dismiss();
            }else if(route.params.route == "Chat_Single"){

                message.sendMessage(route.params.contactData.email, route.params.meEmail, route.params.chatId, "Chat_Single").then(result=>{
    
                });
                setMessageContent('');
                Keyboard.dismiss();

            }else if(route.params.route == "Chat_Group"){

                message.sendMessageToGroup(route.params.meEmail, route.params.data.users, route.params.chatId).then(result=>{
    
                });
                setMessageContent('');
                Keyboard.dismiss();
            }
        }
    }

    useEffect(()=>{


        //Listen 'Chats'
        const chatsQuery = query(collection(db, "users", route.params.meEmail, "chats"));
        const snapshot = onSnapshot(chatsQuery, (chats)=>{

            if(!chats.empty){

                chats.forEach((chat)=>{

                    //Get messages if chat exists

                    if(route.params.route == "Contact_List"){

                        if(chat.data().users[0] == route.params.contactData.email && chat.data().users[1] == route.params.meEmail){

                            setChatId(chat.id);

                            //Listen 'Messages'
                            const messagesQuery = query(collection(db, "users", route.params.meEmail, "chats", chat.id, "messages"));
                            onSnapshot(messagesQuery, (messages)=>{

                                let messagesArray = [];
    
                                if(!messages.empty){

                                    messages.forEach((message, index)=>{

                                        //Check if message is from contact
                                        if(message.data().from !== route.params.meEmail){

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
                    }else if(route.params.route == "Chat_Single" || route.params.route == "Chat_Group"){

                        if(chat.id == route.params.chatId){

                            setChatId(chat.id);

                            //Listen 'Messages'
                            const messagesQuery = query(collection(db, "users", route.params.meEmail, "chats", chat.id, "messages"));
                            onSnapshot(messagesQuery, (messages)=>{

                                let messagesArray = [];
    
                                if(!messages.empty){

                                    messages.forEach((message, index)=>{

                                        //Check if message is from contact
                                        if(message.data().from !== route.params.meEmail){

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

        return ()=> {
            console.log("clean")
            snapshot()
            console.log("cleaned")
        }

        
    }, []);

    const openVoiceCallScreen = () => {

        console.log("Voice call");
        setMenuModalVisibility(false);

    }

    const openVideoCallScreen = () => {

        console.log("Video call");
        setMenuModalVisibility(false);
    }

    return(

        <ChatDetails

            route={route.params.route}
            contactData={route.params.contactData}
            data={route.params.data}

            setMessageContent={setMessageContent}

            setModalVisibility={setModalVisibility}
            setMenuModalVisibility={setMenuModalVisibility}
            setItem={setItem}

            messageContent={messageContent}

            modalVisibility={modalVisibility}
            menuModalVisibility={menuModalVisibility}
            item={item}
            messagesList={messagesList}
            meEmail={route.params.meEmail}

            sendMessage={sendMessage}
            requestCameraPermission={requestCameraPermission}
        
            openVideoCallScreen={openVideoCallScreen}
            openVoiceCallScreen={openVoiceCallScreen}
        ></ChatDetails>
    );
}

export default ChatDetailsController;