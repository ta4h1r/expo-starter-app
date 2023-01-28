import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen({ navigation }) {

  console.log('splash');

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {

      setAnimating(false);
      console.log('splash_end')

      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          'Auth'
        ),
      );

    }, 3000);

  }, []);

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/logo.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />

      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />

    </View>
  )
}

export default SplashScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  image: {
    marginBottom: 40,
    width: '80%',
    height: 200,
  },
});