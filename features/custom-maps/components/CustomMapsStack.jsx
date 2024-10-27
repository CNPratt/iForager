import { useState } from "react";
import { View } from "react-native";
import CustomMapsMenu from "./CustomMapsMenu";
import CustomMapMakerScreen from "./custom-map-maker/CustomMapMakerScreen";
import { createStackNavigator } from "@react-navigation/stack";
import OpenDrawerIcon from "../../shared/components/OpenDrawerIcon";
import { IconButton } from "react-native-paper";
import GoBackIcon from "../../shared/components/GoBackicon";
import CustomMapsManager from "./CustomMapsManager";

const Stack = createStackNavigator();

const screenOptions = (props) => {
  return {
    headerRight: () => <OpenDrawerIcon {...props} />,
    headerLeft: () => <GoBackIcon {...props} />,
  };
};

const CustomMapsStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Custom Maps Menu"
      screenOptions={(props) => {
        return {
          headerRight: () => <OpenDrawerIcon {...props} />,
        };
      }}
    >
      <Stack.Screen name="Custom Maps Menu">{CustomMapsMenu}</Stack.Screen>
      <Stack.Screen
        name="Custom Map Maker"
        component={CustomMapMakerScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Custom Maps Manager"
        component={CustomMapsManager}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default CustomMapsStack;
