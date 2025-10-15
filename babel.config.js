module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Expo Router & SDK handled automatically
  };
};