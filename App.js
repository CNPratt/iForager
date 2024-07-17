import { Provider } from "react-redux";
import store from "./features/shared/rtk-store/store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppWrapper from "./features/shared/components/AppWrapper";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
