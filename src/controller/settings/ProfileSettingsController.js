import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { User } from "../../model/User";
import ProfileSettings from "../../screens/main/Settings/ProfileSettings";

const ProfileSettingsController = () =>{

    const route = useRoute();

    const [image, setImage] = useState();
    const [text, setText] = useState();

    const [modalRoute, setModalRoute] = useState();
    const [isVisible, setIsVisible] = useState(false);

    const getImageModal = () =>{

        setModalRoute("Image");
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

            setImage(image.uri);
            saveImage(image);
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

            setImage(image.uri);
            saveImage(image);
          }
    }

    const saveImage = async (image) => {

        setIsVisible(false);

        let response = await fetch(image.uri);
        const blob = await response.blob();

        User.uploadPhoto(route.params.userData.data().email, blob).then(imageRef=>{

            User.updateUser(route.params.userData.data().email, imageRef, "", "", "Image").then(result=>{


            });
        })
    }

    const changeUsernameText = () =>{

        setModalRoute("Username");
        setIsVisible(true);

    }

    const changeAboutMeText = () =>{

        setModalRoute("AboutMe");
        setIsVisible(true);
    }

    const saveName = () =>{

        User.updateUser(route.params.userData.data().email, "", text, "", "Username").then(result=>{

            setIsVisible(false);
        });
    }

    const saveAboutMe = () =>{

        User.updateUser(route.params.userData.data().email, "", "", text, "AboutMe").then(result=>{

            setIsVisible(false);
        });
    }


    let changeUsernameData = {

        setText,
        text,
        title: "Alterar nome de usuário",
        placeholder: "Nome de usuário"

    }

    let changeAboutMeData = {

        setText,
        text,
        title: "Sobre mim",
        placeholder: "Sobre mim...."
    }
 

    return(

        <>
            {
                route.params.userData

                    ?

                        <ProfileSettings 

                            setIsVisible={setIsVisible} 
                            isVisible={isVisible} 
                            userData={route.params.userData}
                            modalRoute={modalRoute}

                            getImageModal={getImageModal}
                            changeUsernameText={changeUsernameText}
                            changeAboutMeText={changeAboutMeText}

                            getImageFromCamera={getImageFromCamera}
                            getImageFromGallery={getImageFromGallery}

                            changeUsernameData={changeUsernameData}
                            changeAboutMeData={changeAboutMeData}

                            saveName={saveName}
                            saveAboutMe={saveAboutMe}

                        ></ProfileSettings>

                    :   
                        null
            }
        </>

    );
}

export default ProfileSettingsController;