import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./features/shared/rtk-store/store";
import MushroomsFinderScreen from "./features/mushrooms-finder/components/MushroomsFinderScreen";
import HomeScreen from "./features/home/components/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Mushrooms" component={MushroomsFinderScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
