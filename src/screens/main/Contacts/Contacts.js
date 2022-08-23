import React, {useState} from "react";
import { Image, View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Constants  from "expo-constants";

import { AntDesign } from '@expo/vector-icons';
import { ContactItem } from "../../../components/ContactItem";
import { useNavigation } from "@react-navigation/native";

export default function Contacts(){

    const navigation = useNavigation();

    return(

        <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 30, backgroundColor: '#1565C0'}}>
                <Image style={{marginStart: 10, width: 50, height: 50}} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                <Text style={{marginStart: 10,  color: 'white', fontSize: 24, fontWeight: '700'}}>Contatos</Text>
                <TouchableOpacity style={{position: 'absolute', right: 0, marginEnd: 10}}>
                    <AntDesign  name="search1" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{height: '100%', padding: 26, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>


                <TouchableOpacity style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}>

                    <View style={{width: 70, height: 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                    <AntDesign name="addusergroup" size={34} color="white" />

                    </View>

                    <Text style={{marginLeft: 26, fontSize: 18, fontWeight: '700'}}>Criar grupo</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigation.navigate('AddContact')}} style={{flexDirection: 'row', alignItems: 'center'}}>

                    <View style={{width: 70, height: 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                        <AntDesign name="adduser" size={34} color="white" />

                    </View>

                    <Text style={{marginLeft: 26, fontSize: 18, fontWeight: '700'}}>Adicionar contato</Text>

                </TouchableOpacity>

                <View style={{marginTop: 20, height: 1, backgroundColor: '#B7B7B7'}}></View>

                <ScrollView style={{marginTop: 20}}>

                    <ContactItem></ContactItem>
                    
                </ScrollView>
                
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