import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ChatBoxMessageBlue, ChatBoxMessageLightGray } from '../../../components/ChatBoxItem';
import { useState } from 'react';


export default function ChatDetails(){


    const [message, setMessage] = useState('');

    const sendMessage = () =>{

        
    }


    let userName = 'Nome de usuário';
    let profileImage = '../../../../assets/images/mal.png';

    let messages = [

        {
            id: 1,
            me: false,
            message: 'Mensagem de teste aqui',
            status: 'sent',
            time: '00:00'
        },

        {
            id: 1,
            me: true,
            message: 'Mensagem de teste aqui',
            status: 'sent',
            time: '00:00'
        },

        {
            id: 1,
            me: false,
            message: 'Mensagem de teste aqui',
            status: 'sent',
            time: '00:00'
        },

        {
            id: 1,
            me: true,
            message: 'Mensagem de teste aqui',
            status: 'sent',
            time: '00:00'
        },
        

    ]

    return(

        <View style={{paddingTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#1565C0'}}>

            <View style={{zIndex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: -10, backgroundColor: '#1565C0'}}>
                
                <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}}>

                    <AntDesign  name="arrowleft" size={26} color="white" />
                </TouchableOpacity>

                <View style={{alignItems: 'center', marginLeft: 96, marginRight: 96,}}>

                    <Text numberOfLines={1} style={{color: 'white', fontSize: 18, fontWeight: '600'}}>{userName}</Text>
                    <View style={{marginTop: 10}}>
                        {profileImage === '' ?
                            
                            <View style={{width: 80, height: 80, marginBottom: -40, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                                <FontAwesome5 style={{shadowColor: '#000000', elevation: 4}} name="user" size={30} color="white" />
                            </View>
                            :

                            <Image style={{width: 80, height: 80, marginBottom: -40}} source={require(profileImage)}></Image>
                            
                        }
                    </View>
                </View>

                <TouchableOpacity style={{position: 'absolute', right: 0, marginLeft: 10}}>

                    <Entypo name="dots-three-vertical" size={26} color="white" />
                </TouchableOpacity>

                
            </View>

            <View style={{flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000000', elevation: 4}}>

                <ScrollView style={{flex: 1, marginBottom: 10, marginTop: 60, marginBottom: 4, marginLeft: 26, paddingRight: 26, flexDirection: 'column'}}>

                    <View>

                    {
                        messages.map((message)=>{
                            

                            if(message.me){

                                return <ChatBoxMessageLightGray messageProp={message.message} statusProp={message.status} timeProp={message.time}></ChatBoxMessageLightGray>
                            }else{

                                return <ChatBoxMessageBlue messageProp={message.message} statusProp={message.status} timeProp={message.time}></ChatBoxMessageBlue>
                            }
                        })
                    }
                    </View>
                    
                </ScrollView>

                <View style={{marginBottom: 6, flexDirection: 'row', width: '100%'}}>

                    <View style={{
                        flex: 1, 
                        width: '100%', 
                        flexDirection: 'row', 
                        marginLeft: 4, 
                        marginRight: 2, 
                        borderRadius: 30, 
                        padding: 8, 
                        backgroundColor: '#D9D9D9', 
                        alignItems: 'center', 
                        shadowColor: '#000000', 
                        elevation: 3}}>

                        <TouchableOpacity>

                            <Entypo style={{marginLeft: 10}} name="emoji-happy" size={24} color="#4B4B4B" />
                        </TouchableOpacity>
                        
                        <TextInput onChangeText={(message)=>setMessage(message)} style={{width: '100%', marginLeft: 10}} placeholder='Mensagem...'></TextInput>

                        <View style={{flexDirection: 'row', position: 'absolute', right: 0, marginRight: 20}}>

                            <TouchableOpacity>

                                <Entypo style={{marginRight: 6}} name="attachment" size={24} color="#4B4B4B" />
                            </TouchableOpacity>

                            <TouchableOpacity>

                                <Entypo name="camera" size={24} color="#4B4B4B" />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View style={{marginRight: 4}}>

                        <TouchableOpacity style={{
                            padding: 14, 
                            marginLeft: 2, 
                            borderRadius: 50, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            backgroundColor: '#1565C0',
                            shadowColor: '#000000',
                            elevation: 3}}>

                            <FontAwesome onPress={sendMessage()} name="send" size={24} color="white" />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                
            </View>

            
        </View>
    );
}