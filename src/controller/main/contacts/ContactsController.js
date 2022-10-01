import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Contacts from "../../../screens/main/Contacts/Contacts";
import { auth, db } from "../../../utils/firebase";
import ContactItemController from "../../components/ContactItemController";

const ContactsController = () =>{

    const [contactsList, setContactsList] = useState([]);
    const [meEmail, setMeEmail] = useState();

    useEffect(()=>{

      onAuthStateChanged(auth, (user)=>{

        if(user){

          setMeEmail(user.email);

          const contactsQuery = query(collection(db, "users", user.email, "contacts"));
          onSnapshot(contactsQuery, (contacts)=>{

            if(!contacts.empty){

              let contactsArray = [];


              contacts.forEach((contact)=>{
  
                contactsArray.push(contact.data());

              });
              
              setContactsList(contactsArray);
            }else{

              setContactsList([]);
            }
          }); 
        }else{
            setContactsList([]);
        }
      });
      
    },[]);

    const renderContactItem = ({item}) =>{

      return <ContactItemController meEmail={meEmail} route={"Contacts"} contact={item}></ContactItemController>
    }

    return(

        <Contacts
        
            contactsList={contactsList}
            renderContactItem={renderContactItem}
        ></Contacts>
    );
}

export default ContactsController;