import storageHelper from "./storage";

let socketHelper = {

    socketLogin: async (client, socketUser, socketPass, clientId, deviceId) => {

        try {
            const params = {
                strategy: 'local',
                username: socketUser,
                password: socketPass,
                clientId: clientId,
                deviceType: 'edge',
                deviceId: deviceId,
            }
            client.service("authentication").timeout = 20000;
            let auth = await client.authenticate(params).then(authResult => {
                console.log("AUTH OK");
                return authResult;
            }).catch(err => {
                console.error("AUTH ERR:", err)
            });
            // ioHelper.storeData("socket_user", socketUser);
            // ioHelper.storeData("socket_pass", socketPass);
    
            storageHelper.storeData("device_id", deviceId);
            client.authentication.setAccessToken(auth.accessToken);
    
            storageHelper.storeData("user_id", auth.user._id);
            await storageHelper.storeData("client_id", auth.user.clientId);
            // setLoading(false);
            return 0;
        } catch (err) {
            console.error('Login failed: ', err);
            // setErrortext("Login failed: Socket timeout");
            // setLoading(false);
            return 1;
        }
    
    }


}

export default socketHelper;