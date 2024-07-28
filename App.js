import { Provider } from "react-redux";
import store from "./features/shared/rtk-store/store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppWrapper from "./features/shared/components/AppWrapper";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "./features/shared/theme/theme";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <AppWrapper />
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
