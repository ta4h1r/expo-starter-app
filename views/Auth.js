import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import Register from './Register';
import Login from '../components/Login';


const Stack = createStackNavigator();


function Auth({ client }) {
 // Stack Navigator for Login and Sign up Screen
 return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        options={{ headerShown: false }}
      >
        {props => {
          return <Login {...props} client={client} />
        }}
      </Stack.Screen>
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#707070', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Auth


