import { useNavigation, useRoute } from "@react-navigation/native";
import { User } from "../../../model/User";
import AddContact from "../../../screens/main/Contacts/AddContact";
import { useState } from "react";


const AddContactController = () =>{

    const navigation = useNavigation();
    const route = useRoute();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addContact = () =>{

        if(email == route.params.meEmail){

            setErrorMessage('Você não pode adicionar a si mesmo como um contato!')
        }else{

            User.addContact(email, route.params.meEmail).then(result=>{

                navigation.goBack()
            });
        }
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