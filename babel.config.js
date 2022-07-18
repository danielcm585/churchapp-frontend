module.exports = function(api) {
  const APP_NAME = 'MyKalvari'
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        alias: {
          "@native-base/icons": "@native-base/icons/lib"
        }
      }],
      ["babel-plugin-root-import", {
        "rootPathPrefix": "@root",
        "rootPathSuffix": "src"
      }],
      // ["expo-image-picker", {
        //   "photoPermission": `Please allow ${APP_NAME} to access your photos`,
        //   "cameraPermission": `Please allow ${APP_NAME} to access your camera`,
        // }]
    ],
    env: {
      production: {
        plugins: [
          "babel-plugin-root-import", {
            "rootPathPrefix": "@root",
            "rootPathSuffix": "src"
          }
        ]
      }
    }
  };
};
