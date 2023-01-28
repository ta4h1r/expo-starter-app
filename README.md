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
