import { useNavigation, useRoute } from "@react-navigation/native";
import { User } from "../../../model/User";
import AddContact from "../../../screens/main/Contacts/AddContact";
import { useState } from "react";


const AddContactController = () =>{

    const navigation = useNavigation();
    const route = useRoute();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const addContact = () =>{

        setLoading(true);

        if(email == route.params.meEmail){

            setLoading(false);
            setErrorMessage('Você não pode adicionar a si mesmo como um contato!')
        }else{

            User.addContact(email, route.params.meEmail).then(result=>{

                setLoading(false);
                navigation.goBack();
            }).catch(err=>{

                setLoading(false);
                setErrorMessage("Erro ao adicionar contato, tente novamente!")
            });
        }
    }

    return(

        <AddContact

            setEmail={setEmail}

            email={email}
            errorMessage={errorMessage}

            loading={loading}

            addContact={addContact}
        ></AddContact>
    );
}

export default AddContactController;