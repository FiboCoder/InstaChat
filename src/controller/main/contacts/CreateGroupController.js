import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { onAuthStateChanged } from "firebase/auth";

import ContactItemController from "../../components/ContactItemController";
import { User } from "../../../model/User";
import CreateGroup from "../../../screens/main/Contacts/CreateGroup";
import { auth } from "../../../utils/firebase";
import { Message } from "../../../model/Message";

const CreateGroupController = () =>{

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    const [email, setEmail] = useState('');

    const [contactsList, setContactsList] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [groupList, setGroupList] = useState([]);

    let groupUsersList = groupList;

    if(email){

        if(groupUsersList.includes(email)){

        }else{

            groupUsersList.push(email);
        }
    }

    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                setEmail(user.email);
                let contactsArray = [];
                setRefreshing(true);
                User.getContacts(user.email).then(contacts=>{

                    contacts.forEach(contact=>{

                        contactsArray.push(contact.data());
                    });
                    setContactsList(contactsArray);
                    setRefreshing(false)
                });

            }else{

            }
        });
    }, []);

    const saveGroup = () => {

        if(email){

            Message.createGroup(email, groupList).then(result=>{

                navigation.goBack();
            });
        }else{

            onAuthStateChanged(auth, (user)=>{

                Message.createGroup(user.email, groupList).then(result=>{

                    navigation.goBack();
                })
            });
        }
    }

    const renderContactItem = ({item}) =>{

        return(
            <ContactItemController 

                route={"CreateGroup"}
                groupUsersList={groupUsersList}
                setSelectedQuantity={setSelectedQuantity}
                selectedQuantity={selectedQuantity}
                setGroupList={setGroupList}
                groupList={groupList}
                contact={item}

            ></ContactItemController>
        );
      }
    return(

        <CreateGroup
        
            selectedQuantity={selectedQuantity}
            contactsList={contactsList}
            refreshing={refreshing}

            renderContactItem={renderContactItem}
            saveGroup={saveGroup}

        ></CreateGroup>
    );
}

export default CreateGroupController;