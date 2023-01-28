import React from 'react';
import {
  StyleSheet, AppState, Platform,
  Button, Modal, View, Pressable, Text, TextInput,
  Image,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import TextBot from './drawer/TextBot';
import ImageBot from './drawer/ImageBot';
import Settings from './drawer/Settings';

import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';

import { RobotsProvider } from '../contexts/robots'

import { useFonts } from 'expo-font';

import Loader from '../components/Loader';

import SocketContext from '../contexts/socket'

import { Picker } from '@react-native-picker/picker';
import storageHelper from '../helpers/storage';


const { queryRobotsStatus, sendDataToFleetController, createTicket } = require('../helpers/api')

const Stack = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();


function firstCaps(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


const SettingsStack = ({ navigation, client, userPassword }) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
    >


      <Stack.Screen
        name="Settings"
        options={{
          headerShown: false,
        }}
      >
        {props => {
          return <Settings {...props} client={client} userPassword={userPassword} />
        }}
      </Stack.Screen>


    </Stack.Navigator>
  );
};


const ImageBotStack = ({ navigation, client }) => {
  return (
    <Stack.Navigator initialRouteName="ImageBot">


      <Stack.Screen
        name="ImageBot"
        options={{
          headerShown: false,
        }}>
        {props => {
          return <ImageBot {...props} client={client} />
        }}
      </Stack.Screen>


    </Stack.Navigator>
  );
};


const TextBotStack = ({ navigation, client }) => {
  return (
    <Stack.Navigator initialRouteName="TextBot">


      <Stack.Screen
        name="TextBot"
        options={{
          headerShown: false,
        }}>
        {props => {
          return <TextBot {...props} client={client} navigation={navigation} />
        }}
      </Stack.Screen>


    </Stack.Navigator>
  );
};


function Drawer({ navigation, client }) {

  // Use effect cleanup flag
  const isMounted = React.useRef(null);

  console.log('Drawer');


  // Robot root collections
  const [rootCollectionIds, setRootCollectionIds] = React.useState({});
  // React.useEffect(() => {
  //   // executed when component mounted
  //   isMounted.current = true;

  //   console.log("NavigationEffect1: GET ROOT COLLECTIONS");

  //   async function getAllRobotsRootCollections() {
  //     const clientId = await ioHelper.retrieveData("client_id")
  //     const robots = await client.service("robots").find(clientId)   // Find all robots for this client
  //     // Gather the rootCollection _ids for each robot
  //     if (robots.total > 0) {
  //       for (let i = 0, n = robots.total; i < n; i++) {
  //         const { rootCollection, robotMeta } = robots.data[i];
  //         // console.log("Found robot: " + robotMeta.alias);
  //         // console.log("Root collection ID: " + rootCollection);
  //         rootCollectionIds[robotMeta.alias] = rootCollection;
  //       }
  //     } else {
  //       alert("Error: Could not find any robots.")
  //       console.error("NavEffect1: Could not find any robots!");
  //     }

  //     setRootCollectionIds(rootCollectionIds);

  //   }

  //   if (isMounted.current) getAllRobotsRootCollections();


  //   return () => {
  //     // executed when unmount
  //     isMounted.current = false;
  //   }
  // }, [rootCollectionIds]);


  // // Listen to database changes 
  // // 1. Documents listener for Pudu robot states given by microservice (documents patched at socket middleware)
  // // 2. Announcements listener for task queue updates  
  // // 3. Subscribers listener for UI notifications 
  const [announcement, setAnnouncement] = React.useState({});
  // React.useEffect(() => {
  //   // executed when component mounted
  //   isMounted.current = true;

  //   console.log("NavigationEffect2: INIT LISTENERS");

  //   let c = 0;
  //   const retryCount = 5;
  //   const initSocketListeners = async () => {


  //     try {

  //       client.service("announcements").removeAllListeners("patched");
  //       client.service("announcements").on("patched", async annDoc => {
  //         // console.log("PATCH ANN:", annDoc._id);
  //         const robotId = annDoc.assignee.robotId;
  //         announcement[`${robotId}`] = annDoc;
  //         setAnnouncement({
  //           ...announcement,
  //         })
  //         checkForAlarm(annDoc);
  //       });

  //       client.service("announcements").removeAllListeners("created");
  //       client.service("announcements").on("created", async annDoc => {
  //         // console.log("CREATE ANN:", annDoc._id);
  //         const robotId = annDoc.assignee.robotId;
  //         announcement[`${robotId}`] = annDoc;
  //         setAnnouncement({
  //           ...announcement,
  //         })
  //       });


  //       let initFlag = true; 
  //       client.service("subscribers").removeAllListeners("patched");
  //       client.service("subscribers").on("patched", async doc => {
  //         if (["dispatcher", "superuser"].includes(doc.accessLevel) && doc.type === "charging") {
  //           alert(doc.message);
  //           navigation.navigate('BATTERIES');
  //         }
  //         if (
  //           ["dispatcher", "superuser"].includes(doc.accessLevel)
  //           && doc.type === "battery"
  //           && doc.employeeId === await ioHelper.retrieveData("employee_id")
  //         ) {
  //           if (!initFlag) alert(doc.message);
  //           initFlag = false; 
  //         }
  //       });

  //     } catch (e) {
  //       console.error("Caught @initSocketListeners: ", e);

  //       // if (c < retryCount) {
  //       //   console.log('reauth', `${c}/${retryCount}`);
  //       //   const deviceId = await ioHelper.retrieveData("device_id");
  //       //   console.log("DEVICEID:", deviceId)
  //       //   // First try to log in with an existing JWT
  //       //   auth = await client.reAuthenticate({
  //       //     deviceId: deviceId
  //       //   });
  //       //   ioHelper.storeData("token", auth.accessToken);
  //       //   ioHelper.storeData("user_id", auth.user._id);
  //       //   await ioHelper.storeData("client_id", auth.user.clientId);  // Wait for this coz we need it early in the next screen

  //       //   c++;
  //       //   initSocketListeners();  
  //       // } else {
  //       //   console.log("RETRIES FINISHED")
  //       //   navigation.replace("Auth");
  //       // }

  //     }

  //     async function checkForAlarm(annDoc) {
  //       const dept = await ioHelper.retrieveData("department");
  //       const accessLevel = await ioHelper.retrieveData("access_level");
  //       const user = await ioHelper.retrieveData("user_name")
  //       const interested = annDoc.taskStatus === "alarm" &&
  //         (
  //           annDoc.to === dept
  //           || (annDoc.assignee?.destinationQueue[0] === dept)         // From the depot
  //           // || accessLevel === "manager" || accessLevel == "superuser" 
  //           || annDoc.assignee?.dispatchedBy === user
  //         )
  //       if (interested) {
  //         if (annDoc.taskStatus === "arrived") alert(`Delivery '${annDoc.shortId}' was tampered with.\n\nAfter arriving at ${annDoc.to},\n\nat ${(new Date(annDoc.updatedAt)).toLocaleString()}.`)
  //         else alert(`Delivery '${annDoc.shortId}' was tampered with.\n\nOn its way from: ${annDoc.from} to: ${annDoc.to},\n\nat ${(new Date(annDoc.updatedAt)).toLocaleString()}.`)
  //       }


  //     }


  //   }

  //   initSocketListeners();


  //   return () => {
  //     // executed when unmount
  //     isMounted.current = false;
  //     client.service("announcements").removeAllListeners("created");
  //     client.service("announcements").removeAllListeners("patched");
  //     client.service("subscribers").removeAllListeners("patched");
  //   }
  // }, []);


  // // Set user data for the navigation drawer custom sidebar menu header props
  const [user, setUser] = React.useState('');
  React.useEffect(() => {

    async function getUser() {
      let e = await storageHelper.retrieveData("user_name");
      setUser(e);
    }

    getUser();

  }, [user]);



  // Register for Push notifications 
  const [deviceId, setDeviceId] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [clientId, setClientId] = React.useState("");
  const [expoPushToken, setExpoPushToken] = React.useState(null);
  const isMounted1 = React.useRef(null);
  // React.useEffect(() => {
  //   // executed when component mounted
  //   isMounted1.current = true;

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FFFFFF',
  //     });
  //     setDeviceId(Application.androidId);
  //   }

  //   async function registerForPushNotificationsAsync() {

  //     if (Constants.isDevice) {
  //       const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //       let finalStatus = existingStatus;
  //       if (existingStatus !== 'granted') {
  //         const { status } = await Notifications.requestPermissionsAsync();
  //         finalStatus = status;
  //       }
  //       if (finalStatus !== 'granted') {
  //         alert('Failed to get push token for push notification!');
  //         return;
  //       }
  //       const token = (await Notifications.getExpoPushTokenAsync()).data;
  //       setExpoPushToken(token);
  //       ioHelper.storeData("expoPushToken", token);
  //       setClientId(await ioHelper.retrieveData("client_id"));
  //       setDepartment(await ioHelper.retrieveData("department"));
  //       console.log("expoPushToken: ", expoPushToken);
  //       try {
  //         if (!expoPushToken) throw {
  //           msg: "No push token"
  //         }
  //         if (!clientId) throw {
  //           msg: "No clientId"
  //         }

  //         const _id = (await client.service("subscribers").find({
  //           query: {
  //             "expoPushToken": expoPushToken,
  //           }
  //         })).data[0]?._id;

  //         if (_id) {
  //           //...
  //           console.log("Push token already subscribed");
  //           client.service("subscribers").patch(_id, {
  //             "expoPushToken": expoPushToken,
  //             "clientId": await clientId,       // Await here because we can't await when we first set the value in a useState
  //             "subscribeTo": {
  //               "department": await department,
  //             },
  //             "deviceId": deviceId,

  //             "userAlias": await ioHelper.retrieveData("user_name"),
  //             "accessLevel": await ioHelper.retrieveData("access_level"),
  //             "employeeId": await ioHelper.retrieveData("employee_id"),
  //           })
  //         } else {

  //           client.service("subscribers").create({
  //             "expoPushToken": expoPushToken,
  //             "clientId": await clientId,       // Await here because we can't await when we first set the value in a useState
  //             "subscribeTo": {                  // Use on object here, in case future filters need to be added
  //               "department": await department,
  //             },
  //             "deviceId": deviceId,

  //             "userAlias": await ioHelper.retrieveData("user_name"),
  //             "accessLevel": await ioHelper.retrieveData("access_level"),
  //             "employeeId": await ioHelper.retrieveData("employee_id"),
  //           }).then(() => {
  //             console.log("Subscribed new push token for " + department);
  //           })


  //         }



  //       } catch (e) {
  //         e.msg ? console.log(e.msg) : console.error(e);
  //       }
  //     } else {
  //       alert('Must use physical device for Push Notifications');
  //     }


  //   };

  //   async function addSubscriberDoc() {
  //     const clientId = await ioHelper.retrieveData("client_id");
  //     const employeeId = await ioHelper.retrieveData("employee_id")
  //     const department = await ioHelper.retrieveData("department")
  //     try {
  //       if (!clientId) throw {
  //         msg: "No clientId"
  //       }
  //       if (!employeeId) throw {
  //         msg: "No emloyeeId"
  //       }

  //       const _id = (await client.service("subscribers").find({
  //         query: {
  //           clientId, employeeId,
  //         }
  //       })).data[0]?._id;

  //       if (_id) {
  //         console.log("Already subscribed");
  //         client.service("subscribers").patch(_id, {
  //           "clientId": clientId,
  //           "expoPushToken": clientId + "--" + employeeId,
  //           "subscribeTo": {
  //             "department": department,
  //           },

  //           "userAlias": await ioHelper.retrieveData("user_name"),
  //           "accessLevel": await ioHelper.retrieveData("access_level"),

  //           "employeeId": employeeId,
  //         })
  //       } else {
  //         console.log("Adding new subscriber");
  //         client.service("subscribers").create({
  //           "clientId": clientId,
  //           "expoPushToken": clientId + "--" + employeeId,
  //           "subscribeTo": {
  //             "department": department,
  //           },

  //           "userAlias": await ioHelper.retrieveData("user_name"),
  //           "accessLevel": await ioHelper.retrieveData("access_level"),

  //           "employeeId": employeeId,
  //         }).then(() => {
  //           console.log("Added new subscriber for " + department);
  //         })


  //       }



  //     } catch (e) {
  //       e.msg ? console.log(e.msg) : console.error(e);
  //     }
  //   }

  //   if (Platform.OS !== 'web') registerForPushNotificationsAsync();

  //   addSubscriberDoc();


  //   return () => {
  //     // executed when unmount
  //     isMounted1.current = false;
  //   }
  // }, [department]);



  // Get user access level to decide which screens to render 
  const [userAccessLevel, setUserAccessLevel] = React.useState("superuser")
  const [userPassword, setUserPassword] = React.useState("")
  const [initialRoute, setInitialRoute] = React.useState("CHAT")
  const [dispatchStatus, setDispatchStatus] = React.useState(false)
  // React.useEffect(() => {

  //   async function getUserData() {
  //     console.log("NavigationEffect3: GET USER ACCESS LEVEL")
  //     const alias = await ioHelper.retrieveData("user_name");
  //     const password = await ioHelper.retrieveData("user_password");
  //     const postData = {
  //       command: "getUserData",
  //       data: {
  //         alias: alias,
  //         password: password
  //       },
  //     };

  //     console.log("MAKING REQ", postData)
  //     const res = await sendDataToFleetController('clients', postData);
  //     console.log("GOT RES", res.data);
  //     const data = res.data

  //     if (data) {
  //       setUserAccessLevel(data.accessLevel)
  //       setUserPassword(password)
  //       if (
  //         data.status?.dispatcher === 'approved'
  //       ) setDispatchStatus(true);
  //       await ioHelper.storeData("user_access_level", data.accessLevel)
  //       console.log("ACCESS LEVEL", data.accessLevel);
  //     }


  //     if (data.accessLevel) {
  //       switch (data.accessLevel) {
  //         case "dispatcher":
  //           setInitialRoute("DELIVERIES");
  //           break;
  //         case "collector":
  //           setInitialRoute("ANNOUNCEMENTS");
  //           break;
  //         case "manager":
  //           setInitialRoute("ANALYTICS");
  //           break;
  //         case "superuser":
  //           setInitialRoute("SETTINGS");
  //           break;
  //         default:
  //           setInitialRoute("SETTINGS");
  //           break;
  //       }
  //     }

  //   }



  //   getUserData();


  // }, [])




  // Socket connection status 
  const socketContext = React.useContext(SocketContext);
  React.useEffect(() => {
    console.log("socketContext changed");
  }, [socketContext])




  // Modal state 
  const dropDownItems = {
    priorities: ['Low', 'Medium', 'High'],
    issueTypes: ['Bug/Error', 'Hardware fault']
  }

  const initialFormData = {
    "Name": undefined,
    "Email address": undefined,
    "Title": undefined,
    "Description": undefined,
    "Priority": dropDownItems.priorities[0],
    "Issue type": dropDownItems.issueTypes[0]
  }
  const [modalForm, setModalForm] = React.useState(initialFormData)
  const [modalVisible, setModalVisible] = React.useState(false);


  // Load custom fonts
  const [loaded] = useFonts({
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }



  return (
    <RobotsProvider value={{
      rootCollectionIds: rootCollectionIds,
      client: client,
      announcement: announcement,
      dispatchStatus: dispatchStatus,
    }} >


      {initialRoute ? (
        <DrawerNavigator.Navigator
          initialRouteName={initialRoute}
          drawerContentOptions={{
            activeTintColor: '#fff',
            color: '#fff',
            itemStyle: { marginVertical: 5, color: 'white' },
            labelStyle: {
              color: '#fff',
            },
          }}
          screenOptions={{
            headerShown: true,
            headerStyle: styles.header,
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: styles.headerTitle,
            headerRight: () => (
              <>

                <View style={[{
                  borderColor: 'red', borderWidth: 1, borderStyle: 'solid',
                  flex: 1, flexDirection: 'row',

                  padding: 5,
                }]}>

                  <View style={[styles.headerTextViews, {flex: 5}]}>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>






                          <View style={[styles.mView, { marginBottom: 20, }]}>
                            <Text style={[styles.bodyText, styles.headingText]}>
                              Report problem
                            </Text>
                          </View>







                          <View style={[styles.mView]}>
                            {NewField("Name")}
                          </View>





                          <View style={[styles.mView]}>
                            {NewField("Email address")}
                          </View>





                          <View style={[styles.mView]}>
                            {NewField("Title")}
                          </View>





                          <View style={[styles.mView, { flex: 1.6, }]}>
                            {NewField("Description")}
                          </View>





                          <View style={[styles.mView]}>
                            {NewField("Issue type", dropDownItems.issueTypes)}
                          </View>






                          <View style={[styles.mView]}>
                            {NewField("Priority", dropDownItems.priorities)}
                          </View>






                          <View style={[styles.mView, { justifyContent: 'flex-end' }]}>

                            <ModalButtons />

                          </View>









                        </View>
                      </View>
                    </Modal>


                    <Pressable
                      style={[styles.button, styles.buttonOpen, {
                        display: 'flex', flex: 1,
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                      }]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Image
                        source={require('../assets/bug.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </Pressable>

                  </View>
                  


                  <View style={[styles.headerTextViews]}>
                    {/* <SocketStatus /> */}
                    <Text> online </Text> 
                  </View>

                </View>

              </>

            )
          }}
          drawerContent={props => {
            return (
              <CustomSidebarMenu {...props} user={user?.toUpperCase()} />
            )
          }}
        >




          {/** CHAT */}
          {(
            userAccessLevel === "dispatcher"
            || userAccessLevel === "manager"
            || userAccessLevel === "superuser"
          ) ? (
            <DrawerNavigator.Screen
              name="CHAT"
              options={{
                drawerLabel: 'CHAT',
                unmountOnBlur: false,
              }}>
              {props => {
                return <TextBotStack {...props} client={client} />
              }}
            </DrawerNavigator.Screen>
          ) : (
            null
          )}




          {/** IMAGE */}
          {(
            userAccessLevel === "dispatcher"
            || userAccessLevel === "manager"
            || userAccessLevel === "superuser"
          ) ? (
            <DrawerNavigator.Screen
              name="IMAGE"
              options={{
                drawerLabel: 'IMAGE',
                unmountOnBlur: false
              }}>
              {props => {
                return <ImageBotStack {...props} client={client} />
              }}
            </DrawerNavigator.Screen>
          ) : (
            null
          )}




          {/** SETTINGS */}
          {(
            userAccessLevel
          ) ? (
            <DrawerNavigator.Screen
              name="SETTINGS"
              options={{ drawerLabel: 'SETTINGS' }}
            >
              {props => {
                return <SettingsStack {...props} client={client} userPassword={userPassword} />
              }}
            </DrawerNavigator.Screen>
          ) : (
            null
          )}




        </DrawerNavigator.Navigator>
      ) : (
        <>

          <NavigationDrawerHeader />

          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center',
            height: '100%',

          }}>
            <Loader />
          </View>

        </>

      )}




    </RobotsProvider>
  )





  // COMPONENTS

  function NewField(fieldName, items = []) {
    const [index, setIndex] = React.useState(0);
    const picker = items.length > 0;
    return <>
      <View style={[styles.nViewLeft]}>
        <Text style={[styles.modalText]}> {fieldName} </Text>
      </View>

      {picker ? (
        <View style={[styles.nViewRight]}>
          <Picker
            style={[styles.picker]}
            selectedValue={items[index]}
            onValueChange={(itemValue, itemIndex) => {
              setIndex(itemIndex)
              setModalForm({
                ...modalForm,
                [fieldName]: itemValue,
              })
            }
            }>
            {items.map((itemName) => (
              <Picker.Item key={itemName} label={itemName} value={itemName} />
            )
            )}
          </Picker>
        </View>
      ) : (
        <View style={[styles.nViewRight,]}>
          <TextInput style={[styles.textInput, (fieldName === "Description" ? ({ height: 70 }) : null)]}
            multiline={fieldName === "Description"}
            onChangeText={(str) => {
              setModalForm({
                ...modalForm,
                [fieldName]: str,
              });
            }}
            value={modalForm[fieldName]}
            placeholder={
              fieldName === "Name" ? (
                `Enter your name`
              ) : (
                fieldName === "Email address" ? (
                  `Enter your email address`
                ) : (
                  fieldName === "Title" ? (
                    `Enter a short title for the problem`
                  ) : (
                    fieldName === "Description" ? (
                      `Describe the problem in detail`
                    ) : (
                      `useless placeholder`
                    )
                  )
                )
              )
            }
          />
        </View>
      )}
    </>;
  }

  function SocketStatus() {
    return <Text style={socketContext.connection === "connect" ? (
      {
        marginRight: 10,
        color: "green"
      }
    ) : (
      (
        socketContext.connection === "reconnect_error"
      ) ? (
        {
          marginRight: 10,
          color: "#555"
        }
      ) : (
        (
          socketContext.connection === "reconnect_failed"
          || socketContext.connection === "reconnect_attempt"
          || socketContext.connection === "diconnect") ?
          (
            {
              marginRight: 10,
              color: "#ff0000"
            }
          ) : (
            null
          )
      )
    )}
    >
      {socketContext.connection === "connect" ? (
        "connected"
      ) : (
        (
          socketContext.connection === "reconnect_error"
        ) ? (
          "reconnecting..."
        ) : (
          (
            socketContext.connection === "reconnect_failed"
            || socketContext.connection === "reconnect_attempt"
            || socketContext.connection === "diconnect") ? (
            "disconnected"
          ) : (
            null
          )
        )
      )}
    </Text>;
  }

  function ModalButtons() {
    return (
      <>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={[styles.bodyText, styles.buttonText]}>Close</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonSubmit]}
          onPress={() => {
            const vals = Object.values(modalForm);
            for (let i = 0, n = vals.length; i < n; i++) {
              if (!vals[i]) {
                alert("Please fill out all fields first.");
                return;
              }
            }
            const formData = {
              title: modalForm["Title"],
              name: modalForm["Name"],
              email: modalForm["Email address"],
              priority: modalForm["Priority"],
              description: modalForm["Description"],
              type: modalForm["Issue type"],
            }
            createTicket(formData).then((res) => {
              alert(res)
              setModalForm(initialFormData)
              setModalVisible(!modalVisible)
            })

          }}>
          <Text style={[styles.bodyText, styles.buttonText]}>Submit</Text>
        </Pressable>
      </>
    )
  }

}


export default Drawer


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff", //Set Header color
  },
  headerTitle: {
    fontWeight: 'bold', //Set Header text style
    fontSize: 14,
  },

  headerTextViews: {
    borderColor: 'blue', borderWidth: 1, borderStyle: 'solid',
    flex: 1, flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 

    padding: 5,
  },

  bodyText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular'
  },
  headingText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 32
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },



  button: {
    borderRadius: 4,
    padding: 10,
    margin: 4,
    width: 80,
  },
  buttonOpen: {
    backgroundColor: '#fff',
    borderWidth: 0, borderStyle: 'solid', borderColor: 'black',
  },
  buttonClose: {
    backgroundColor: '#555',
    color: '#fff',
  },
  buttonSubmit: {
    backgroundColor: '#1900D8',
    color: '#fff',
  },



  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {

    borderColor: 'blue', borderWidth: 0, borderStyle: 'solid',

    margin: 20,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
  },



  mView: {
    borderColor: 'green', borderWidth: 0, borderStyle: 'solid',
    flex: 1, flexDirection: 'row',
    justifyContent: 'flex-start', alignItems: 'center',

    padding: 5,

    minWidth: 450, minHeight: 50,
  },
  nViewLeft: {
    borderColor: 'blue', borderWidth: 0, borderStyle: 'solid',
    flex: 0.5, flexDirection: 'row',
    justifyContent: 'flex-start', alignItems: 'center',

    padding: 5,
    minHeight: 50,
  },
  nViewRight: {
    borderColor: 'blue', borderWidth: 0, borderStyle: 'solid',
    flex: 1, flexDirection: 'row',
    justifyContent: 'flex-start', alignItems: 'center',

    padding: 5,
    minHeight: 50,
  },


  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: 'white',

    flex: 1,
    borderRadius: 6,
  },

  picker: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eee'
  }

}); 