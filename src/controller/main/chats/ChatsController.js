import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatItemController from "../../components/ChatItemController";
import Chats from "../../../screens/main/Chats/Chats"
import { auth, db } from "../../../utils/firebase";

const ChatsController = () =>{

    const [chatsList, setChatsList] = useState([]);
    const [meEmail, setMeEmail] = useState();

    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                setMeEmail(user.email);

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
        
        return <ChatItemController meEmail={meEmail} chat={item} ></ChatItemController>
    }

    return(

        <Chats
        
            renderChatItem={renderChatItem}
            chatsList={chatsList}
        ></Chats>
    );
}

export default ChatsController;