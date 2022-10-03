import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import ContactItemController from "../../components/ContactItemController";
import { User } from "../../../model/User";
import CreateGroup from "../../../screens/main/Contacts/CreateGroup";
import { auth } from "../../../utils/firebase";
import { Message } from "../../../model/Message";

const CreateGroupController = () =>{

    const navigation = useNavigation();
    const route = useRoute();

    const [refreshing, setRefreshing] = useState(false);

    const [email, setEmail] = useState('');

    const [image, setImage] = useState('');
    const [groupName, setGroupName] = useState('');
    const [aboutGroup, setAboutGroup] = useState('');

    const [isVisible, setIsVisible] = useState(false);
    const [contactsList, setContactsList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [groupList, setGroupList] = useState([]);

    let groupUsersList = groupList;

    if(email){

        if(groupUsersList.includes(email)){

        }else{

            groupUsersList.push(email);
        }
    }
    
    const getImageModal = ()=>{

        setIsVisible(true);
    }

    const getImageFromCamera = async () =>{

        let image = await ImagePicker.launchCameraAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true
        });

        if(!image.cancelled){

            setIsVisible(false);
            setImage(image.uri);
        }
    }

    const getImageFromGallery = async () =>{

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true
          });
      
          console.log(image);
      
          if (!image.cancelled) {

            setIsVisible(false);
            setImage(image.uri);
          }
    }

    useEffect(()=>{

        User.getContacts(route.params.meEmail).then(contacts=>{

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

    }, []);

    const saveGroup = () => {


        if(groupName.toString() !== ''){

            if(aboutGroup.toString() !== ''){

                if(image != ''){

                    if(props.meEmail){

                        Message.createGroup(props.meEmail, image, groupName, aboutGroup, groupList).then(result=>{

                            navigation.goBack();
                        });
        
                    }else{
            
                        onAuthStateChanged(auth, (user)=>{
            
                            Message.createGroup(user.email, image, groupName, aboutGroup, groupList).then(result=>{
            
                                navigation.goBack();
                            })
                        });
                    }     
                }else{

                    if(props.meEmail){

                        Message.createGroup(props.meEmail, "", groupName, aboutGroup, groupList).then(result=>{

                            navigation.goBack();
                        });
        
                    }else{
            
                        onAuthStateChanged(auth, (user)=>{
            
                            Message.createGroup(user.email, "", groupName, aboutGroup, groupList).then(result=>{
            
                                navigation.goBack();
                            })
                        });
                    }
                }

            }else{
 
            }
        }else{

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
                selected={selected}

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

            setIsVisible={setIsVisible}
            isVisible={isVisible}

            setGroupName={setGroupName}
            setAboutGroup={setAboutGroup}

            image={image}
            groupName={groupName}
            aboutGroup={aboutGroup}

            getImageModal={getImageModal}
            getImageFromCamera={getImageFromCamera}
            getImageFromGallery={getImageFromGallery}

        ></CreateGroup>
    );
}

export default CreateGroupController;