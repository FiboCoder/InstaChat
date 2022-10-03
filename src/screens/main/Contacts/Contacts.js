import React, {  } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet, FlatList, LogBox } from "react-native";
import Constants  from "expo-constants";

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Contacts = (props) =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.topContainer}>
                <Image style={styles.topIcon} source={require('../../../../assets/images/chat100x100_white.png')}></Image>
                <Text style={styles.title}>Contatos</Text>
                <TouchableOpacity style={styles.searchIcon}>
                    <AntDesign  name="search1" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>

                <View style={styles.topMainContainer}>

                  <TouchableOpacity onPress={()=>{navigation.navigate('CreateGroup', {meEmail: props.meEmail})}} style={styles.topButton}>

                    <View style={styles.iconContainer}>

                      <AntDesign name="addusergroup" size={34} color="white" />

                    </View>

                    <Text style={{fontSize: 16, fontWeight: '600'}}>Criar grupo</Text>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{navigation.navigate('AddContact', {meEmail: props.meEmail})}} style={styles.topButton}>

                    <View style={styles.iconContainer}>

                        <AntDesign name="adduser" size={34} color="white" />

                    </View>

                    <Text style={{fontSize: 16, fontWeight: '600'}}>Adicionar contato</Text>

                  </TouchableOpacity>
                </View>

                
                <View style={{height: 1, backgroundColor: '#e0e0e0'}}></View>

                <View style={{flex: 1, marginTop: 20}}>

                  <FlatList data={props.contactsList} renderItem={props.renderContactItem} keyExtractor={(item)=>props.contactsList.indexOf(item)}/>

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

  topIcon:{
    
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

  searchIcon:{

    position: 'absolute', 
    right: 0, 
    marginEnd: 10
  },

  mainContainer:{
    
    height: '100%', 
    padding: 26, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    elevation: 4
  },

  topMainContainer:{
    
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 16
  },

  topButton:{
    
    flexDirection: 'column', 
    alignItems: 'center'
  },

  iconContainer:{
    
    width: 62, 
    height: 62, 
    borderRadius: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#A4A4A4'
  }

  });

  export default Contacts;