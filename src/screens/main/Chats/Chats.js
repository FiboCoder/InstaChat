import React, {  } from "react";
import { Image, View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from "react-native";
import Constants  from "expo-constants";
import { AntDesign } from '@expo/vector-icons';

const Chats = (props) =>{

    return(

        <View style={styles.container}>

            {

                !props.searchBarStatus
                    ?

                    <View style={styles.topContainer}>
                        <Image style={styles.icon} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                        <Text style={styles.title}>Conversas</Text>
                        <TouchableOpacity onPress={()=>{props.setSearchBarStatus(!props.searchBarStatus)}} style={styles.searchButton}>
                            <AntDesign  name="search1" size={26} color="white" />
                        </TouchableOpacity>
                    </View>
                    :

                    <View style={[styles.topContainer, {flexDirection: "column", alignItems: "flex-start"}]}>

                        <View style={styles.searchBar}>

                        <TouchableOpacity onPress={()=>{props.setSearchBarStatus(!props.searchBarStatus)}}>
                            <AntDesign  name="arrowleft" size={26} color="black" /> 
                        </TouchableOpacity>
                        <TextInput onChangeText={(text)=>{props.filterList(text)}} style={styles.textInput}></TextInput>
                        </View>
                        
                    </View>
            }

            <View style={styles.flatListContainer}>

                <View style={styles.flatList}>
                    <FlatList data={props.filteredChatsList} renderItem={props.renderChatItem} keyExtractor={(item)=>props.filteredChatsList.indexOf(item)}/>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        
        flex: 1,
        paddingTop: Constants.statusBarHeight, 
        backgroundColor: '#1565C0'
    },

    topContainer:{
        
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingTop: 20, 
        paddingBottom: 30, 
        backgroundColor: '#1565C0'
    },

    icon:{
        
        marginStart: 10, 
        width: 50, 
        height: 50
    },

    title:{
        
        marginStart: 10,  
        color: 'white', 
        fontSize: 24, 
        fontWeight: '700'
    },

    searchButton:{
        
        position: 'absolute', 
        right: 0, 
        marginEnd: 10
    },

    flatListContainer:{
        
        height: '100%', 
        padding: 20, 
        backgroundColor: 'white', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        shadowColor: '#000000', 
        elevation: 4
    },

    flatList:{
        
        flex: 1, 
        marginBottom: 10, 
        marginTop: 20, 
        marginBottom: 4, 
        marginLeft: 4, 
        marginRight: 4, 
        flexDirection: 'column'
    },

    searchBar:{

        width: "94%",
        flexDirection: "row",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 24,
        padding: 8
      },
    
      textInput:{
    
        flex: 1,
        marginLeft: 10,
        marginRight: 10
      }
});

export default Chats;