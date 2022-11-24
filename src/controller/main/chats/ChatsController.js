import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatItemController from "../../components/ChatItemController";
import Chats from "../../../screens/main/Chats/Chats"
import { db } from "../../../utils/firebase";

const ChatsController = (props) =>{

    const [chatsList, setChatsList] = useState([]);
    const [filteredChatsList, setFilteredChatsList] = useState([]);

    const [searchBarStatus, setSearchBarStatus] = useState(false);

    useEffect(()=>{

        const chatsQuery = collection(db, "users", props.meEmail, "chats");
        const chatsSnapshot = onSnapshot(chatsQuery, (chats)=>{

            if(!chats.empty){

                let chatsArray = [];

                chats.forEach(chat=>{

                    chatsArray.push(chat);
                });

                setChatsList(chatsArray);
                setFilteredChatsList(chatsArray);
                
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

    const filterList = (text)=>{

        if(text != ""){

            let filteredListArray = [];

            chatsList.forEach(chat=>{

                if(chat.data().type.toString() === "single"){

                    getDoc(doc(db, "users", chat.data().users[0])).then(contactData=>{

                        if(contactData.data().username.toLowerCase().includes(text.toLowerCase())){
                            
                            filteredListArray.push(chat);
                        }

                        setFilteredChatsList(filteredListArray);
                    })
                }else{

                    //CHAT TYPE IS GROUP
                }
            });
        }else{

            setFilteredChatsList(chatsList);
        }
    }

    return(

        <Chats
        
            renderChatItem={renderChatItem}
            filteredChatsList={filteredChatsList}

            setSearchBarStatus={setSearchBarStatus}
            searchBarStatus={searchBarStatus}

            filterList={filterList}
        ></Chats>
    );
}

export default ChatsController;