import React, { useEffect, useContext, useReducer, useMemo, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

import { Image, LogBox } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import LoginController from './src/controller/main/auth/LoginController';
import RegisterController from './src/controller/main/auth/RegisterController';

import AddContactController from './src/controller/main/contacts/AddContactController';
import CreateGroupController from './src/controller/main/contacts/CreateGroupController';
import ContactsController from './src/controller/main/contacts/ContactsController';

import ChatsController from './src/controller/main/chats/ChatsController';
import ChatDetailsController from './src/controller/main/chats/ChatDetailsController';

import SettingsController from './src/controller/main/settings/SettingsController';
import ProfileSettingsController from './src/controller/main/settings/ProfileSettingsController';
import PersonalInfoSettingsController from './src/controller/main/settings/PersonalInfoSettingsController';
import ChatsSettingsController from './src/controller/main/settings/ChatsSettingsController';

import CameraScreen from './src/screens/general/Camera';
import CameraController from './src/controller/main/general/CameraController';

import Splash from './src/screens/general/Splash';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/firebase';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

export default function App({navigation}) {

  LogBox.ignoreAllLogs(true);

  const AuthContext = createContext();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.token,
            isLoading: false
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
          };

        case 'USER_DATA':
          return{

            ...prevState,
            userData: action.userData,
            meEmail: action.meEmail,
            isLoading: false
          }
      }
    }, {

      isSignedIn: false,
      userToken: null,
      data: null,
      meEmail: null,
      userData: null,
      isLoading: true
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

      let userToken = null;
      let data = null;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        data = await SecureStore.getItemAsync('userChatsConfigs');

        onAuthStateChanged(auth, (user)=>{

          if(user){

            if(userToken != null && user != null){

              if(userToken == user.uid){
    
                dispatch({type: 'USER_DATA', userData: user, meEmail: user.email})
                dispatch({type: 'RESTORE_TOKEN', token: userToken});

              }else{
    
                dispatch({type: 'USER_DATA', userData: user, meEmail: user.email})
                dispatch({type: 'RESTORE_TOKEN', token: null});
              }
            }else{

              dispatch({type: 'RESTORE_TOKEN', token: null});
            }
          }else{

            dispatch({type: 'RESTORE_TOKEN', token: null});
          }
        });
        
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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

        dispatch({ type: 'SIGN_IN',  token: data.user.uid});

      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data.user.uid});
        
      },

      userChatsConfigs: async (data) => {

        dispatch({type: 'USER_CHATS_CONFIGS', data: data})
      }
      
    }),
    []
  );

  function getTabBarVisibility(route){
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if(routeName === 'ContactChatDetails'){

      return 'none';
    }else if(routeName === 'AddContact'){

      return 'none';
    }else if(routeName === 'CreateGroup'){

      return 'none';
    }else if (routeName == 'ChatDetails'){

      return 'none';
    }else if(routeName == 'CameraChatsApp'){

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

  function RegisterScreen({}) {
    return (
      <RegisterController></RegisterController>
    );
  }
  
  function LoginScreen({}) {
  
    const {signIn} = useContext(AuthContext);
  
    return (
        <LoginController signIn={signIn}></LoginController>
    );
  }

  function AuthStackScreen(){

    return(

      <AuthStack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown: false}}>

        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen}></AuthStack.Screen>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen}></AuthStack.Screen>

      </AuthStack.Navigator>
    );
  }

  // --------------- END - AUTH STACK ---------------


  // --------------- BEGIN - CONTACTS STACK ---------------

  function ContactsMain({}) {

    
    return (

      <>
        {
          state.meEmail != null
            ?
              <ContactsController meEmail={state.meEmail}></ContactsController>
            :
              <></>
        }
      </>
    );
  }

  function AddContactScreen({}) {
    return (
      <AddContactController></AddContactController>
    );
  }

  const CreateGroupScreen = ({}) => {

    return(

      <CreateGroupController></CreateGroupController>
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
        <ContactsStack.Screen name='ContactChatDetails' component={ChatDetailsController}></ContactsStack.Screen>


      </ContactsStack.Navigator>
    );
  }

    /* --------------- END - CONTACTS STACK --------------- */

    /* --------------- BEGIN - CHATS SCREENS FUNCTIONS AND ROUTES --------------- */

  function ChatsMain({navigation}) {

    
    return (
      <>
        {
          state.meEmail != null
            ?
              <ChatsController meEmail={state.meEmail}></ChatsController>
            :
              <></>
        }
      </>
    );
  }
  
  function ChatDetailsScreen({navigation}){
  
    return(
  
      <ChatDetailsController navigation={navigation}></ChatDetailsController>
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

  const SettingsMain = ({}) =>{
    return (
      <>
        {
          state.meEmail != null
            ?
              <SettingsController meEmail={state.meEmail}></SettingsController>
            :
              <></>
        }
      </>
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

      <SettingsStack.Navigator initialRouteName='SettingsMain' screenOptions={({route})=>({
        headerShown: false,
      })}>
      <SettingsStack.Screen name='SettingsMain' component={SettingsMain}/>
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

      <CameraController></CameraController>
    );
  }

  const SplashMain = () =>{

    return(

      <Splash></Splash>
    );
  }

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Tab.Navigator >

          {

            state.isLoading == true 
              ?
                <Tab.Screen options={{headerShown: false, tabBarStyle: {display: 'none'}}} name="SplashMain" component={SplashMain}/>
              :
                state.userToken == null
                  ?
                    (
                      <>
                        <Tab.Screen name="AuthStack" options={({route})=>({headerShown: false, tabBarStyle: {display: 'none'}})} component={AuthStackScreen} />
                        
                      </>
                    )
                  :
                    (
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
                    )
          }
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}