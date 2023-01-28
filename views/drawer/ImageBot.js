import React, { useState, createRef } from 'react';
import {
    View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';


function ImageBot({ navigation, client }) {



    return (
        <SafeAreaView style={styles.rootSafeArea}>

            <ScrollView style={styles.rootScrollView}
                nestedScrollEnabled={true}
            >
                <ScrollView style={styles.rootScrollView}
                    horizontal={true}
                >

                    <Text> IMAGE BOT </Text>

                </ScrollView>
            </ScrollView>

        </SafeAreaView >
    )
}

export default ImageBot


const styles = StyleSheet.create({
    thg_text: {
        padding: 5,
        fontSize: 14,
        color: "#000",
    },
    bodyText: {
        color: '#000',
        fontSize: 14,
    },
    headingText: {
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: "#000"
    },
    rootSafeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rootScrollView: {
        flex: 1,
        padding: 0,
        borderColor: "#00FF00",
        borderWidth: 0,
        borderStyle: 'solid',
    },
    surface: {
        elevation: 2,
        flex: 1,
        justifyContent: 'flex-start',
        borderColor: "#000",
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10, marginTop: 5, marginHorizontal: 10,
        backgroundColor: "#eee",
        elevation: 12,
    },



    limitedWidth: {
        maxWidth: 200,
        minWidth: 200,
        overflow: 'hidden',

    }
});