import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { User } from "../../../model/User";
import ProfileSettings from "../../../screens/main/Settings/ProfileSettings";

const ProfileSettingsController = () =>{

    const route = useRoute();

    const [image, setImage] = useState();
    const [text, setText] = useState();

    const [modalRoute, setModalRoute] = useState();
    const [isVisible, setIsVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const getImageModal = () =>{

        setModalRoute("Image");
        setIsVisible(true);
    }

    const getImageFromCamera = async () =>{

        setLoading(true);

        let image = await ImagePicker.launchCameraAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true,
            aspect: [1, 1]
        });

        if(!image.cancelled){

            setIsVisible(false);
            setImage(image.uri);
            saveImage(image);
        }else{

            setLoading(false);

        }
    }

    const getImageFromGallery = async () =>{

        setLoading(true);

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true,
            aspect: [1, 1]
          });
      
          console.log(image);
      
          if (!image.cancelled) {

            setIsVisible(false);
            setImage(image.uri);
            saveImage(image);
          }else{

            setLoading(false);

          }
    }

    const saveImage = async (image) => {

        setIsVisible(false);

        let response = await fetch(image.uri);
        const blob = await response.blob();

        User.uploadPhoto(route.params.userData.data().email, blob).then(imageRef=>{

            User.updateUser(route.params.userData.data().email, imageRef, "", "", "Image").then(result=>{

                setLoading(false);
                setTimeout(()=>{

                    setSuccess(true);
                }, 500);

            }).catch(err=>{

                setLoading(false);

            });
        }).catch(err=>{

            setLoading(false);
            
        });
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

        setLoading(true);

        User.updateUser(route.params.userData.data().email, "", text, "", "Username").then(result=>{

            setLoading(false);
            setIsVisible(false);
            setText("");
            setTimeout(()=>{

                setSuccess(true);
            }, 500);
        }).catch(err=>{

            setLoading(false);

        });
    }

    const saveAboutMe = () =>{

        setLoading(true);

        User.updateUser(route.params.userData.data().email, "", "", text, "AboutMe").then(result=>{

            setLoading(false);
            setIsVisible(false);
            setText("");
            setTimeout(()=>{

                setSuccess(true);
            }, 500);
        }).catch(err=>{

            setLoading(false);

        });
    }


    let changeUsernameData = {

        setText,
        text,
        title: "Alterar nome de usu??rio",
        placeholder: "Nome de usu??rio"

    }

    let changeAboutMeData = {

        setText,
        text,
        title: "Sobre mim",
        placeholder: "Sobre mim...."
    }

    useEffect(()=>{

        if(success == true){

            setTimeout(()=>{

                setSuccess(false);
            }, 2000);
        }

        
    },[success]);
 

    return(

        <>
            {
                route.params.userData

                    ?

                        <ProfileSettings 

                            setIsVisible={setIsVisible} 
                            isVisible={isVisible} 
                            loading={loading}
                            success={success}
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