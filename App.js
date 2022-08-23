import React, {useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Register from './src/screens/auth/Register';
import Login from './src/screens/auth/Login';

import { Image, Touchable, TouchableOpacity } from 'react-native';

import Contacts from './src/screens/main/Contacts/Contacts';
import Calls from './src/screens/main/Calls/Callls';
import Chats from './src/screens/main/Chats/Chats';

import * as SecureStore from 'expo-secure-store';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Takes from './src/screens/main/Takes/Takes';
import Settings from './src/screens/main/Settings/Settings';
import ChatDetails from './src/screens/main/Chats/ChatDetails';
import AddContact from './src/screens/main/Contacts/AddContact';

const Tab = createBottomTabNavigator();
const ChatStack = createStackNavigator();
const ContactsStack = createStackNavigator();



export default function App() {

  const AuthContext = React.createContext();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,

            isSignedIn: true,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignedIn: false,
            userToken: null,
          };
      }
    },
    {
      isSignedIn: false,
      userToken: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = '';

      try {
        userToken = await SecureStore.getItemAsync('userToken');
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

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN',  token: 'userToken'});
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'userToken'});
      },
    }),
    []
  );

  function getTabBarVisibility(route){
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if(routeName === 'ChatDetails'){

      return 'none';
    }else if(routeName === 'CallDetails'){

      return 'none';
    }else if(routeName === 'AboutUser'){

      return 'none';
    }else if(routeName === 'PersonalInformation'){

      return 'none';
    }else if(routeName === 'ChatConfiguration'){

      return 'none';
    }else if(routeName === 'AddContact'){

      return 'none';
    }

    return 'flex'

  }


  // --------------- BEGIN CONTACTS STACK ---------------

  function ContactsMain({}) {
    return (
      <Contacts></Contacts>
    );
  }

  function AddContactF({}) {
    return (
      <AddContact></AddContact>
    );
  }

  function ContactsStackScreen(){

    return(

      <ContactsStack.Navigator initialRouteName='ContactsMain' screenOptions={({route})=>({
        headerShown: false,
      })}>

        <ContactsStack.Screen name='ContactsMain' component={ContactsMain}></ContactsStack.Screen>
        <ContactsStack.Screen name='AddContact' component={AddContactF}></ContactsStack.Screen>


      </ContactsStack.Navigator>
    );
  }

    // --------------- END CONTACTS STACK ---------------

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

  function ChatStackScreen(){
  
    return(
  
    <ChatStack.Navigator initialRouteName='ChatsMain' screenOptions={({route})=>({
      headerShown: false,
    })}>
  
      <ChatStack.Screen name="ChatsMain" component={ChatsMain}  />
  
      <ChatStack.Screen name='ChatDetails' component={ChatDetailsScreen}/>
  
    </ChatStack.Navigator>
    );
  
    
  }

  function RegisterApp({}) {
    return (
      <Register></Register>
    );
  }
  
  function LoginApp({}) {
  
    const { signIn } = useContext(AuthContext);
  
    return (
        <Login signIn={signIn}></Login>
    );
  }

 

  function CallsApp({}) {
    return (
      <Calls></Calls>
    );
  }

  function TakesApp({}) {
    return (
      <Takes></Takes>
    );
  }

  function SettingsApp({}) {
    return (
      <Settings></Settings>
    );
  }


  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Tab.Navigator >

          {state.isSignedIn == true ? (

            <>
              <Tab.Screen name="RegisterApp" options={{headerShown: false, tabBarStyle: {display: 'none'}}} component={RegisterApp} />
              <Tab.Screen name="LoginApp" options={{headerShown: false, tabBarStyle: {display: 'none'}}} component={LoginApp} />
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


              {/* --------------- BEGIN CALLS ROUTES --------------- */}

              <Tab.Screen name="CallsApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <Ionicons name="call" size={24} color="#4B4B4B" />
                  :
                  <Ionicons name="call-outline" size={24} color="#4B4B4B" />

                );
              },}} component={CallsApp}></Tab.Screen>

              {/* --------------- END CALLS ROUTES --------------- */}


              {/* --------------- BEGIN CHATS ROUTES --------------- */}

              <Tab.Screen name="ChatsApp" options={({route})=>({
                headerShown: false, 
                tabBarIcon: ({})=>{

                  return(

                    <TouchableOpacity>

                      <Image style={{width: 80, height: 80, marginBottom: 50}} source={require('./assets/images/logo.png')}></Image>
                    </TouchableOpacity>
                  );
                },
                tabBarStyle: {display: getTabBarVisibility(route)}, 
                tabBarShowLabel: false})} component={ChatStackScreen} />

              {/* --------------- END CHATS ROUTES --------------- */}


              {/* --------------- BEGIN TAKES ROUTES --------------- */}

              <Tab.Screen name="TakesApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <Image style={{width: 24, height: 24}} source={require('./assets/images/clapper100x100_fill.png')}></Image>

                  :
                  <Image style={{width: 24, height: 24}} source={require('./assets/images/clapper100x100_outline.png')}></Image>


                );
              },}} component={TakesApp}></Tab.Screen>

              {/* --------------- END TAKES ROUTES --------------- */}


              {/* --------------- BEGIN SETTINGS ROUTES --------------- */}

              <Tab.Screen name="SettingsApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <Ionicons name="settings" size={24} color="#4B4B4B" />
                  :
                  <Ionicons name="settings-outline" size={24} color="#4B4B4B" />

                );
              },}} component={SettingsApp}></Tab.Screen>

              {/* --------------- END TAKES ROUTES --------------- */}

            </>
          )}
          
          
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}