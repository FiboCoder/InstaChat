import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';


import ContactItemController from "../../components/ContactItemController";
import { User } from "../../../model/User";
import CreateGroup from "../../../screens/main/Contacts/CreateGroup";
import { auth } from "../../../utils/firebase";
import { Message } from "../../../model/Message";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { Pressable } from "react-native";

const CreateGroupController = () =>{

    const navigation = useNavigation();

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


        if(groupName.toString() !== ''){

            if(aboutGroup.toString() !== ''){

                if(image != ''){

                    if(email){

                        Message.createGroup(email, image, groupName, aboutGroup, groupList).then(result=>{

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

                    if(email){

                        Message.createGroup(email, "", groupName, aboutGroup, groupList).then(result=>{

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

    const handleSelectionMultiple = (email) =>{

        let selectedItems = [...selected];

        if(selectedItems.includes(email)){

            selectedItems.filter(m=>{

                return m != email
            })
        }else{

            selectedItems.push(email);
        }

        setSelected(selectedItems)
        console.log(selectedItems)


    }


    const renderContactItem = ({item}) =>{

        return(

            <Pressable onPress={()=>handleSelectionMultiple(item.email)}>
                <ContactItemController 

                    route={"CreateGroup"}
                    groupUsersList={groupUsersList}
                    setSelectedQuantity={setSelectedQuantity}
                    selectedQuantity={selectedQuantity}
                    setGroupList={setGroupList}
                    groupList={groupList}
                    contact={item}

                    ></ContactItemController>
            </Pressable>
            
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