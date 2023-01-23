import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }} />
      </SafeAreaView>
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
