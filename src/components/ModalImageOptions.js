import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";

const ModalImageOptions = (props) =>{

    

    return(

        <Modal visible={props.isVisible} transparent={true} animationType={"none"}>

            <View style={styles.container}>

                <Pressable onPress={()=>{props.setIsVisible(false)}}  style={styles.exit}>

                </Pressable>
                <View style={styles.bottomContainer}>

                    <Text style={styles.title}>Foto de Perfil</Text>

                    <View style={styles.buttonsContainer}>

                        <Pressable onPress={()=>{props.getImageFromCamera()}} style={[styles.buttonContainer, {marginRight: 30}]}>
                            <AntDesign name="camera" size={24} color="#1565C0" />
                        </Pressable>

                        <Pressable onPress={()=>{props.getImageFromGallery()}} style={[styles.buttonContainer, {}]}>
                            <Entypo name="image" size={24} color="#1565C0" />
                        </Pressable>
                    </View>
                </View>
            </View>


            
        </Modal>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1
    },

    exit:{

        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    bottomContainer:{

        width: '100%',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'white',
        
    },

    buttonsContainer:{

        flexDirection: 'row',
        marginTop: 30
    },

    buttonContainer:{

        padding: 10,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        elevation: 2
    },

    title: {

        fontSize: 18,
        fontWeight: '700'
    }
});

export default ModalImageOptions;