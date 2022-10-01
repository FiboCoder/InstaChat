import React, {useEffect, useState} from "react";
import { Image, View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, LogBox } from "react-native";
import Constants  from "expo-constants";

import { AntDesign } from '@expo/vector-icons';
import { ContactItem } from "../../../components/ContactItem";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Contacts(){

  LogBox.ignoreAllLogs(true);

    const navigation = useNavigation();

    const [contactsList, setContactsList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    //Function to recover contacts list

    useEffect(()=>{

      onAuthStateChanged(auth, (user)=>{

        if(user){

          const contactsQuery = query(collection(db, "users", user.email, "contacts"));
          onSnapshot(contactsQuery, (contacts)=>{

            if(!contacts.empty){

              let contactsArray = [];


              contacts.forEach((contact)=>{
  
                contactsArray.push(contact.data());

              });
              
              setContactsList(contactsArray);


            }else{

              setContactsList([]);
      
            }
          }); 
        }else{

        }
      });
      
    },[]);

    const renderContactItem = ({item}) =>{

      return <ContactItem route={"Contacts"} contact={item}></ContactItem>
    }

    return(

        <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 30, backgroundColor: '#1565C0'}}>
                <Image style={{marginStart: 10, width: 50, height: 50}} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                <Text style={{marginStart: 10,  color: 'white', fontSize: 24, fontWeight: '700'}}>Contatos</Text>
                <TouchableOpacity style={{position: 'absolute', right: 0, marginEnd: 10}}>
                    <AntDesign  name="search1" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{height: '100%', padding: 26, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 4}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>

                  <TouchableOpacity onPress={()=>{navigation.navigate('CreateGroup')}} style={{flexDirection: 'column', alignItems: 'center'}}>

                    <View style={{width: 62, height: 62, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                      <AntDesign name="addusergroup" size={34} color="white" />

                    </View>

                    <Text style={{fontSize: 16, fontWeight: '600'}}>Criar grupo</Text>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{navigation.navigate('AddContact')}} style={{flexDirection: 'column', alignItems: 'center'}}>

                    <View style={{width: 62, height: 62, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                        <AntDesign name="adduser" size={34} color="white" />

                    </View>

                    <Text style={{fontSize: 16, fontWeight: '600'}}>Adicionar contato</Text>

                  </TouchableOpacity>
                </View>

                
                <View style={{height: 1, backgroundColor: '#e0e0e0'}}></View>

                <View style={{flex: 1, marginTop: 20}}>

                  <FlatList data={contactsList} renderItem={renderContactItem} keyExtractor={(item)=>contactsList.indexOf(item)}/>

                </View>
                
            </View>

        </View>
    );
    
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });