import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatItemController from "../../components/ChatItemController";
import Chats from "../../../screens/main/Chats/Chats"
import { db } from "../../../utils/firebase";

const ChatsController = (props) =>{

    const [chatsList, setChatsList] = useState([]);

    useEffect(()=>{

        const chatsQuery = collection(db, "users", props.meEmail, "chats");
        const chatsSnapshot = onSnapshot(chatsQuery, (chats)=>{

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

        return ()=>{

            console.log("cleaning");
            chatsSnapshot();
            console.log("cleaned");
        }
    },[]);

    const renderChatItem = ({item}) =>{
        
        return <ChatItemController meEmail={props.meEmail} chat={item} ></ChatItemController>
    }

    return(

        <Chats
        
            renderChatItem={renderChatItem}
            chatsList={chatsList}
        ></Chats>
    );
}

export default ChatsController;