import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CallActionBox } from '../../components/CallActionBox';


const Calling = () =>{

    return(
        <View style={styles.container}>

            <View style={styles.cameraPreview}>

                <View style={styles.topContainer}>

                    <AntDesign  name="arrowleft" size={26} color="white" />

                    <Text style={styles.username}>Name</Text>
                </View>

                <CallActionBox/>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        width: '100%',
        height: '100%'
    },

    cameraPreview:{

        flex: 1,
        height: '100%',
        backgroundColor: '#2196F3',
        alignItems: 'center'
    },

    topContainer:{

        height: '100%'
    },

    username:{

        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },

    buttonsContainer:{

        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#333333',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        
    },

    iconButtonContainer:{

        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50,
    }
});

export default Calling;