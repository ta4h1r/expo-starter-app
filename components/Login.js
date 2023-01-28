import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    Platform
} from 'react-native';

import Loader from './Loader';
import * as Application from 'expo-application';

import storageHelper from "../helpers/storage";
import socketHelper from '../helpers/socket';

import Constants from 'expo-constants';

import mixpanel from '../helpers/mixpanel';

const { sendDataToFleetController } = require('../helpers/api')

function Login({ navigation, client }) {

    const [authenticated, setAuthenticated] = useState(false);

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorText, setErrortext] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [deviceType, setDeviceType] = useState(null);
    const passwordInputRef = createRef();

    let auth = null;

    // Set device details
    // React.useEffect(() => {

    //     let dType = null;
    //     const { web, android, ios } = Constants.platform;
    //     if (web) {
    //         dType = 'web'
    //     }
    //     if (android) {
    //         dType = 'android'
    //     }
    //     if (ios) {
    //         dType = 'ios'
    //     }
    //     ioHelper.storeData('device_type', dType);
    //     setDeviceType(dType);
    //     setDeviceId(Application.androidId ? Application.androidId : "WEBCLIENT");

    // }, [deviceId, setDeviceId,
    //     deviceType, setDeviceType]);

    // // Fill out the user's details if they were stored on disk
    // React.useEffect(() => {

    //     async function getStoredCredentials() {
    //         const retrievedUsername = await ioHelper.retrieveData("user_name");
    //         const retrievedPass = await ioHelper.retrieveData("user_password");
    //         retrievedUsername != null ? setUserName(retrievedUsername) : setUserName('');
    //         retrievedPass != null ? setUserPassword(retrievedPass) : setUserPassword('');
    //     }

    //     // getStoredCredentials();

    // }, [])

    async function loginFromScratch() {
        setErrortext('');
        if (!userName) {
            alert('Please fill Username');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }

        setLoading(true);

        console.log('Login from scratch');

        try {
            const postData = {
                command: "getClientInfo",
                data: {
                    alias: userName,
                    password: userPassword,
                },
            };

            const { data, status, message } = await sendDataToFleetController('clients', postData);
            if (status == 200) {
                const { socketUser, socketPass, clientId, accessLevel, department, pin, employeeId } = data;
                storageHelper.storeData("department", department);
                storageHelper.storeData("user_name", userName);
                storageHelper.storeData("user_password", userPassword);
                storageHelper.storeData("access_level", accessLevel);
                storageHelper.storeData("user_pin", pin);
                storageHelper.storeData("employee_id", employeeId);
                if (await socketHelper.socketLogin(client, socketUser, socketPass, clientId, deviceId) == 0) {
                    setLoading(false);
                    setAuthenticated(true);
                    navigation.replace('DrawerNavigationRoutes');
                } else {
                    setErrortext("Login failed: Socket timeout");
                    setLoading(false);
                }
            } else {
                throw {
                    msg: message
                }
            }

        } catch (e) {
            mixpanel.track('Unsuccessful login');
            setLoading(false);
            console.error("Login exception:", e);
            setErrortext(e.msg ? e.msg : "Request timed out.");
        }
    }

    const getClientId = async () => {
        return await storageHelper.retrieveData("client_id");
    }

    const handleSubmitPress = async () => {


        const newUserName = await storageHelper.retrieveData("user_name") !== userName;
        const newPass = await storageHelper.retrieveData("user_password") !== userPassword;

        if (newUserName || newPass) client.authentication.removeAccessToken();

        simulateServerFetch();


        function simulateServerFetch() {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setAuthenticated(true); 
                storageHelper.storeData("user_name", userName);
                navigation.replace('DrawerNavigationRoutes');
            }, 2000);
        }
        // First attempt reAuth
        // client.authentication.getAccessToken().then(async token => {

        //     setLoading(true);


        //     if (token)
        //         client.authentication.reAuthenticate().then(async (auth) => {
        //             mixpanel.identify(userName);
        //             mixpanel.track('Successful login');
        //             mixpanel.people.set({
        //                 $first_name: userName,
        //                 // $department: department,           // these are undefined? 
        //                 // $access_level: accessLevel,
        //                 $client_id: await getClientId(),
        //             });

        //             setLoading(false);
        //             navigation.replace('DrawerNavigationRoutes');
        //         }).catch(async e => {
        //             console.log("Reauth exception:", e);
        //             loginFromScratch();
        //         });

        //     else loginFromScratch();



        // })










    }


    return (
        <View style={styles.mainBody}>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <View>
                    <KeyboardAvoidingView
                        enabled
                        behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={{
                                    width: '80%',
                                    height: 200,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>

                        <Loader loading={loading} />

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                editable={!loading}
                                onChangeText={(userEmail) => {
                                    setUserName(userEmail);
                                }}
                                placeholder="Enter username"
                                placeholderTextColor="#979dac"
                                autoCapitalize="none"
                                autoCompleteType="email"
                                keyboardType={"email-address"}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current && passwordInputRef.current.focus()
                                }}
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                                value={userName ? userName.toString() : ""}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                editable={!loading}
                                onChangeText={(userPassword) => {
                                    setUserPassword(userPassword);
                                }}
                                placeholder={"Enter password"}
                                placeholderTextColor='#979dac'
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                autoCompleteType={"password"}
                                underlineColorAndroid='#f000'
                                returnKeyType="next"
                                value={userPassword ? userPassword.toString() : ""}
                            />
                        </View>
                        {(errorText != '') ? (
                            <Text style={styles.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : null}
                        <Pressable
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}
                            disabled={loading}
                        >
                            <Text style={styles.buttonTextStyle}>
                                LOGIN
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate('RegisterScreen')}
                            disabled={loading}>
                            <Text
                                style={styles.registerTextStyle}>
                                Register
                            </Text>
                        </Pressable>
                        {/* <Text
                        style={styles.registerTextStyle}
                        // onPress={() => navigation.navigate('ForgotPasswordScreen')}
                        >
                            Forgot password
                    </Text> */}
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        width: 300,
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#333333',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 5,
        width: 300,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 25,
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
        borderRadius: 5,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
        // alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
