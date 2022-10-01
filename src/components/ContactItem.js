import React, {  } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

export const ContactItem = (props) =>{


    const navigation = useNavigation();

    const render = () => {

        if(props.route == "CreateGroup"){

            return <View style={{flex: 1, marginBottom: 24}}>
                        <TouchableOpacity onPress={()=>{props.doWhenPress()}} style={styles.pressableContainer}>

                            {
                                props.contactData.profileImage == ''

                                ?
                                    <View style={styles.iconProfileContainer}>

                                        <AntDesign name="user" size={24} color="white" />

                                    </View>
                                :

                                <Image style={styles.imageProfileContainer} resizeMode={"cover"} source={{uri: props.contactData.profileImage}}></Image>

                            }
                            

                            <View style={{flex: 1, marginLeft: 26}}>
                                <Text style={styles.username}>{props.contactData.username}</Text>
                                <Text style={{fontSize: 14, color: '#5E5E5E'}}>{props.contactData.aboutMe}</Text>
                            </View>

                            {
                                props.selected
                                    ?
                                        <Ionicons style={{marginLeft: 8}} name="checkmark-circle-sharp" size={26} color="#2196F3" />
                                    :
                                        null
                            }
                            
                        </TouchableOpacity>

                    </View>

        }else if(props.route == "Contacts"){

            return <View style={{flex: 1, marginBottom: 24}}>
                        <TouchableOpacity 
                            onPress={()=>{
                            
                                navigation.navigate("ContactsApp", {
                                    
                                    screen: 'ContactChatDetails', 
                                    params: {
                                        meEmail: 
                                        props.meEmail, 
                                        contactData: props.contactData, 
                                        route: "Contact_List"}})}} 
                                    
                            style={styles.pressableContainer}>

                            {
                                props.contactData.profileImage == ''

                                ?
                                    <View style={styles.iconProfileContainer}>

                                        <AntDesign name="user" size={24} color="white" />

                                    </View>
                                :

                                <Image style={styles.imageProfileContainer} resizeMode={"cover"} source={{uri: props.contactData.profileImage}}></Image>

                            }
                            

                            <View style={{flex: 1, marginLeft: 26}}>
                                <Text style={styles.username}>{props.contactData.username}</Text>
                                <Text style={{fontSize: 14, color: '#5E5E5E'}}>{props.contactData.username}</Text>
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

const styles = StyleSheet.create({

    // ---------- CREATE GROUP ---------- //

    pressableContainer:{

        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center'
    },

    iconProfileContainer:{
        
        width: 58, 
        height: 58, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#A4A4A4'
    },

    imageProfileContainer:{
        
        width: 58, 
        height: 58,
        borderRadius: 100
    },

    username:{
        
        fontSize: 16, 
        fontWeight: '700', 
        color: '#1E1E1E'
    }

    // ---------- CONTACTS ---------- //
});