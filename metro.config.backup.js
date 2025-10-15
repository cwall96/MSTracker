const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const { withNativeWind } = require('nativewind/metro');

let config = getDefaultConfig(__dirname);

// ✅ Skip expo-router’s pre-built entry file on web builds only
if (process.env.EXPO_WEB === 'true') {
  config.resolver.blockList = exclusionList([
    /node_modules[/\\]expo-router[/\\]entry\.js/,
  ]);
}

// ✅ Enable NativeWind CSS transform
config = withNativeWind(config, { input: './app/global.css' });

module.exports = config;
