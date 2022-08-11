import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Register(){

    return(

        <View style={styles.mainContainer}>

            <View>

                <Text>Cadastrar</Text>
            </View>

            <View style={styles.textFields}>

                <FontAwesome name="envelope-o" size={20} color="#616161" />
                <TextInput style={{marginStart: 12, width: '100%'}} placeholder="E-mail"></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#616161" />
                <TextInput style={{marginStart: 8, width: '100%'}} placeholder="Senha"></TextInput>
            </View>

            <View style={styles.textFields}>

                <AntDesign name="lock" size={24} color="#616161" />
                <TextInput style={{marginStart: 8, width: '100%'}} placeholder="Confirmar senha"></TextInput>
            </View>

            <TouchableOpacity style={{marginTop: 40, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#304FFE'}}>

                <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>

                <Text>Já tem conta? </Text>
                <Text style={{color: '#304FFE'}}>Entrar</Text>
                <Text>.</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer:{

        flex:1,
        padding: 10,
        backgroundColor: "white"

    },

    textFields:{

        flexDirection: "row",
        backgroundColor: 'white',
        marginTop: 20,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 1,
        elevation: 6
    }
})