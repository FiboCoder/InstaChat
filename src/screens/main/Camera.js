import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants  from "expo-constants";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function CameraScreen(){

  const [type, setType] = useState(CameraType.back);

  //Camera props
  const [flash, setFlash] = useState('off');


  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }

  const getFlashIcon = () =>{

    if(flash == 'off'){

      Camera.Constants.FlashMode.off

      return <TouchableOpacity onPress={()=>{setFlash('on')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-off" size={24} color="white" />
             </TouchableOpacity>
    }else if(flash == 'on'){

      Camera.Constants.FlashMode.on


      return <TouchableOpacity onPress={()=>{setFlash('auto')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-on" size={24} color="white" />
             </TouchableOpacity>
    }else if(flash == 'auto'){

      Camera.Constants.FlashMode.auto


      return <TouchableOpacity onPress={()=>{setFlash('off')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-auto" size={24} color="white" />
             </TouchableOpacity>
    }
  }

  return (
    <View style={{flex: 1}} >
      
      <Camera autoFocus={true} whiteBalance={'auto'} flashMode={flash} ratio={'16:9'} style={{flex: 1}} type={type}>

        <View style={{flexDirection: 'row', backgroundColor: 'black', paddingTop: Constants.statusBarHeight+30, paddingBottom: 18, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={()=>{toggleCameraType()}} style={{marginLeft: 4}}>
            <Entypo  name="retweet" size={24} color="white" />
          </TouchableOpacity>
          {

            getFlashIcon()
          }
        </View>

        <Entypo style={{position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 10}} name="circle" size={70} color="white" />
      </Camera>
    </View>
  );
}