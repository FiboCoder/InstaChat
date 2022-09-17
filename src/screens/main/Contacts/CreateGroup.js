import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants  from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../model/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { ContactItem } from "../../../components/ContactItem";
import { Message } from "../../../model/Message";

const CreateGroup = () => {

    LogBox.ignoreAllLogs(true);


    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [contactsList, setContactsList] = useState([]);
    const [selected, setSelected] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [groupList, setGroupList] = useState([]);
    let groupUsersList = groupList;

    if(email){

        if(groupUsersList.includes(email)){

        }else{

            groupUsersList.push(email);
        }

    }


    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            if(user){

                setEmail(user.email);
                let contactsArray = [];
                setRefreshing(true);
                User.getContacts(user.email).then(contacts=>{

                    contacts.forEach(contact=>{

                        contactsArray.push(contact.data());
                    });
                    setContactsList(contactsArray);
                    setRefreshing(false)
                });

            }else{

            }
        });
    }, []);

    const saveGroup = () => {

        if(email){

            Message.createGroup(email, groupList).then(result=>{

                navigation.goBack();
            });
        }else{

            onAuthStateChanged(auth, (user)=>{

                Message.createGroup(user.email, groupList).then(result=>{

                    navigation.goBack();
                })

            });
        }

    }


    const renderContactItem = ({item}) =>{

        return <ContactItem 
        route={"CreateGroup"}
        groupUsersList={groupUsersList}
        setSelectedQuantity={setSelectedQuantity}
        selectedQuantity={selectedQuantity}
        setGroupList={setGroupList}
        groupList={groupList}
        contact={item}></ContactItem>
      }

    console.log(groupList)

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <View style={styles.topContainer}>

                    {

                        selectedQuantity > 0
                        
                            ?
                                <>
                                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.goBackButton}>
                                        <AntDesign  name="arrowleft" size={26} color="white" />
                                    </TouchableOpacity>

                                    <Text style={styles.addContactText}>Criar Grupo</Text>

                                    <TouchableOpacity onPress={()=>{saveGroup()}} style={styles.textCreateContainer}>
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
                selectedQuantity > 0

                    ?
                        <Text style={styles.headlineText}>{selectedQuantity} {selectedQuantity > 1 ? 'participantes' : 'participante'} {selectedQuantity > 1 ? 'selecionados' : 'selecionado'}.</Text>
                        
                    :
                        <Text style={styles.headlineText}>Selecione os participantes do grupo:</Text>


            }
            </View>
            
            

            <View style={styles.contactsContainer}>

                <FlatList renderItem={renderContactItem} data={contactsList} keyExtractor={(item)=>contactsList.indexOf(item)} refreshing={refreshing} onRefresh={()=>{refreshing}}/>
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