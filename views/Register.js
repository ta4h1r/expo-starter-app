// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Picker,
  Platform,
} from 'react-native';

// import DropDownPicker from 'react-native-dropdown-picker';

// import Loader from './Components/Loader';
// import * as Application from 'expo-application';
// import { sendDataToFleetController } from './Helpers/apiHelper';

// import ioHelper from "./Helpers/ioHelper";


function Register(props) {

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: '70%',
              height: 130,
              resizeMode: 'contain',
              marginTop: 30,
            }}
          />
        </View>


      </ScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'column',
    height: 80,
    marginLeft: '20%',
    marginRight: '20%',
    margin: 5,
  },
  TextStyle: {
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0466c8',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});