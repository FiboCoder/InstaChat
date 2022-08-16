import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export const ChatComponent = (props)=>{

    /*<Image style={{width: 30, height: 30}} source={require('../../assets/images/vanmal.png')}></Image>*/

    return(

        <View style={{flex: 1, marginBottom: 24}}>

            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}}>
            

                <View>
                    

                        {props.profileImage == '' ?
                        
                        <View style={{width: 58, height: 58, borderRadius: 50, backgroundColor: '#A4A4A4', alignItems: "center", justifyContent: 'center'}}>
                            <FontAwesome5 name="user" size={24} color="white" />
                        </View>
                        :

                        <Image style={{width: 58, height: 58}} source={require('../../assets/images/mal.png')}></Image>
                        
                        }
                    
                </View>
                    

                    <View style={{flex: 1,flexDirection: 'row', marginStart: 20}}>
                        <View style={{}}>

                            <Text key={props.key} style={{color: '#1E1E1E', fontSize: 18, fontWeight: '700'}}>{props.text}</Text>
                            <Text style={{color: '#5E5E5E'}}>Last Message</Text>
                        </View>

                        <View style={{position: 'absolute', right: 0, alignSelf: 'flex-start'}}>
                            
                            <Text style={{color: '#1E1E1E', fontSize: 14}}>00:00 AM</Text>

                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );
}