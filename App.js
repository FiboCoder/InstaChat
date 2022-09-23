import React, {useState, useEffect, useContext, useReducer, useMemo, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Register from './src/screens/auth/Register';
import Login from './src/screens/auth/Login';

import { Image } from 'react-native';

import Contacts from './src/screens/main/Contacts/Contacts';
import Chats from './src/screens/main/Chats/Chats';

import * as SecureStore from 'expo-secure-store';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ChatDetails from './src/screens/main/Chats/ChatDetails';
import AddContact from './src/screens/main/Contacts/AddContact';
import CameraScreen from './src/screens/general/Camera';
import CreateGroup from './src/screens/main/Contacts/CreateGroup';
import { ChatsSettings } from './src/screens/main/Settings/ChatsSettings';
import SettingsController from './src/controller/settings/SettingsController';
import ProfileSettingsController from './src/controller/settings/ProfileSettingsController';
import PersonalInfoSettingsController from './src/controller/settings/PersonalInfoSettingsController';
import ChatsSettingsController from './src/controller/settings/ChatsSettingsController';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

export default function App({navigation}) {

  const AuthContext = createContext();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.token
          };
        case 'SIGN_IN':

        if(action.token){

          SecureStore.setItemAsync('userToken', action.token);
        }
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.token
          };
        case 'SIGN_OUT':
          SecureStore.deleteItemAsync('userToken');
          return {
            ...prevState,
            isSignedIn: false,
            userToken: null
          };

        case 'USER_CHATS_CONFIGS':
          SecureStore.setItemAsync('userChatsConfigs', action.data);
          return{

            ...prevState,
            data: action.data
          }
      }
    }, {

      isSignedIn: false,
      userToken: null,
      data: null
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

      let userToken;
      let data;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        data = await SecureStore.getItemAsync('userChatsConfigs');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN',  token: 'niceToken'});

      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'niceToken'});
        
      },

      userChatsConfigs: async (data) => {

        dispatch({type: 'USER_CHATS_CONFIGS', data: data})
      }
      
    }),
    []
  );

  function getTabBarVisibility(route){
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if(routeName === 'ChatDetails'){

      return 'none';
    }else if(routeName === 'AboutUser'){

      return 'none';
    }else if(routeName === 'PersonalInformation'){

      return 'none';
    }else if(routeName === 'ChatConfiguration'){

      return 'none';
    }else if(routeName === 'AddContact'){

      return 'none';
    }else if(routeName === 'CreateGroup'){

      return 'none';
    }else if (routeName == 'CameraChatsApp'){

      return 'none';
    }else if(routeName == 'ContactChatDetails'){

      return 'none';
    }else if(routeName == 'ProfileSettingsScreen'){

      return 'none';
    }else if(routeName == 'PersonalInfoSettingsScreen'){

      return 'none';
    }else if(routeName == 'ChatsSettingsScreen'){

      return 'none';
    }

    return 'flex'

  }

  // --------------- BEGIN - AUTH STACK ---------------

  function RegisterApp({}) {
    return (
      <Register></Register>
    );
  }
  
  function LoginApp({}) {
  
    const {signIn} = useContext(AuthContext);
  
    return (
        <Login signIn={signIn}></Login>
    );
  }

  function AuthRoutes(){

    return(

      <AuthStack.Navigator initialRouteName='Register' screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Register" component={RegisterApp}></AuthStack.Screen>
        <AuthStack.Screen name="Login" component={LoginApp}></AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }

  // --------------- END - AUTH STACK ---------------


  // --------------- BEGIN - CONTACTS STACK ---------------

  function ContactsMain({}) {

    
    return (
      <Contacts></Contacts>
    );
  }

  function AddContactScreen({}) {
    return (
      <AddContact></AddContact>
    );
  }

  const CreateGroupScreen = ({}) => {

    return(

      <CreateGroup></CreateGroup>
    )
  }

  function ContactsStackScreen(){

    return(

      <ContactsStack.Navigator initialRouteName='ContactsMain' screenOptions={({route})=>({
        headerShown: false,
      })}>

        <ContactsStack.Screen name='ContactsMain' component={ContactsMain}></ContactsStack.Screen>
        <ContactsStack.Screen name='CreateGroup' component={CreateGroupScreen}></ContactsStack.Screen>
        <ContactsStack.Screen name='AddContact' component={AddContactScreen}></ContactsStack.Screen>
        <ContactsStack.Screen name='ContactChatDetails' component={ChatDetails}></ContactsStack.Screen>


      </ContactsStack.Navigator>
    );
  }

    /* --------------- END - CONTACTS STACK --------------- */

    /* --------------- BEGIN - CHATS SCREENS FUNCTIONS AND ROUTES --------------- */

  function ChatsMain({navigation}) {
    return (
      <Chats></Chats>
    );
  }
  
  function ChatDetailsScreen({navigation}){
  
    return(
  
      <ChatDetails navigation={navigation}></ChatDetails>
    );
  
  }

  function ChatsRoutes(){
  
    return(
  
    <ChatStack.Navigator initialRouteName='ChatsMain' screenOptions={({route})=>({
      headerShown: false,
    })}>
  
      <ChatStack.Screen name="ChatsMain" component={ChatsMain}  />
  
      <ChatStack.Screen name='ChatDetails' component={ChatDetailsScreen}/>

      <ChatStack.Screen name="CameraChatsApp" component={CameraApp}/>
  
    </ChatStack.Navigator>
    );
  
    
  }

    /* --------------- END - CHATS SCREENS FUNCTIONS AND ROUTES --------------- */

    /* --------------- BEGIN - SETTINGS SCREENS FUNCTIONS AND ROUTES --------------- */

  const SettingsScreen = ({}) =>{
    return (
      <SettingsController></SettingsController>
    );
  }

  const ProfileSettingsScreen = ({}) =>{

    return(

      <ProfileSettingsController></ProfileSettingsController>
    );
  }

  const PersonalInfoSettingsScreen = ({}) =>{

    const {signOut} = useContext(AuthContext);

    return(

      <PersonalInfoSettingsController signOut={signOut}></PersonalInfoSettingsController>
    );
  }

  const ChatsSettingsScreen = ({}) =>{

    const { userChatsConfigs } = useContext(AuthContext);

    if(state.data != null){

      return(

        <ChatsSettingsController userChatsConfigs={userChatsConfigs} chatsConfigs={state.data}></ChatsSettingsController>
      );
    }else{

      return(

        <ChatsSettingsController userChatsConfigs={userChatsConfigs}></ChatsSettingsController>
      );
    }

    
  }

  const SettingsStackScreen = () =>{

    return(

      <SettingsStack.Navigator initialRouteName='SettingsScreen' screenOptions={({route})=>({
        headerShown: false,
      })}>
      <SettingsStack.Screen name='SettingsScreen' component={SettingsScreen}/>
      <SettingsStack.Screen name='ProfileSettingsScreen' component={ProfileSettingsScreen}/>
      <SettingsStack.Screen name='PersonalInfoSettingsScreen' component={PersonalInfoSettingsScreen}/>
      <SettingsStack.Screen name='ChatsSettingsScreen' component={ChatsSettingsScreen}/>
      <SettingsStack.Screen name='CameraSettingsApp' component={CameraApp}/>
    </SettingsStack.Navigator>
    );
    
  }



    /* --------------- END - SETTINGS SCREENS FUNCTIONS AND ROUTES --------------- */


  function CameraApp({}){

    return(

      <CameraScreen></CameraScreen>
    );
  }

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Tab.Navigator >

          {state.userToken == null ? (

            <>
              <Tab.Screen name="AuthStack" options={({route})=>({headerShown: false, tabBarStyle: {display: 'none'}})} component={AuthRoutes} />
              
            </>
          ) : (

            <>

              {/* --------------- BEGIN CONTACTS ROUTES --------------- */}

              <Tab.Screen name="ContactsApp" options={({route})=>({headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <FontAwesome5 name="user-alt" size={24} color="#4B4B4B" />
                  :
                  <FontAwesome5 name="user" size={24} color="#4B4B4B" />

                );
              }, tabBarStyle: {display: getTabBarVisibility(route)}})} component={ContactsStackScreen}></Tab.Screen>

              {/* --------------- END CONTACTS ROUTES --------------- */}


              {/* --------------- BEGIN CHATS ROUTES --------------- */}

              <Tab.Screen name="ChatsApp" options={({route})=>({
                headerShown: false, 
                tabBarIcon: ({})=>{

                  return(

                      <Image style={{width: 70, height: 70, marginBottom: 50}} source={require('./assets/images/logo.png')}></Image>
                  );
                },
                tabBarStyle: {display: getTabBarVisibility(route)}, 
                tabBarShowLabel: false})} component={ChatsRoutes} />

              {/* --------------- END CHATS ROUTES --------------- */}


              {/* --------------- BEGIN SETTINGS ROUTES --------------- */}

              <Tab.Screen name="SettingsApp" options={({route})=>({

                headerShown: false, 
                tabBarShowLabel: false, 
                tabBarIcon: ({focused})=>{

                  return (

                    focused
                    ? 
                    <Ionicons name="settings" size={24} color="#4B4B4B" />
                    :
                    <Ionicons name="settings-outline" size={24} color="#4B4B4B" />

                  );
                },
                tabBarStyle: {display: getTabBarVisibility(route)}
              })} component={SettingsStackScreen}></Tab.Screen>

              {/* --------------- END SETTINGS ROUTES --------------- */}
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}