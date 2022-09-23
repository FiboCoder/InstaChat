import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const ModalPassword = (props) =>{

    return(

        <Modal

            visible={props.isVisible}
            transparent={true}
            animationType={"none"}
        >
            <View style={styles.container}>

                <View style={styles.mainContainer}>

                    <Text style={styles.title}>Alterar senha</Text>

                    <View style={styles.textField}>
                        <TextInput secureTextEntry={true} onChangeText={(text)=>{props.setNewPassword(text)}} style={styles.textInput} placeholder="Nova senha" value={props.newPassword}></TextInput>
                    </View>

                    <View style={[styles.textField, {marginTop: 10}]}>
                        <TextInput secureTextEntry={true} onChangeText={(text)=>{props.setConfirmNewPassword(text)}} style={styles.textInput} placeholder="Confirmar senha" value={props.confirmNewPassword}></TextInput>
                    </View>

                    <Text style={styles.errorText}>{props.error}</Text>

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity onPress={()=>{props.setIsVisible(false)}} style={styles.cancelButton}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{props.changePassword()}} style={styles.confirmButton}>
                            <Text style={{fontWeight: '600', color: 'white'}}>Continuar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
        
    );
}

export const ModalRequireReAuthentication = (props) =>{

    return(

        <Modal

            visible={props.isVisibleReq}
            transparent={true}
            animationType={"none"}
        >

            <View style={styles.container}>

                <View style={styles.mainContainer}>

                    <Text>Aparentemente você não faz login no app há muito tempo, para alterar a senha precisamos que você faça login novamente para que possámos validar suas credenciais. </Text>

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity onPress={()=>{props.setIsVisibleReq(false)}} style={styles.cancelButton}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{props.signOut()}} style={styles.confirmButton}>
                            <Text style={{fontWeight: '600', color: 'white'}}>Continuar</Text>
                        </TouchableOpacity>
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
        elevation: 10
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
        borderRadius: 30,
        elevation: 2
    },

    textInput:{

        width: '100%'
    },

    errorText:{

        marginTop: 6,
        color: 'red'
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