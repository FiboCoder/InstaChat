import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './src/screens/auth/Register';
import Login from './src/screens/auth/Login';

import { Image } from 'react-native';

import Contacts from './src/screens/main/Contacts/Contacts';
import Calls from './src/screens/main/Calls/Callls';
import Chats from './src/screens/main/Chats/Chats';

import * as SecureStore from 'expo-secure-store';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Takes from './src/screens/main/Takes/Takes';
import Settings from './src/screens/main/Settings/Settings';

const Tab = createBottomTabNavigator();

export default function App({navigation}) {

  const AuthContext = React.createContext();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
          };
      }
    },
    {
      userToken: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

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

        dispatch({ type: 'SIGN_IN',  token: data});
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data});
      },
    }),
    []
  );

  function RegisterApp({}) {
    return (
      <Register></Register>
    );
  }
  
  function LoginApp({}) {
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
        <Login signIn={signIn}></Login>
    );
  }

  function ContactsApp({}) {
    return (
      <Contacts></Contacts>
    );
  }

  function CallsApp({}) {
    return (
      <Calls></Calls>
    );
  }
  
  function ChatsApp({}) {
    return (
      <Chats></Chats>
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
        <Tab.Navigator initialRouteName={state.isSignedIn == false ? 'LoginApp' : 'ChatsApp'}>

          {state.isSignedIn == false ? (

            <>
              <Tab.Screen name="RegisterApp" options={{headerShown: false, tabBarStyle: {display: 'none'}}} component={RegisterApp} />
              <Tab.Screen name="LoginApp" options={{headerShown: false, tabBarStyle: {display: 'none'}}} component={LoginApp} />
            </>
          ) : (

            <>
              <Tab.Screen name="ContactsApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <FontAwesome5 name="user-alt" size={24} color="#4B4B4B" />
                  :
                  <FontAwesome5 name="user" size={24} color="#4B4B4B" />

                );
              },}} component={ContactsApp}></Tab.Screen>

              <Tab.Screen name="CallsApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <Ionicons name="call" size={24} color="#4B4B4B" />
                  :
                  <Ionicons name="call-outline" size={24} color="#4B4B4B" />

                );
              },}} component={CallsApp}></Tab.Screen>

              <Tab.Screen name="ChatsApp" options={{headerShown: false, tabBarIcon: ({})=>{

                return(

                  <Image style={{width: 80, height: 80, marginBottom: 50}} source={require('./assets/images/logo.png')}></Image>
                );
              }, tabBarShowLabel: false}} component={ChatsApp} />

              <Tab.Screen name="TakesApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <Image style={{width: 24, height: 24}} source={require('./assets/images/clapper100x100_fill.png')}></Image>

                  :
                  <Image style={{width: 24, height: 24}} source={require('./assets/images/clapper100x100_outline.png')}></Image>


                );
              },}} component={TakesApp}></Tab.Screen>

              <Tab.Screen name="SettingsApp" options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{

                return (

                  focused
                  ? 
                  <Ionicons name="settings" size={24} color="#4B4B4B" />
                  :
                  <Ionicons name="settings-outline" size={24} color="#4B4B4B" />

                );
              },}} component={SettingsApp}></Tab.Screen>
            </>
          )}
          
          
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}