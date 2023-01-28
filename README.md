Forked from https://github.com/chelseafarley/expo-react-native-google-mobile-ads-demo/


$ cd expo-google-ads-test
$ expo install expo-dev-client
$ expo install react-native-google-mobile-ads


Add to app.json the following, the app ids are the samples.
For your real app you would go create these in Admob to get real app ids and ad unit ids.
"react-native-google-mobile-ads": {
  "android_app_id": "ca-app-pub-3940256099942544~3347511713",
  "ios_app_id": "ca-app-pub-3940256099942544~1458002511"
}


If you don't have eas installed then install using the following command:
$ npm install -g eas-cli
$ eas login
$ eas build:configure


Build for local development on iOS or Android:
$ eas build -p ios --profile development --local
OR
$ eas build -p android --profile development --local


May need to install the following to build locally (which allows debugging)
$ npm install -g yarn
$ brew install fastlane


After building install on your device:
For iOS (simulator): https://docs.expo.dev/build-reference/simulators/
For Android: https://docs.expo.dev/build-reference/apk/


Run on installed app:
$ expo start --dev-client