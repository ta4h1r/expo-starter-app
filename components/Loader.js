// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';

const Loader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <ActivityIndicator
      animating={loading}
      // color={loading ? Colors.white : Colors.black}
      size='large'
      style={styles.activityIndicator}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
  },
});