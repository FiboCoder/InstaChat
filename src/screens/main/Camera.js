import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants  from "expo-constants";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Message } from '../../model/Message';


export default function CameraScreen(){

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

  const getFlashIcon = () =>{

    if(flash == 'off'){

      return <TouchableOpacity onPress={()=>{setFlash('on')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-off" size={26} color="white" />
             </TouchableOpacity>
    }else if(flash == 'on'){

      return <TouchableOpacity onPress={()=>{setFlash('auto')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-on" size={26} color="white" />
             </TouchableOpacity>
    }else if(flash == 'auto'){

      return <TouchableOpacity onPress={()=>{setFlash('off')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-auto" size={26} color="white" />
             </TouchableOpacity>
    }
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
        message.sendMessage(route.params.contactEmail, route.params.meEmail).then(result=>{
  
          navigation.navigate('ChatsApp', {screen: 'ChatDetails'});
        });
      });
    }
  }

  return (

    <View style={{flex: 1}}>
      {

        photo !== null

          ?
          <View style={{flex: 1}}>

            <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} source={{uri: photo.uri}}>
              
              <View style={{flex: 1, paddingTop: Constants.statusBarHeight+20, marginLeft: 6, marginRight: 6}}>

                <TouchableOpacity onPress={()=>{setPhoto(null)}} style={{}}>
                  <AntDesign name="close" size={26} color="white" />
                </TouchableOpacity>

                <View style={{width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, }}>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons name="arrow-forward-ios" size={16} color="white" style={{marginRight: 4}} />
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                      Nome de usuário
                    </Text>
                  </View>
                  <TouchableOpacity

                    onPress={()=>{sendPhoto()}}

                    style={{
                        padding: 14, 
                        borderRadius: 50, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: '#1565C0',
                        shadowColor: '#000000',
                        elevation: 3}}>

                    <FontAwesome name="send" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>


          </View>

          :

          <View style={{flex: 1}} >
      
            <Camera style={{flex: 1}} autoFocus={true} whiteBalance={'auto'} flashMode={flash} ratio={'16:9'} ref={cameraRef} type={type}>

              <View style={{flexDirection: 'row', backgroundColor: 'black', paddingTop: Constants.statusBarHeight+30, paddingBottom: 18, justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>{toggleCameraType()}} style={{marginLeft: 4}}>
                  <Entypo  name="retweet" size={26} color="white" />
                </TouchableOpacity>
                {

                  getFlashIcon()
                }
              </View>

              <Entypo onPress={()=>{takePicture()}} style={{position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 10}} name="circle" size={70} color="white" />
            </Camera>
          </View>
      }
    </View>

  );
}