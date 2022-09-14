import React from "react";
import { StyleSheet, View } from "react-native";
import { CallActionBox } from "../../components/CallActionBox";
import { AntDesign } from '@expo/vector-icons';

const Call = () =>{

    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <AntDesign  name="arrowleft" size={26} color="white" />

                <View style={styles.cameraPreview}>
                </View>
            </View>
            


            <CallActionBox/>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: '#2196F3'
    },

    topContainer:{

        flex: 1
    },

    cameraPreview:{

        height: 160,
        width: 100,
        marginTop: 100,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: 'yellow',
        alignSelf:'flex-end'
    },
});

export default Call;