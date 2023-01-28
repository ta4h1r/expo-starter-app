import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';



function NavigationDrawerHeader(props) {
    
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer(); 
    };


    return (
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
            <TouchableOpacity onPress={toggleDrawer}>
                {/* <Image source={require('../../assets/hamburger.png')}
                    style={{width: 30, height: 30, marginLeft: 15}}
                /> */}
            </TouchableOpacity>
        </View>
    )
}

export default NavigationDrawerHeader
