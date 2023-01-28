import React from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

function CustomSidebarMenu(props) {

    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Image
                     source={require('../assets/logo.png')}
                     style={{
                        width: '80%',
                        height: 200,
                        resizeMode: 'contain',
                        margin: 30,
                    }}
                    />
                    {/* <Text style={{ fontSize: 25, color: '#307ecc' }}>
                        {props.user.charAt(0)}
                    </Text> */}
                </View>
                <Text style={stylesSidebar.profileHeaderText}>
                    {props.user}
                </Text>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label={() => <Text style={{ color: '#ff0000' }}> LOGOUT </Text>}
                    onPress={async () => {
                        console.log("LOGOUT");
                        props.navigation.replace('Auth');
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomSidebarMenu


const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#111',
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#111',
        padding: 15,
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#e2e2e2',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        flex: 1,
        color: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
    },
});