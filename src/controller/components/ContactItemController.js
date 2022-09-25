import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { ContactItem } from "../../components/ContactItem";
import { db } from "../../utils/firebase";

const ContactItemController = (props) =>{

    const [contactData, setContactData] = useState([]);
    const [selected, setSelected] = useState(false);

    const contactQuery = doc(db, "users", props.contact.email);
    onSnapshot(contactQuery, (contactData)=>{

        setContactData(contactData.data());
    });

    const doWhenPress = () => {


        if(!selected){

            setSelected(!selected);
            props.setSelectedQuantity(props.selectedQuantity + 1);
            props.groupUsersList.push(props.contact.email);

            props.setGroupList(props.groupUsersList);
            

        }else{

            setSelected(!selected);

            if(props.selectedQuantity > 0){

                props.setSelectedQuantity(props.selectedQuantity - 1);

                let list = props.groupList;

                props.setGroupList([]);
                props.setGroupList(list.filter(email=>{

                    return email != props.contact.email;

                }));
            }
        } 

    }

    return(

        <ContactItem
        
            route={props.route}

            selected={selected}

            contactData={contactData}

            doWhenPress={doWhenPress}
        ></ContactItem>
    );
}

export default ContactItemController;