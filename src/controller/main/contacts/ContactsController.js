import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Contacts from "../../../screens/main/Contacts/Contacts";
import { db } from "../../../utils/firebase";
import ContactItemController from "../../components/ContactItemController";

const ContactsController = (props) =>{

    const [contactsEmailsList, setContactsEmailsList] = useState([]);
    const [filteredEmailsList, setFilteredEmailsList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchBarStatus, setSearchBarStatus] = useState(false);


    useEffect(()=>{


        const contactsQuery = query(collection(db, "users", props.meEmail, "contacts"));
        const contactsnapshot = onSnapshot(contactsQuery, (contacts)=>{

            let contactsArray = [];

            if(!contacts.empty){

                contacts.forEach(contact=>{
    
                    contactsArray.push(contact.data())
                })
    
                setFilteredEmailsList(contactsArray);
                setContactsEmailsList(contactsArray);
            }else{

                setFilteredEmailsList(filteredEmailsList);
                setContactsEmailsList(contactsEmailsList);
            }
        });

        return ()=>{

            contactsnapshot();
        }
      
    },[]);

    const renderContactItem = ({item}) =>{

      return <ContactItemController meEmail={props.meEmail} route={"Contacts"} contact={item} searchText={searchText}></ContactItemController>
    }

    const filterList = (text) =>{

        if(text != ""){

            console.log("text"+text)

            setSearchText(text);

            let filteredListArray = [];

            contactsEmailsList.forEach(contact=>{

                getDoc(doc(db, "users", contact.email)).then(contactData=>{

                    if(contactData.data().username.toLowerCase().includes(text.toLowerCase())){

                        console.log("ENTROU")
                        filteredListArray.push({email:contactData.data().email});
                    }

                    setFilteredEmailsList(filteredListArray);
                });
            });

            
        }else{

            setFilteredEmailsList(contactsEmailsList);
        }
    }

    return(

        <Contacts
        
            filteredEmailsList={filteredEmailsList}
            renderContactItem={renderContactItem}
            meEmail={props.meEmail}

            setSearchBarStatus={setSearchBarStatus}
            setSearchText={setSearchText}
            searchBarStatus={searchBarStatus}
            searchText={searchText}

            filterList={filterList}
            
        ></Contacts>
    );
}

export default ContactsController;