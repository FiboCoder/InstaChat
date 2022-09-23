import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const ChatsSettings = (props) =>{

    const navigation = useNavigation();


    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>

                <TouchableOpacity onPress={()=>{navigation.goBack()}}>

                    <AntDesign  name="arrowleft" size={30} color="white" />
                </TouchableOpacity>

                <Text style={styles.personalInformationText}>Informações Pessoais</Text>
            </View>

            <View style={styles.mainContainer}>

                <Text style={styles.title}>Display</Text>

                <View style={styles.displayItemContainer}>

                    <View style={styles.displayItemIconContainer}>
                        <Feather name="sun" size={40} color="#4A4A4A" />
                    </View>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <View style={styles.displayItem}>
                            <Text style={styles.displayItemText}>Tema</Text>
                        </View> 
                        <View style={styles.divider}></View>

                    </View>
                        
                </View>

                <View style={styles.displayItemContainer}>

                    <View style={styles.displayItemIconContainer}>
                        <MaterialIcons name="wallpaper" size={40} color="#4A4A4A" />
                    </View>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <View style={styles.displayItem}>
                            <Text style={styles.displayItemText}>Wallpaper</Text>
                        </View> 
                        <View style={styles.divider}></View>

                    </View>
                        
                </View>

                <Text style={[styles.title, {marginTop: 30}]}>Chat</Text>

                <View style={styles.chatItemContainer}>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <View style={styles.chatItem}>

                            <Text style={styles.chatItemTitle}>Confirmação de Leitura</Text>

                            <Text style={[styles.chatItemText, {marginTop: 4}]}>Mostrar ao usuário a confirmação de leitura.</Text>
                        </View>

                    </View>

                    <Switch trackColor={{ false: "", true: "#1565C0" }}  thumbColor={props.activeReadConfirmation ? "#1565C0" : "#f4f3f4"} onValueChange={()=>{props.setActiveReadConfirmation(!props.activeReadConfirmation)}} value={props.activeReadConfirmation}></Switch>
                    
                </View>

                <View style={styles.chatItemContainer}>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <View style={styles.chatItem}>

                            <Text style={styles.chatItemTitle}>Tamanho da Fonte</Text>

                            <Text style={[styles.chatItemText, {marginTop: 4}]}>Média</Text>
                        </View>

                    </View>

                    <Switch></Switch>
                    
                </View>

                <View style={styles.chatItemContainer}>

                    <View style={{flex: 1, width: '100%', marginLeft: 20}}>

                        <Text style={styles.chatItemTitle}>Cor da caixa de texto</Text>


                        <View style={{flexDirection: 'row', alignItem: 'center', marginTop: 4, justifyContent: 'space-between',}}>

                            <Text style={styles.chatItemText}>Meu</Text>

                            <Pressable>
                                <View style={{width: 30, height: 30, backgroundColor: '#2196F3'}}></View>
                            </Pressable>

                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20, alignItem: 'center', justifyContent: 'space-between',}}>

                            <Text style={styles.chatItemText}>Contato</Text>
                            <Pressable>
                                <View style={{width: 30, height: 30, backgroundColor: '#E6E6E6'}}></View>
                            </Pressable>

                        </View>

                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={()=>{props.saveChanges()}} style={styles.saveButtonContainer}>
                <Text style={styles.textSaveButtonContainer}>Salvar Alterações</Text>
            </TouchableOpacity>
        </View>

    );


}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: 'white'
    },

    topContainer:{

        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: 20,
        backgroundColor: '#1565C0'
    },

    mainContainer:{

        flex: 1,
        height: '100%',
        padding: 16,
        paddingTop: 20
    },

    personalInformationText:{

        marginLeft: 30,
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
    },

    title:{

        fontSize: 16,
        fontWeight: '700',
        color: '#4A4A4A'
    },

    displayItemContainer:{

        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30
    },

    displayItem:{

        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    displayItemIconContainer:{

        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center'
    },

    displayItemText:{

    },

    chatItemContainer:{

        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20
    },

    chatItem:{

        marginRight: 50
    },

    chatItemTitle:{

        fontSize: 16,
        fontWeight: '700',
        color: '#4A4A4A'
    },

    chatItemText:{

    },

    divider:{

        width: '100%',
        height: 1,
        marginTop: 30,
        backgroundColor: '#e0e0e0'
    },

    saveButtonContainer:{

        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#2196F3',

    },

    textSaveButtonContainer:{

        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});

export default ChatsSettings;