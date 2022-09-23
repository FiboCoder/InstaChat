import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ModalText = (props) =>{

    return(

        <Modal
        
            visible={props.isVisible}
            transparent={true}
            animationType={"none"}
        >

            <View style={styles.container}>

                <View style={styles.mainContainer}>

                    <Text style={styles.title}>{props.modalTextData.title}</Text>

                    <View style={styles.textField}>
                        <TextInput onChangeText={(text)=>{props.modalTextData.setText(text)}} style={styles.textInput} placeholder={props.modalTextData.placeholder} value={props.modalTextData.text}></TextInput>
                    </View>

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity onPress={()=>{props.setIsVisible(false)}} style={styles.cancelButton}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                        {

                            props.route == "Username"
                                ?
                                    <TouchableOpacity onPress={()=>{props.saveName()}} style={styles.confirmButton}>
                                        <Text style={{fontWeight: '600', color: 'white'}}>Alterar</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={()=>{props.saveAboutMe()}} style={styles.confirmButton}>
                                        <Text style={{fontWeight: '600', color: 'white'}}>Alterar</Text>
                                    </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',

    },

    mainContainer:{

        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 30,
        backgroundColor: 'white',
    },

    title:{

        fontSize: 20,
        fontWeight: '700'
    },

    textField:{

        flexDirection: "row",
        backgroundColor: '#E6E6E6',
        marginTop: 40,
        paddingStart: 14,
        paddingEnd: 10,
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: "center",
        borderRadius: 30
    },

    textInput:{

        width: '100%'
    },

    buttonsContainer:{

        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 30,
    },

    cancelButton:{

        marginRight: 20, 
        padding: 10, 
        borderRadius: 10,
    },

    confirmButton:{

        backgroundColor: '#2196F3', 
        padding: 10, 
        borderRadius: 10,
        elevation: 4
    }
});

export default ModalText;