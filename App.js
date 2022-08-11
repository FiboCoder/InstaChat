import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './src/screens/auth/Register';
import Login from './src/screens/auth/Login';



function RegisterApp({}) {
  return (
    <Register></Register>
  );
}

function LoginApp({}) {
  return (
    <Login></Login>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="RegisterApp" options={{headerShown: false, tabBarStyle: {display: 'none'}}} component={RegisterApp} />
        <Tab.Screen name="LoginApp" options={{headerShown: false, tabBarStyle: {display: 'none'}}} component={LoginApp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}