import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { getLocation } from "./features/shared/utilities/getLocation";
import { fetchFile } from "./features/shared/utilities/fetchFile";

export default function App() {
  getLocation().then((location) =>
    fetchFile(
      [location.coords.latitude, location.coords.longitude],
      "mushrooms",
      false,
      5
    )
  );

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
