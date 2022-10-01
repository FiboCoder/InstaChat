import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Keyboard, Modal, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ChatBoxMessageBlue, ChatBoxMessageLightGray, ImageBoxBlue, ImageBoxLightGray } from '../../../components/MessageBoxItem';
import { useNavigation } from '@react-navigation/native';

export default function ChatDetails(props){

    const navigation = useNavigation();

    //Function to conditional rendering of the message box
    const renderMessageBox = ({item}) =>{
        
        if(item.from == props.meEmail && item.type == 'text'){

            return <ChatBoxMessageBlue message={item}></ChatBoxMessageBlue>

        }else if(item.from == props.meEmail && item.type == 'photo'){

            return <Pressable onPress={()=>{props.setModalVisibility(true), setItem(item)}}><ImageBoxBlue message={item}></ImageBoxBlue></Pressable> 

        }else if(item.from != props.meEmail && item.type == 'text'){

            return <ChatBoxMessageLightGray message={item}></ChatBoxMessageLightGray>

        }else if(item.from != props.meEmail && item.type == 'photo'){

            return <Pressable onPress={()=>{props.setModalVisibility(true), setItem(item)}}><ImageBoxLightGray message={item}></ImageBoxLightGray></Pressable>

        }
    }

    const renderImageProfile = () => {

        if(props.route == "Contact_List"){

            if(props.contactData.profileImage == ''){
    
                return <View style={styles.imageProfileContainer}>
                            <FontAwesome5 style={styles.icon} name="user" size={30} color="white" />
                        </View>
            }else{

                return <Image style={styles.image} source={{uri: props.contactData.profileImage}}></Image>
            }
        }else if(props.route == "Chat_Single"){

            if(props.contactData.profileImage == ''){
    
                return <View style={styles.imageProfileContainer}>
                            <FontAwesome5 style={styles.icon} name="user" size={30} color="white" />
                        </View>
            }else{

                return <Image style={styles.image} source={{uri: props.contactData.profileImage}}></Image>
            }

        }else if(props.route == "Chat_Group"){

            if(props.data.groupProfileImage == ''){
    
                return <View style={styles.imageProfileContainer}>
                            <FontAwesome5 style={styles.icon} name="user" size={30} color="white" />
                        </View>
            }else{

                return <Image style={styles.image} source={{uri: props.data.groupProfileImage}}></Image>
            }
        }

        
    }

    const renderProfileName = () => {

        if(props.route == "Contact_List"){

            return <Text numberOfLines={1} style={styles.name}>{props.contactData.username ? props.contactData.username : "Nome do usuário"}</Text>

        }else if(props.route == "Chat_Single"){

            return <Text numberOfLines={1} style={styles.name}>{props.contactData.username ? props.contactData.username : "Nome do usuário"}</Text>

        }else if(props.route == "Chat_Group"){

            return <Text numberOfLines={1} style={styles.name}>{props.data.groupName ? props.data.groupName : "Nome do grupo"}</Text>

        }
    }

    return(

        <View style={{flex: 1}}>

            {
                props.modalVisibility
                    ?
                    <View style={{flex: 1}}>
                        <Modal visible={true} animationType="slide">
                            
                            <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: props.item.content}}>
                                <View style={styles.imageModalMainContainer}>
                                    <TouchableOpacity onPress={()=>{props.setModalVisibility(false)}} style={[styles.buttonContainer, {marginLeft: 4, marginTop: 6}]}>
                                        <AntDesign name="close" size={28} color="white" />
                                    </TouchableOpacity>
                                    <View>
                                        
                                    </View>
                                </View>
                            </ImageBackground>
                        </Modal>
                    </View>
                    :
                    null
            }

            <View style={styles.mainContainer}>

                <View style={styles.topContainer}>
                    
                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.buttonContainer, {position: 'absolute', left: 0, marginLeft: 4}]}>

                        <AntDesign  name="arrowleft" size={26} color="white" />
                    </TouchableOpacity>

                    <View style={{alignItems: 'center', marginLeft: 96, marginRight: 96,}}>

                        {
                            renderProfileName()
                        }
                        <View style={{marginTop: 10}}>

                            {
                                renderImageProfile()
                            }
                        </View>
                    </View>

                    
                        <TouchableOpacity onPress={()=>{props.setMenuModalVisibility(true)}} style={[styles.buttonContainer, {position: 'absolute', right: 0, marginLeft: 4}]}>

                            <Entypo name="dots-three-vertical" size={26} color="white" />
                        </TouchableOpacity>

                        <Modal

                            animationType="fade"
                            transparent={true}
                            visible={props.menuModalVisibility}
                            onRequestClose={()=>{

                                props.setMenuModalVisibility(false)
                            }}>

                                <View  style={styles.menuModalContainer} onTouchEnd={()=>{props.setMenuModalVisibility(false)}}>

                                    <View style={[styles.menuModalMainContainer]}>

                                        <TouchableOpacity onPress={()=>{props.openVoiceCallScreen()}} style={styles.menuItemContainer}>
                                            <Ionicons name="call" size={24} color="#4B4B4B" />
                                            <Text style={styles.menuItemText}>Chamada de voz</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>{props.openVideoCallScreen()}} style={[styles.menuItemContainer, {marginTop: 24}]}>
                                            <FontAwesome name="video-camera" size={24} color="#4B4B4B" />
                                            <Text style={styles.menuItemText}>Chamada de vídeo</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </Modal>
                </View>

                <View style={styles.messagesListContainer}>

                    <View style={styles.flatListContainer}>
                        <FlatList inverted contentContainerStyle={styles.flatList} data={props.messagesList} renderItem={renderMessageBox} keyExtractor={(item)=>props.messagesList.indexOf(item)}/>
                    </View>

                    <View style={styles.bottomContainer}>

                        <View style={styles.bottomMainContainer}>

                            <TouchableOpacity style={{marginLeft: 6}}>

                                <Entypo  name="emoji-happy" size={24} color="#4B4B4B" />
                            </TouchableOpacity>
                            
                            <TextInput onSubmitEditing={Keyboard.dismiss} onChangeText={(message)=>props.setMessageContent(message)} value={props.messageContent} style={{flex: 1, marginLeft: 10}} placeholder='Mensagem...'></TextInput>

                            <TouchableOpacity style={{marginLeft: 6, marginRight: 6}}>
                                <Entypo name="attachment" size={24} color="#4B4B4B" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{props.requestCameraPermission()}} style={{marginRight: 8}}>
                                <Entypo name="camera" size={24} color="#4B4B4B" />
                            </TouchableOpacity>
                            
                        </View>

                        <View style={{marginRight: 4}}>

                            <TouchableOpacity

                                onPress={()=>{props.sendMessage()}}
                            
                                style={styles.sendMessageButton}>

                                <FontAwesome name="send" size={24} color="white" />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    
                </View>
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({

    // ---------- IMAGE PROFILE ---------- //

    imageProfileContainer:{
        
        width: 80, 
        height: 80, 
        marginBottom: -40, 
        borderRadius: 50, 
        backgroundColor: '#A4A4A4', 
        alignItems: "center", 
        justifyContent: 'center'
    },

    icon:{
        
        shadowColor: '#000000', 
        elevation: 4
    },

    image:{
        
        width: 80, 
        height: 80, 
        marginBottom: -40
    
    },

    // ---------- PROFILE NAME ---------- //


    name:{
        
        color: 'white', 
        fontSize: 18, 
        fontWeight: '600'
    },

    // ---------- IMAGE MODAL ---------- //


    imageModalMainContainer:{

        flexDirection: 'row', 
        width: '100%', 
        paddingTop: 6, 
        paddingBottom: 6, 
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    // ---------- MAIN ---------- //


    mainContainer:{
        
        flex: 1,
        paddingTop: Constants.statusBarHeight,  
        backgroundColor: '#1565C0'
    },

    topContainer:{
        
        zIndex: 1, 
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 20, 
        paddingBottom: -10, 
        backgroundColor: '#1565C0'
    },

    messagesListContainer:{
        
        flex: 1, 
        height: '100%', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        backgroundColor: 'white', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        shadowColor: '#000000', 
        elevation: 4
    },

    flatListContainer:{
        
        flex: 1, 
        marginBottom: 10, 
        marginTop: 60, 
        marginBottom: 4, 
        marginLeft: 4, 
        marginRight: 4, 
        flexDirection: 'column'
    },

    flatList:{
    
        flexDirection: 'column-reverse', 
        paddingLeft: 6, 
        paddingRight: 6
    },

    bottomContainer:{
        
        marginBottom: 6, 
        flexDirection: 'row', 
        width: '100%'
    },

    bottomMainContainer:{

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
        elevation: 3
    },

    sendMessageButton:{

        padding: 14, 
        marginLeft: 2, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#1565C0',
        shadowColor: '#000000',
        elevation: 3
    },

    // ---------- MODAL MENU ---------- //


    menuModalContainer:{
        
        flex: 1, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    menuModalMainContainer:{

        position: 'absolute',
        right: 0,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 16,
        elevation: 10,

    },


    buttonContainer:{

        padding: 6,
        borderradius: 50
    },

    
    menuItemContainer:{

        flexDirection: 'row',
        alignItems: 'center'
    },
    menuItemText:{

        marginLeft: 10
    }
});