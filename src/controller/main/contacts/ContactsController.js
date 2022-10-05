import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Contacts from "../../../screens/main/Contacts/Contacts";
import { db } from "../../../utils/firebase";
import ContactItemController from "../../components/ContactItemController";

const ContactsController = (props) =>{

    const [contactsList, setContactsList] = useState([]);
    console.log(props.meEmail)


    useEffect(()=>{

        const contactsQuery = query(collection(db, "users", props.meEmail, "contacts"));
        const contactsnapshot = onSnapshot(contactsQuery, (contacts)=>{

            let contactsArray = [];

            if(!contacts.empty){

                contacts.forEach(contact=>{
    
                    contactsArray.push(contact.data())
                })
    
                setContactsList(contactsArray);
            }else{
    
                setContactsList(contactsList);
            }
        });

        return ()=>{

            contactsnapshot()
        }
      
    },[]);

    const renderContactItem = ({item}) =>{

      return <ContactItemController meEmail={props.meEmail} route={"Contacts"} contact={item}></ContactItemController>
    }

    return(

        <Contacts
        
            contactsList={contactsList}
            renderContactItem={renderContactItem}
            meEmail={props.meEmail}
        ></Contacts>
    );
}

export default ContactsController;