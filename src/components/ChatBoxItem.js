import { View, Text } from "react-native";

export const ChatBoxMessageLightGray = (props)=>{

    console.log("Props"+props)

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{flex: 1, width: '80%', alignSelf: 'flex-start', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3,  borderRadius: 10, backgroundColor: '#E6E6E6', shadowColor: '#000000', elevation: 2}}>
                    <Text style={{color: '#1F1F1F'}}>{props.messageProp}</Text>
                    <Text style={{marginTop: 4, alignSelf: 'flex-end', color: '#2196F3'}}>{props.statusProp}</Text>
                </View>
                <Text style={{marginTop: 4, color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{props.timeProp}</Text>
            </View>
        </View>
    );
}

export const ChatBoxMessageBlue = (props) =>{

    return(

        <View style={{flex: 1, marginBottom: 14}}>
            <View style={{width: '80%', alignSelf: 'flex-end', padding: 3}}>
                <View style={{padding: 10, width: '100%', marginBottom: 3, marginTop: 3, padding: 10, borderRadius: 10, backgroundColor: '#2196F3', shadowColor: '#000000', elevation: 2}}>
                    <Text style={{color: 'white'}}>{props.messageProp}</Text>
                    <Text style={{marginTop: 4, alignSelf: 'flex-end', color: 'white'}}>{props.statusProp}</Text>
                </View>
                <Text style={{marginTop: 4, alignSelf: 'flex-end', color: '#1F1F1F', fontSize: 12, fontWeight: '600'}}>{props.timeProp}</Text>
            </View>
        </View>
    );
}