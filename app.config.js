import googleMapsApiKey from "./.env";

const appConfig = {
  expo: {
    name: "iForager",
    slug: "iForager",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      config: {
        googleMapsApiKey: process.env.EXPO_GOOGLE_MAPS_API_KEY,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "This app uses the location to show where you are on the map.",
      },
      supportsTablet: true,
      bundleIdentifier: "com.cpratt.iforager",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};

module.exports = appConfig;
