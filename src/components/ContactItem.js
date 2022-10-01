import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

export const ContactItem = (props) =>{


    const navigation = useNavigation();

    const [contactData, setContactData] = useState([]);
    const [selected, setSelected] = useState(false);

    const contactQuery = doc(db, "users", props.contact.email);
    onSnapshot(contactQuery, (contactData)=>{

        setContactData(contactData.data());
    });

    const doWhenPress = () => {


        if(!selected){

            setSelected(!selected);
            props.setSelectedQuantity(props.selectedQuantity + 1);
            props.groupUsersList.push(props.contact.email);

            props.setGroupList(props.groupUsersList);
            

        }else{

            setSelected(!selected);

            if(props.selectedQuantity > 0){

                props.setSelectedQuantity(props.selectedQuantity - 1);

                let list = props.groupList;

                props.setGroupList([]);
                props.setGroupList(list.filter(email=>{

                    return email != props.contact.email;

                }));
            }
        } 

    }

    const render = () => {

        if(props.route == "CreateGroup"){

            return <View style={{flex: 1, marginBottom: 24}}>
                        <TouchableOpacity onPress={()=>{doWhenPress()}} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>

                            {
                                contactData.profileImage == ''

                                ?
                                    <View style={{width: 58, height: 58, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                                        <AntDesign name="user" size={24} color="white" />

                                    </View>
                                :

                                <Image style={{width: 58, height: 58}} source={{uri: contactData.profileImage}}></Image>

                            }
                            

                            <View style={{flex: 1, marginLeft: 26}}>
                                <Text style={{fontSize: 16, fontWeight: '700', color: '#1E1E1E'}}>{contactData.username}</Text>
                                <Text style={{fontSize: 14, color: '#5E5E5E'}}>{contactData.username}</Text>
                            </View>

                            {
                                selected
                                    ?
                                        <Ionicons style={{marginLeft: 8}} name="checkmark-circle-sharp" size={26} color="#2196F3" />
                                    :
                                        null
                            }
                            
                        </TouchableOpacity>

                    </View>

        }else if(props.route == "Contacts"){

            return <View style={{flex: 1, marginBottom: 24}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate("ContactsApp", {screen: 'ContactChatDetails', params: {contactData: contactData, route: "Contact_List"}})}} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>

                            {
                                contactData.profileImage == ''

                                ?
                                    <View style={{width: 58, height: 58, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A4A4A4'}}>

                                        <AntDesign name="user" size={24} color="white" />

                                    </View>
                                :

                                <Image style={{width: 58, height: 58}} source={{uri: contactData.profileImage}}></Image>

                            }
                            

                            <View style={{flex: 1, marginLeft: 26}}>
                                <Text style={{fontSize: 16, fontWeight: '700', color: '#1E1E1E'}}>{contactData.username}</Text>
                                <Text style={{fontSize: 14, color: '#5E5E5E'}}>{contactData.username}</Text>
                            </View>

                            
                        </TouchableOpacity>
            
                    </View>
            }
    }

    return(

        <View style={{flex: 1}}>

            {render()}

        </View>
    );
}