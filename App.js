
// React-Native  
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Google ads 
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Navigation 
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens 
import SplashScreen from './views/SplashScreen';
import Auth from './views/Auth';

// Socket 
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import Drawer from './views/Drawer';



const DrawerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    text: "#fff", 
    card: "#fff", 
  },
};


const { socket_uri } = require('./constants');

const socket = io(socket_uri, {
  transports: ['websocket'],
  forceNew: true,
  timeout: 10000,
});
const client = feathers();

client.configure(socketio(socket));
client.configure(authentication({
  storage: AsyncStorage
}));



const Stack = createStackNavigator();


export default function App() {
  return (
    <>



      <NavigationContainer theme={DrawerTheme}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
        >


          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            options={{ headerShown: false }}
          >
            {props => {
              return <Auth {...props} client={client} />
            }}
          </Stack.Screen>

          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="DrawerNavigationRoutes"
            options={{ headerShown: false }}
          >
            {props => {
              return <Drawer {...props} client={client} />
            }}
          </Stack.Screen>




        </Stack.Navigator>
      </NavigationContainer>


      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }} />

      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
