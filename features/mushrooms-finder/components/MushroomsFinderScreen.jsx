import { StyleSheet, Text, View } from "react-native";

const MushroomsFinderScreen = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Text>MushroomsFinderScreen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MushroomsFinderScreen;
