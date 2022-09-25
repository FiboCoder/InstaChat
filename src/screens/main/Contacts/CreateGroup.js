import React, {  } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants  from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";

const CreateGroup = (props) => {

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <View style={styles.topContainer}>

                    {

                        props.selectedQuantity > 0
                        
                            ?
                                <>
                                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.goBackButton}>
                                        <AntDesign  name="arrowleft" size={26} color="white" />
                                    </TouchableOpacity>

                                    <Text style={styles.addContactText}>Criar Grupo</Text>

                                    <TouchableOpacity onPress={()=>{props.saveGroup()}} style={styles.textCreateContainer}>
                                        <Text style={styles.textCreate}>Criar</Text>
                                    </TouchableOpacity>
                                </>
                            :
                                <>
                                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.goBackButton}>
                                        <AntDesign  name="arrowleft" size={26} color="white" />
                                    </TouchableOpacity>

                                    <Text style={styles.addContactText}>Criar Grupo</Text>
                                </>
                    }

                    
                </View>

                

                {
                props.selectedQuantity > 0

                    ?
                        <Text style={styles.headlineText}>{props.selectedQuantity} {props.selectedQuantity > 1 ? 'participantes' : 'participante'} {props.selectedQuantity > 1 ? 'selecionados' : 'selecionado'}.</Text>
                        
                    :
                        <Text style={styles.headlineText}>Selecione os participantes do grupo:</Text>


            }
            </View>
            
            

            <View style={styles.contactsContainer}>

                <FlatList renderItem={props.renderContactItem} data={props.contactsList} keyExtractor={(item)=>props.contactsList.indexOf(item)} refreshing={props.refreshing} onRefresh={()=>{props.refreshing}}/>
            </View>
        

        </View>
    )
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: '#1565C0'
    },

    headerContainer:{

        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: '#1565C0'
    },

    topContainer:{

        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    addContactText:{

        flex: 1, 
        fontSize: 26, 
        fontWeight: '700', 
        textAlign: 'center',
        color: 'white'
    },

    headlineText:{

        marginTop: 20, 
        marginBottom: 20,
        marginLeft: 20,
        color: 'white'
    },

    textCreateContainer:{

        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        backgroundColor: 'white',
        elevation: 6
    },

    textCreate:{

        fontSize: 16,
        fontWeight: '700',
        color: '#4A4A4A'
    },

    contactsContainer:{

        flex: 1,
        padding: 20,
        paddingTop: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 4
    }
})

export default CreateGroup;