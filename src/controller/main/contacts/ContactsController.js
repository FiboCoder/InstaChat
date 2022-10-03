import { useEffect, useState } from "react";
import { User } from "../../../model/User";
import Contacts from "../../../screens/main/Contacts/Contacts";
import ContactItemController from "../../components/ContactItemController";

const ContactsController = (props) =>{

    const [contactsList, setContactsList] = useState([]);
    console.log(props.meEmail)


    useEffect(()=>{

      User.getContacts(props.meEmail).then(contacts=>{

        let contactsArray = [];

        if(!contacts.empty){

            contacts.forEach(contact=>{

                contactsArray.push(contact.data())
            })

            setContactsList(contactsArray);
        }else{

            setContactsList([]);
        }
    });
      
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