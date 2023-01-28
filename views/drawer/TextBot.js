import React from 'react'
import { View, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, IconButton, Text, TextInput, Paragraph, Dialog, Portal, Surface } from 'react-native-paper';

const styles = StyleSheet.create({
    rootSafeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    rootView: {
        borderWidth: 0,
        borderColor: "red",
        borderStyle: "solid",

        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

        padding: 8,
    },
    surfaceView: {
        borderWidth: 0,
        borderColor: "blue",
        borderStyle: "solid",
        borderRadius: 12,

        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

        maxWidth: 300,
        minWidth: 200,
        margin: 8,
        padding: 8,

        elevation: 8,
    },



    bodyText: {
        color: "#ccc",
        fontSize: 14,
    },
    headingText: {
        color: "#ccc",
        fontSize: 14,
        textTransform: "uppercase",
    },

})


function TextBot({ client }) {


    return (
        <SafeAreaView style={styles.rootSafeArea}>

        <ScrollView style={styles.rootScrollView}
            nestedScrollEnabled={true}
        >
            <ScrollView style={styles.rootScrollView}
                horizontal={true}
            >

                <Text> TEXT BOT </Text>

            </ScrollView>
        </ScrollView>

    </SafeAreaView >
    )
}

export default TextBot
