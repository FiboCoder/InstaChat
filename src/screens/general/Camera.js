import { Camera } from 'expo-camera';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants  from "expo-constants";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const CameraScreen = (props) =>{

  const getFlashIcon = () =>{

    if(props.flash == 'off'){

      return <TouchableOpacity onPress={()=>{props.setFlash('on')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-off" size={26} color="white" />
             </TouchableOpacity>
    }else if(props.flash == 'on'){

      return <TouchableOpacity onPress={()=>{props.setFlash('auto')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-on" size={26} color="white" />
             </TouchableOpacity>
    }else if(props.flash == 'auto'){

      return <TouchableOpacity onPress={()=>{props.setFlash('off')}} style={{marginRight: 4}}>
                <MaterialIcons name="flash-auto" size={26} color="white" />
             </TouchableOpacity>
    }
  }

  return (

    <>

      {

        props.photo !== null

          ?
            <View style={{flex: 1}}>

              <ImageBackground style={styles.imageBackground} source={{uri: props.photo.uri}}>
                
                <View style={styles.mainContainer}>

                  <TouchableOpacity onPress={()=>{props.setPhoto(null)}} style={{}}>
                    <AntDesign name="close" size={26} color="white" />
                  </TouchableOpacity>

                  <View style={styles.bottomContainer}>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialIcons name="arrow-forward-ios" size={16} color="white" style={{marginRight: 4}} />
                      <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                        Nome de usuário
                      </Text>
                    </View>
                    <TouchableOpacity

                      onPress={()=>{props.sendPhoto()}}

                      style={styles.buttonSendPhoto}>

                      <FontAwesome name="send" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>


            </View>

          :

            <View style={{flex: 1}} >
        
              <Camera style={{flex: 1}} autoFocus={true} whiteBalance={'auto'} flashMode={props.flash} ratio={'16:9'} ref={props.cameraRef} type={props.type}>

                <View style={styles.topContainer}>
                  <TouchableOpacity onPress={()=>{props.toggleCameraType()}} style={{marginLeft: 4}}>
                    <Entypo  name="retweet" size={26} color="white" />
                  </TouchableOpacity>
                  {

                    getFlashIcon()
                  }
                </View>

                <Entypo onPress={()=>{props.takePicture()}} style={styles.takePicture} name="circle" size={70} color="white" />
              </Camera>
            </View>
        }
    </>

  );
}

const styles = StyleSheet.create({

  // ----------- VIEW 1 ---------- //

  imageBackground:{
    flex: 1, 
    width: '100%', 
    height: '100%'
  },

  mainContainer:{
    
    flex: 1, 
    paddingTop: Constants.statusBarHeight + 20, 
    marginLeft: 6, 
    marginRight: 6
  },

  bottomContainer:{
    
    width: '100%', 
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 8, 
  },

  // ----------- VIEW 2 ---------- //

  topContainer:{
    
    flexDirection: 'row', 
    backgroundColor: 'black', 
    paddingTop: Constants.statusBarHeight+30, 
    paddingBottom: 18, 
    justifyContent: 'space-between'
  },

  buttonSendPhoto:{

    padding: 14, 
    borderRadius: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#1565C0',
    shadowColor: '#000000',
    elevation: 3
  },

  takePicture:{
    
    position: 'absolute', 
    bottom: 0, 
    alignSelf: 'center', 
    marginBottom: 10
  }
});

export default CameraScreen;