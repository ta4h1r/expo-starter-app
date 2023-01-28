import AsyncStorage from '@react-native-async-storage/async-storage';

let storageHelper = {

    storeData: async function (key, value) {
        try {
            await AsyncStorage.setItem(key, value, () => {
                // console.log("Stored data", key, value)
            });
        } catch (error) {
            // Error saving data
            console.error(error)
        }
    },


    retrieveData:  async function (key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // console.log("Retrieved data", value)
                return value;
            } else {
                // console.error("Retrieved data null");
            }
        } catch (error) {
            // Error retrieving data
            console.error(error);
        }
    },

    removeData:  async function (key) {
        try {
            const value = await AsyncStorage.removeItem(key);
            if (value !== null) {
                console.log("Removed data", value)
                return value;
            } else {
                console.log("Could not remove data");
            }
        } catch (error) {
            // Error retrieving data
            console.error(error);
        }
    }

}

export default storageHelper;