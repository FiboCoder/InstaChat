import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { ChatItem } from "../../components/ChatItem";
import { db } from "../../utils/firebase";

const ChatItemController = (props) =>{

    const [contactData, setContactData] = useState([]);

    if(props.chat.data().type == "single"){

        const contactRef = doc(db, "users", props.chat.data().users[0]);
        onSnapshot(contactRef, (contactData)=>{
    
            setContactData(contactData.data());
        });
    }else{

    }

    return(

        <ChatItem

            chat={props.chat}
            
            contactData={contactData}

        ></ChatItem>
    )
}

export default ChatItemController;