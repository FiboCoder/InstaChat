import { View, Text } from "react-native";
import { Format } from "../utils/Format";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const ChatBoxMessageLightGray = (props)=>{

    const getStatusIcon = () =>{

        if(props.message.status == 'waiting'){

            return <Feather style={{marginTop: 4, alignSelf: 'flex-end'}} name="clock" size={16} color="white" />;
        }else if(props.message.status == 'sent'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-sharp" size={16} color="white" />;
        }else if(props.message.status == 'received'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-done-sharp" size={16} color="white" />;
        }else if(props.message.status == 'read'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-circle-sharp" size={16} color="white" />;
        }
    }

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{flex: 1, width: '80%', alignSelf: 'flex-start', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3,  borderRadius: 10, backgroundColor: '#E6E6E6', shadowColor: '#000000', elevation: 2}}>
                    <Text style={{color: '#1F1F1F'}}>{props.message.content}</Text>
                    {
                        getStatusIcon()
                    }
                </View>
                <Text style={{marginTop: 4, color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{Format.timeStampToTime(props.message.time)}</Text>
            </View>
        </View>
    );
}

export const ChatBoxMessageBlue = (props) =>{

    const getStatusIcon = () =>{

        if(props.message.status == 'waiting'){

            return <Feather style={{marginTop: 4, alignSelf: 'flex-end'}} name="clock" size={16} color="white" />;
        }else if(props.message.status == 'sent'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-sharp" size={16} color="white" />;
        }else if(props.message.status == 'received'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-done-sharp" size={16} color="white" />;
        }else if(props.message.status == 'read'){

            return <Ionicons style={{marginTop: 4, alignSelf: 'flex-end'}} name="checkmark-circle-sharp" size={16} color="white" />;
        }
    }

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{width: '80%', alignSelf: 'flex-end', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3, padding: 10, borderRadius: 10, backgroundColor: '#2196F3', shadowColor: '#000000', elevation: 2}}>
                    <Text style={{color: 'white'}}>{props.message.content}</Text>
                    {
                        getStatusIcon()
                    }
                </View>
                <Text style={{marginTop: 4, alignSelf: 'flex-end', color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{Format.timeStampToTime(props.message.time)}</Text>
            </View>
        </View>
    );
}