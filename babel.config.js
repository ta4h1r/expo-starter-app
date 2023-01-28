module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // https://docs.expo.dev/versions/latest/sdk/reanimated/#installation
  };
};
