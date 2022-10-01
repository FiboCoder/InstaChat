import { useNavigation } from "@react-navigation/native";

import { User } from "../../../model/User";
import AddContact from "../../../screens/main/Contacts/AddContact";

import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";


const AddContactController = () =>{

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addContact = () =>{

        let meEmail = '';

        onAuthStateChanged(auth, (user)=>{

            if(user){

                meEmail = user.email;

                if(email == meEmail){

                    setErrorMessage('Você não pode adicionar a si mesmo como um contato!')
                }else{

                    User.addContact(email, meEmail).then(result=>{
        
                        navigation.goBack()
                    });
                }

            }else{

                setErrorMessage('Erro ao adicionar contato, tente novamente!')
            }

        });  
    }

    return(

        <AddContact

            setEmail={setEmail}

            email={email}
            errorMessage={errorMessage}

            addContact={addContact}
        ></AddContact>
    );
}

export default AddContactController;