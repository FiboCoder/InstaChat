import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen(){

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }

  return (
    <View style={{flex: 1}} >
      <Camera style={{flex: 1}} type={type}>
        <View style={{flex: 1}} >
          <TouchableOpacity
            onPress={toggleCameraType}>
            <Text style={{color: 'white', marginTop: 30}} >Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}