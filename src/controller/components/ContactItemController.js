import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ContactItem } from "../../components/ContactItem";
import { db } from "../../utils/firebase";

const ContactItemController = (props) =>{

    const [contactData, setContactData] = useState([]);

    const contactQuery = doc(db, "users", props.contact.email);

    const contactSnapshot = onSnapshot(contactQuery, (contactData)=>{

        setContactData(contactData.data());
    });

    const doWhenPress = () => {

        let selectedUsersList = props.groupList;

        if(selectedUsersList.includes(props.contact.email)){


            if(props.selectedQuantity > 0){

                props.setSelectedQuantity(props.selectedQuantity - 1);
            }
            props.setGroupList(selectedUsersList.filter(email=>{

                return email != props.contact.email
            }))

        }else{

            selectedUsersList.push(props.contact.email);
            props.setSelectedQuantity(props.selectedQuantity + 1);
            props.setGroupList(selectedUsersList)

        }

    }

    return(

        
        <ContactItem
    
            route={props.route}

            contactData={contactData}

            doWhenPress={doWhenPress}

            meEmail={props.meEmail}

            groupUsersList={props.groupUsersList}
        ></ContactItem>
    );
}

export default ContactItemController;