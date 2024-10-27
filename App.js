import { Provider } from "react-redux";
import store from "./features/shared/rtk-store/store";
import AppWrapper from "./features/shared/components/AppWrapper";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "./features/shared/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <Provider store={store}>
            <AppWrapper />
          </Provider>
        </PaperProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
