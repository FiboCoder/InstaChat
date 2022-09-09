import { View, Text, Image, Modal, TouchableWithoutFeedback } from "react-native";
import { Format } from "../utils/Format";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export const ChatBoxMessageLightGray = (props)=>{

    const getStatusIcon = () =>{

        if(props.message.status == 'waiting'){

            return <Feather style={{marginTop: 4, alignSelf: 'flex-end'}} name="clock" size={16} color="#1F1F1F" />;
        }else if(props.message.status == 'sent'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-sharp" size={16} color="#1F1F1F" />;
        }else if(props.message.status == 'received'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-done-sharp" size={16} color="#1F1F1F" />;
        }else if(props.message.status == 'read'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-circle-sharp" size={16} color="#1F1F1F" />;
        }
    }

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{flex: 1, width: '80%', alignSelf: 'flex-start', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3,  borderRadius: 10, backgroundColor: '#E6E6E6', shadowColor: '#000000', elevation: 2}}>
                    <Text style={{color: '#1F1F1F'}}>{props.message.content}</Text>
                </View>
                <Text style={{marginTop: 4, color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{Format.timeStampToTime(props.message.time)}</Text>
            </View>
        </View>
    );
}

export const ChatBoxMessageBlue = (props) =>{

    const getStatusIcon = () =>{

        if(props.message.status == 'waiting'){

            return <Feather style={{marginLeft: 8}} name="clock" size={16} color="#2196F3" />;
        }else if(props.message.status == 'sent'){

            return <Ionicons style={{marginLeft: 8}} name="checkmark-sharp" size={16} color="#2196F3" />;
        }else if(props.message.status == 'received'){

            return <Ionicons style={{marginLeft: 8}} name="checkmark-done-sharp" size={16} color="#2196F3" />;
        }else if(props.message.status == 'read'){

            return <Ionicons style={{marginLeft: 8}} name="checkmark-circle-sharp" size={16} color="#2196F3" />;
        }
    }

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{width: '80%', alignSelf: 'flex-end', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3, padding: 10, borderRadius: 10, backgroundColor: '#2196F3', shadowColor: '#000000', elevation: 2}}>
                    <Text style={{color: 'white'}}>{props.message.content}</Text>
                    
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4, alignSelf: 'flex-end', color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>

                    <Text style={{color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{Format.timeStampToTime(props.message.time)}</Text>
                    {
                        getStatusIcon()
                    }
                </View>
                
            </View>
        </View>
    );
}

export const ImageBoxLightGray = (props) =>{

    const getStatusIcon = () =>{

        if(props.message.status == 'waiting'){

            return <Feather style={{marginTop: 4, alignSelf: 'flex-end'}} name="clock" size={16} color="#2196F3" />;
        }else if(props.message.status == 'sent'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-sharp" size={16} color="#2196F3" />;
        }else if(props.message.status == 'received'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-done-sharp" size={16} color="#2196F3" />;
        }else if(props.message.status == 'read'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-circle-sharp" size={16} color="#2196F3" />;
        }
    }

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{width: '80%', alignSelf: 'flex-start', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3, padding: 10, borderRadius: 10, backgroundColor: '#E6E6E6', shadowColor: '#000000', elevation: 2}}>
                    <Image style={{width: '100%', height: 300, resizeMode: 'cover'}} resizeMode={"contain"} source={{uri: props.message.content}}></Image>
                </View>
                <Text style={{marginTop: 4, alignSelf: 'flex-start', color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{Format.timeStampToTime(props.message.time)}</Text>
            </View>
        </View>
    );
}

export const ImageBoxBlue = (props) =>{

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [modalVisibility, setModalVisibility] = useState();

    const getStatusIcon = () =>{

        if(props.message.status == 'waiting'){

            return <Feather style={{marginLeft: 8}} name="clock" size={16} color="#2196F3" />;
        }else if(props.message.status == 'sent'){

            return <Ionicons style={{marginLeft: 8}} name="checkmark-sharp" size={16} color="#2196F3" />;
        }else if(props.message.status == 'received'){

            return <Ionicons style={{marginLeft: 8}} name="checkmark-done-sharp" size={16} color="#2196F3" />;
        }else if(props.message.status == 'read'){

            return <Ionicons style={{marginLeft: 8}} name="checkmark-circle-sharp" size={16} color="#2196F3" />;
        }
    }

    Image.getSize(props.message.content, (widthI, heightI)=>{

        setWidth(widthI);
        setHeight(heightI);
    } )

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{flex: 1, width: '80%', alignSelf: 'flex-end', padding: 3}}>

                <View style={{flexDirection: 'column', padding: 10, marginBottom: 3, marginTop: 3, padding: 10, borderRadius: 10, backgroundColor: '#2196F3', shadowColor: '#000000', elevation: 2}}>

                    <Image style={{width: '100%', height: 300, resizeMode: 'cover'}} resizeMode={"contain"} source={{uri: props.message.content}}></Image>

                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4, alignSelf: 'flex-end', color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>

                    <Text style={{color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{Format.timeStampToTime(props.message.time)}</Text>
                    {
                        getStatusIcon()
                    }
                </View>
            </View>
        </View>
    );
}