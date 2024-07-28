import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "../../home/components/HomeScreen";
import MushroomsFinderScreen from "../../basic-finders/components/MushroomsFinderScreen";
import { getLocation } from "../utilities/getLocation";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../rtk-slices/configSlice";
import FruitFinderScreen from "../../basic-finders/components/FruitFinderScreen";
import BerriesFinderScreen from "../../basic-finders/components/BerriesFinderScreen";
import AlliumsFinderScreen from "../../basic-finders/components/AlliumsFinderScreen";
import CustomMapMakerScreen from "../../custom-map-maker/components/CustomMapMakerScreen";
import FinderDisplay from "../../finder-display/components/FinderDisplay";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

const AppWrapper = (props) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const customMaps = useSelector((state) => state.userContent.customMaps);

  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const result = await getLocation();

        dispatch(setLocation(result));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Mushrooms" component={MushroomsFinderScreen} />
          <Drawer.Screen name="Fruit" component={FruitFinderScreen} />
          <Drawer.Screen name="Berries" component={BerriesFinderScreen} />
          <Drawer.Screen name="Alliums" component={AlliumsFinderScreen} />
          <Drawer.Screen
            name="Custom Map Maker"
            component={CustomMapMakerScreen}
          />
          {customMaps.map((map) => (
            <Drawer.Screen key={map.title} name={map.title}>
              {() => <FinderDisplay ids={map.ids} title={map.title} />}
            </Drawer.Screen>
          ))}
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppWrapper;
