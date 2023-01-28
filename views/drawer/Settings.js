import React, { useState } from 'react'
import {
  StyleSheet, SafeAreaView,
} from "react-native";
import {
  Text
} from 'react-native-paper';


import { ScrollView } from 'react-native-gesture-handler';


function Settings({ client, userPassword }) {

  return (
    <SafeAreaView style={styles.rootSafeArea}>

    <ScrollView style={styles.rootScrollView}
        nestedScrollEnabled={true}
    >
        <ScrollView style={styles.rootScrollView}
            horizontal={true}
        >

            <Text> SETTINGS </Text>

        </ScrollView>
    </ScrollView>

</SafeAreaView >
  )

}


const styles = StyleSheet.create({
  childSurface: {
    borderWidth: 1, borderColor: "red", borderStyle: "solid", borderRadius: 10,
    flex: 1, flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#ddd",
    elevation: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  dropdownPicker: {
    backgroundColor: "#ddd",
    // borderColor: "#111", width: '100%'
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "green",
    borderStyle: "solid",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  view: {
    margin: 10,
  },
  childView: {
    borderWidth: 1, borderColor: 'black',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    margin: 10,
    fontWeight: 'bold', fontSize: 18,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
});


export default Settings
