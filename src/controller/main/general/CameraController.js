import { useNavigation, useRoute } from "@react-navigation/native";
import { CameraType } from "expo-camera";
import { useRef, useState } from "react";

import { Message } from "../../../model/Message";
import Camera from "../../../screens/general/Camera";

const CameraController = () =>{

    const route = useRoute();
    const navigation = useNavigation();
    const cameraRef = useRef();

    //Camera props
    const [flash, setFlash] = useState('off');
    const [type, setType] = useState(CameraType.back);
    const [photo, setPhoto] = useState(null);


    function toggleCameraType() {

        setType((current) => (
        current === CameraType.back ? CameraType.front : CameraType.back
        ));
    }

    const takePicture = async () =>{

        let options = {

        quality: 1,
        base64: true,
        esif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    }

    const sendPhoto = async () =>{

        if(photo){

        let response = await fetch(photo.uri);
        const blob = await response.blob();

        Message.uploadPhoto(route.params.chatId, blob).then(result=>{

            let message = new Message();
            message.setMessage(result);
            message.setStatus('waiting');
            message.setFrom(route.params.meEmail);
            message.setType('photo');

            if(route.params.route == "Contact_List"){

            message.sendMessage(route.params.contactEmail, route.params.meEmail, "", "Contact_List").then(result=>{
    
                navigation.goBack();
            });
            }else if(route.params.route == "Chat_Single"){

            message.sendMessage(route.params.contactEmail, route.params.meEmail, route.params.chatId, "Chat_Single").then(result=>{
    
                navigation.goBack();
            });
            }else if(route.params.route == "Chat_Group"){

            message.sendMessageToGroup(route.params.meEmail, route.params.groupUsersList, route.params.chatId).then(result=>{

                navigation.goBack();

            });
            }
        });
        }
    }

    return(

        <Camera
        
            setFlash={setFlash}
            setPhoto={setPhoto}

            cameraRef={cameraRef}
            flash={flash}
            type={type}
            photo={photo}

            toggleCameraType={toggleCameraType}
            takePicture={takePicture}
            sendPhoto={sendPhoto}

        ></Camera>
    );
}
export default CameraController;